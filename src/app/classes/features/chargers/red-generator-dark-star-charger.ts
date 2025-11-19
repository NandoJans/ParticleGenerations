import {DarkStarCharger} from "./dark-star-charger";
import {Num} from "../../../num";
import {ResetKey} from "../../enums/reset-key";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";

/**
 * Red Generator Dark Star Charger
 *
 * Nerfs: The multipliers of red generators are raised to another ^0.5.
 *        Every tier disables one extra generator, starting with all generators.
 * Charge: Is gained by getting more red particles.
 * Amplifies: Gives a static multiplier to red generators with the function: 10^CHARGE.
 */
export class RedGeneratorDarkStarCharger extends DarkStarCharger {
  displayName: string = 'Red Generator Charger';
  resetId: ResetKey = ResetKey.GREEN;
  maxCharge: Num = new Num(100, 0);
  maxTier: Num | undefined = new Num(10, 0);
  canInfiniteChargeAtMaxTier: boolean = true;
  requirement: Requirement[] = [];
  name: string = 'red-generator-dark-star-charger';

  getChargeAmount(): Num {
    // Charge is gained by getting more red particles
    const redParticles = HoldingRecord.redParticles;
    const chargeAmount = redParticles.amount.log10();
    return chargeAmount.gt(new Num(0, 0)) ? chargeAmount : new Num(0, 0);
  }

  action(): void {
    // Calculate effect: 10^CHARGE
    const effectiveCharge = this.getEffectiveCharge();
    this.effect = new Num(10, 0).pow(effectiveCharge);
    
    // The effect is applied to red generators through their multiplier calculation
    // This will be used when red generators calculate their total multiplier
  }

  applyTierDrawback(chargeValue: Num): Num {
    // Apply tier-based drawback - reduce effectiveness as tiers increase
    if (this.tier.equals(new Num(0, 0))) {
      return chargeValue;
    }
    // Reduce charge effectiveness by dividing by (tier + 1)
    return chargeValue.div(this.tier.add(new Num(1, 0)));
  }

  applyNerfs(): void {
    // Nerfs applied:
    // 1. Red generator multipliers are raised to ^0.5
    // 2. Every tier disables one extra generator, starting with all generators
    // These nerfs are applied in the red generator calculation logic
    // The nerf state is tracked by isNerfActive flag
  }

  revertNerfs(): void {
    // Revert nerfs to red generators
    // When nerf is deactivated, red generators return to normal operation
  }

  getNerfDescription(): string {
    return 'Red generator multipliers are raised to ^0.5. Each tier disables one additional generator.';
  }

  getEffectDescription(): string {
    return `${this.effect.toString()}x multiplier to red generators`;
  }

  override init() {
    this.requirement = [
      new Requirement(HoldingRecord.redParticles, new Num(1, 9999999999), this)
    ]
  }
}
