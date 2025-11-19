import {DarkStarCharger} from "./dark-star-charger";
import {Num} from "../../../num";
import {ResetKey} from "../../enums/reset-key";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";

/**
 * Star Key Dark Star Charger
 * 
 * Nerfs: Star key instead multiplies the star key power by 0.95
 * Charge: is gained based on star keys
 * Amplifies: Yellow key-gain
 */
export class StarKeyDarkStarCharger extends DarkStarCharger {
  displayName: string = 'Star Key Charger';
  resetId: ResetKey = ResetKey.GREEN;
  maxCharge: Num = new Num(100, 0);
  maxTier: Num | undefined = new Num(10, 0);
  canInfiniteChargeAtMaxTier: boolean = true;
  requirement: Requirement[] = [];
  name: string = 'star-key-dark-star-charger';

  getChargeAmount(): Num {
    // Charge based on star keys
    const starKeys = HoldingRecord.starKeys;
    const chargeAmount = starKeys.amount.log10();
    return chargeAmount.gt(new Num(0, 0)) ? chargeAmount : new Num(0, 0);
  }

  action(): void {
    // Calculate yellow key-gain boost
    const effectiveCharge = this.getEffectiveCharge();
    this.effect = new Num(10, 0).pow(effectiveCharge);
  }

  applyTierDrawback(chargeValue: Num): Num {
    // Reduce effectiveness with higher tiers
    if (this.tier.equals(new Num(0, 0))) {
      return chargeValue;
    }
    return chargeValue.div(this.tier);
  }

  applyNerfs(): void {
    // Star key multiplies star key power by 0.95 instead of normal value
    // This nerf is applied in the star key power calculation
    // The nerf state is tracked by isNerfActive flag
  }

  revertNerfs(): void {
    // Restore normal star key power multiplier
    // Star key power returns to normal operation
  }

  getNerfDescription(): string {
    return 'Star key power multiplier reduced to 0.95x.';
  }

  getEffectDescription(): string {
    return `${this.effect.toString()}x yellow key gain`;
  }

  override init() {
    this.requirement = [
      new Requirement(HoldingRecord.starKeys, new Num(1, 9999999999), this)
    ]
  }
}
