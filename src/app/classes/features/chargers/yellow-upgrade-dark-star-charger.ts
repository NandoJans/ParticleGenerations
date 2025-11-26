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

  getChargeAmount(): Num {
    // Charge based on yellow particles amount - only increases
    const yellowParticles = HoldingRecord.yellowParticles;
    const chargeAmount = yellowParticles.amount.log10().pow(new Num(1.75, 0));
    return chargeAmount.gt(this.getCharge()) ? chargeAmount : this.getCharge();
  }
  action(): Num {
    // Calculate and grant green keys based on effective charge
    const effect = this.getEffectiveCharge().pow(this.tier.mul(new Num(3, 0)));

    // Grant green keys (green particles) as the reward
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
        `Current Charge: ${this.getCharge().toString(2)}`,
        `Tier: ${this.tier.toString(2)}`,
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
