import {DarkStarCharger} from "./dark-star-charger";
import {Num} from "../../../num";
import {ResetKey} from "../../enums/reset-key";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";

/**
 * Red Accelerator Dark Star Charger
 *
 * Nerfs: Only the square root of red accelerators are generated, then, only the square root of red accelerators have effect.
 * Charge: Is gained by getting more red accelerators.
 * Amplifies: Make red accelerator upgrades more powerful
 */
export class RedAcceleratorDarkStarCharger extends DarkStarCharger {
  displayName: string = 'Red Accelerator Charger';
  resetId: ResetKey = ResetKey.GREEN;
  maxCharge: Num = new Num(100, 0);
  maxTier: Num | undefined = new Num(10, 0);
  canInfiniteChargeAtMaxTier: boolean = true;
  requirement: Requirement[] = [];
  name: string = 'red-accelerator-dark-star-charger';

  getChargeAmount(): Num {
    // Charge based on red accelerators gained
    const redAccelerators = HoldingRecord.redAccelerators;
    const chargeAmount = redAccelerators.amount.log10();
    return chargeAmount.gt(new Num(0, 0)) ? chargeAmount : new Num(0, 0);
  }

  action(): undefined {
    // Calculate effect based on charge
    const effectiveCharge = this.getEffectiveCharge();
    this.effect = new Num(1, 0).add(effectiveCharge.div(new Num(10, 0)));
  }

  applyTierDrawback(chargeValue: Num): Num {
    // Reduce effectiveness with higher tiers
    if (this.tier.equals(new Num(0, 0))) {
      return chargeValue;
    }
    return chargeValue.div(this.tier);
  }

  applyNerfs(): void {
    // Nerfs: Only square root of red accelerators are generated and have effect
    // This nerf is applied in the red accelerator generation and effect calculation
    // The nerf state is tracked by isNerfActive flag
  }

  revertNerfs(): void {
    // Revert the square root nerfs
    // Red accelerators return to normal generation and effect
  }

  getNerfDescription(): string {
    return 'Only the square root of red accelerators are generated, then only the square root have effect.';
  }

  getEffectDescription(): string {
    return `${this.effect.toString()}x power to red accelerator upgrades`;
  }

  getChargeDescription(): string {
    return 'Charges based on the amount of red accelerators you have.';
  }

  getRewardDescription(): string {
    return 'Makes red accelerator upgrades more powerful.';
  }

  override init() {
    this.requirement = [
      new Requirement(HoldingRecord.redParticles, new Num(1, 9999999999), this)
    ]
  }
}
