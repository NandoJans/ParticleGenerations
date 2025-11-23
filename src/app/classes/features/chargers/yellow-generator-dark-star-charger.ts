import {DarkStarCharger} from "./dark-star-charger";
import {Num} from "../../../num";
import {ResetKey} from "../../enums/reset-key";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";

/**
 * Yellow Generator Dark Star Charger
 *
 * Nerfs: Raises yellow generator multipliers to ^0.5, and decrease per tier, the amount of active generators, starting with 5.
 * Charge: Charge is based on yellow power
 * Amplifies: Gain a massive static multiplier to yellow generator multipliers.
 */
export class YellowGeneratorDarkStarCharger extends DarkStarCharger {
  displayName: string = 'Yellow Generator Charger';
  resetId: ResetKey = ResetKey.GREEN;
  maxCharge: Num = new Num(100, 0);
  maxTier: Num | undefined = new Num(10, 0);
  canInfiniteChargeAtMaxTier: boolean = true;
  requirement: Requirement[] = [];
  name: string = 'yellow-generator-dark-star-charger';

  getChargeAmount(): Num {
    // Charge based on yellow power
    const yellowPower = HoldingRecord.yellowPower;
    const chargeAmount = yellowPower.amount.log10();
    return chargeAmount.gt(new Num(0, 0)) ? chargeAmount : new Num(0, 0);
  }

  action(): undefined {
    // Calculate massive static multiplier based on effective charge
    const effectiveCharge = this.getEffectiveCharge();
    this.effect = new Num(10, 0).pow(effectiveCharge);
  }

  applyTierDrawback(chargeValue: Num): Num {
    // Reduce effectiveness with higher tiers
    if (this.tier.equals(new Num(0, 0))) {
      return chargeValue;
    }
    return chargeValue.pow(new Num(0.9, 0).pow(this.tier));
  }

  applyNerfs(): void {
    // Nerfs applied:
    // 1. Raise yellow generator multipliers to ^0.5
    // 2. Decrease active generators based on tier, starting with 5
    // These nerfs are applied in the yellow generator calculation logic
    // The nerf state is tracked by isNerfActive flag
  }

  revertNerfs(): void {
    // Revert yellow generator multiplier nerf
    // Restore full active generator count
    // Yellow generators return to normal operation
  }

  getNerfDescription(): string {
    const activeGenerators = new Num(5, 0).sub(this.tier);
    const minGenerators = activeGenerators.gt(new Num(1, 0)) ? activeGenerators : new Num(1, 0);
    return `Yellow generator multipliers are raised to ^0.5. Only ${minGenerators.toString()} generators are active.`;
  }

  getEffectDescription(): string {
    return `${this.effect.toString()}x multiplier to yellow generators`;
  }

  getChargeDescription(): string {
    return 'Charges based on the amount of yellow power you have.';
  }

  getRewardDescription(): string {
    return 'Provides a massive static multiplier to yellow generators.';
  }

  override init() {
    this.requirement = [
      new Requirement(HoldingRecord.yellowPower, new Num(1, 9999999999), this)
    ]
  }
}
