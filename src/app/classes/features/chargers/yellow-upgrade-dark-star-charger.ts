import {DarkStarCharger} from "./dark-star-charger";
import {Num} from "../../../num";
import {ResetKey} from "../../enums/reset-key";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {Multiplier} from "../multiplier";

/**
 * Yellow Upgrade Dark Star Charger
 *
 * Nerfs: All yellow upgrades are disabled.
 * Charge: is gained based on yellow particles amount
 * Amplifies: Gain green keys, which can enhance yellow upgrades and generators.
 */
export class YellowUpgradeDarkStarCharger extends DarkStarCharger {
  displayName: string = 'Yellow Upgrade Charger';
  resetId: ResetKey = ResetKey.GREEN;
  baseMaxCharge: Num = new Num(100, 0);
  maxTier: Num | undefined = new Num(10, 0);
  canInfiniteChargeAtMaxTier: boolean = true;
  requirement: Requirement[] = [];
  name: string = 'yellow-upgrade-dark-star-charger';

  override tierNerf: Num[] = [
    new Num(0.8, 0),
    new Num(0.75, 0),
    new Num(0.5, 0)
  ];

  /**
   * Calculate max charge for a given tier
   * Each tier increases max charge by 10x
   */
  override getMaxChargeForTier(tier: Num): Num {
    if (tier.lte(new Num(1, 0))) {
      return this.baseMaxCharge.copy();
    }
    // Max charge = baseMaxCharge * 10^(tier - 1)
    const tierMultiplier = new Num(10, 0).pow(tier.sub(new Num(1, 0)));
    return this.baseMaxCharge.mul(tierMultiplier);
  }

  getChargeAmount(): Num {
    // Charge based on yellow particles amount - only increases
    const yellowParticles = HoldingRecord.yellowParticles;
    return yellowParticles.amount.sub(new Num(1, 3)).log10().pow(new Num(3, 0));
  }
  action(): Num {
    const effect = this.getEffectiveCharge().add(this.getSharedCharge()).pow(this.tier.mul(new Num(3, 0))).add(new Num(1, 0));

    if (effect.gt(new Num(0, 0))) {
      MultiplierRecord.yellowParticleGain.addLocalHook(this.name, (multiplier: Multiplier) => multiplier.correct(effect), true);
    }

    this.effect = effect;
    return effect;
  }

  applyNerfs(): void {
    // Disable all yellow upgrades
    UpgradeRecord.yellowUpgradeList.forEach(upgrade => upgrade.disable());
    UpgradeRecord.postBreakYellowUpgradeList.forEach(upgrade => upgrade.disable());
  }

  revertNerfs(): void {
    // Re-enable yellow upgrades
    UpgradeRecord.yellowUpgradeList.forEach(upgrade => upgrade.enable());
    UpgradeRecord.postBreakYellowUpgradeList.forEach(upgrade => upgrade.enable());
  }

  getNerfDescription(): string {
    return 'All yellow upgrades are disabled.';
  }

  getChargeDescription(): string {
    return 'Charges based on the amount of yellow particles you have.';
  }

  getRewardDescription(): string {
    return 'Increase yellow particle gain based on your charge.';
  }

  getEffectDescription(): string {
    return `Gain more yellow particles based on your charge.`;
  }

  override getEffectBreakdown(): { formula: string; effects: string[] } {
    return {
      formula: `charge^(3 x tier)`,
      effects: [
        `Current Charge: ${this.getCharge().toString()} + ${this.getSharedCharge().toString()}`,
        `Tier: ${this.tier.toString()}`,
        `Effect: ${this.effect.toString(2)}x`
      ]
    }
  }

  override init() {
    this.requirement = [
      new Requirement(HoldingRecord.yellowParticles, new Num(1, 20_000), this)
    ]
  }
}
