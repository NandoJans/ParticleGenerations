import {DarkStarCharger} from "./dark-star-charger";
import {Num} from "../../../num";
import {ResetKey} from "../../enums/reset-key";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

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
  maxCharge: Num = new Num(100, 0);
  maxTier: Num | undefined = new Num(10, 0);
  canInfiniteChargeAtMaxTier: boolean = true;
  requirement: Requirement[] = [];
  name: string = 'yellow-upgrade-dark-star-charger';

  getChargeAmount(): Num {
    // Charge based on yellow particles amount
    const yellowParticles = HoldingRecord.yellowParticles;
    const chargeAmount = yellowParticles.amount.log10();
    return chargeAmount.gt(new Num(0, 0)) ? chargeAmount : new Num(0, 0);
  }
  action(): undefined {
    // Calculate green keys gained based on effective charge
    const effectiveCharge = this.getEffectiveCharge();
    this.effect = effectiveCharge.pow(new Num(2, 0));
  }

  applyTierDrawback(chargeValue: Num): Num {
    // Reduce effectiveness with higher tiers
    if (this.tier.equals(new Num(0, 0))) {
      return chargeValue;
    }
    return chargeValue.div(this.tier.sqrt());
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
    return 'Increases green key gain, which enhances yellow upgrades and generators.';
  }

  getEffectDescription(): string {
    return `Gain ${this.effect.toString()} green keys`;
  }

  override init() {
    this.requirement = [
      new Requirement(HoldingRecord.yellowParticles, new Num(1, 9999999999), this)
    ]
  }
}
