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
    return yellowParticles.amount.log10().pow(new Num(3, 0));
  }
  action(): Num {
    // Calculate and grant green keys based on effective charge
    const rawEffect = this.getEffectiveCharge().add(this.getSharedCharge()).pow(this.tier.mul(new Num(3, 0)));

    // Apply softcap to prevent runaway exponential growth
    // When effect exceeds 1e10,000, apply diminishing returns
    const effect = this.applySoftcap(rawEffect);

    // Grant green keys (green particles) as the reward
    if (effect.gt(new Num(0, 0))) {
      MultiplierRecord.yellowParticleGain.addLocalHook(this.name, (multiplier: Multiplier) => multiplier.correct(effect), true);
    }

    this.effect = effect;
    return effect;
  }

  /**
   * Apply a softcap to prevent the effect from growing too large.
   * After 1e10,000, the effect is raised to the power of 0.1, significantly
   * slowing down growth while still allowing progression.
   */
  private applySoftcap(effect: Num): Num {
    const cap = new Num(1, 10_000);
    if (effect.greq(cap)) {
      // effect = cap * (effect / cap)^0.1
      return effect.div(cap).pow(0.1).mul(cap);
    }
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
    const cap = new Num(1, 10_000);
    const isCapped = this.effect.greq(cap);
    return {
      formula: isCapped ? `cap x (charge^(3 x tier) / cap)^0.1` : `charge^(3 x tier)`,
      effects: [
        `Current Charge: ${this.getCharge().toString()} + ${this.getSharedCharge().toString()}`,
        `Tier: ${this.tier.toString()}`,
        `Effect: ${this.effect.toString(2)}x`,
        isCapped ? `(Softcapped above 1e10,000)` : ``
      ].filter(e => e !== '')
    }
  }

  override init() {
    this.requirement = [
      new Requirement(HoldingRecord.yellowParticles, new Num(1, 20_000), this)
    ]
  }
}
