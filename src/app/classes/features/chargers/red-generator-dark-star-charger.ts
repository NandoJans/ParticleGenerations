import {DarkStarCharger} from "./dark-star-charger";
import {Num} from "../../../num";
import {ResetKey} from "../../enums/reset-key";
import {Requirement} from "../interfaces/requirement";

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
    // TODO: Implement based on red particles gained
    // For now, return a placeholder
    return new Num(0, 0);
  }

  action(): void {
    // Calculate effect: 10^CHARGE
    const effectiveCharge = this.getEffectiveCharge();
    this.effect = new Num(10, 0).pow(effectiveCharge);
    
    // TODO: Apply multiplier to red generators
  }

  applyTierDrawback(chargeValue: Num): Num {
    // TODO: Implement tier-based drawback
    // For now, simple division by tier
    if (this.tier.eq(new Num(0, 0))) {
      return chargeValue;
    }
    return chargeValue.div(this.tier);
  }

  applyNerfs(): void {
    // TODO: Apply ^0.5 to red generator multipliers
    // TODO: Disable generators based on tier
  }

  revertNerfs(): void {
    // TODO: Revert nerfs to red generators
  }

  getNerfDescription(): string {
    return 'Red generator multipliers are raised to ^0.5. Each tier disables one additional generator.';
  }

  getEffectDescription(): string {
    return `${this.effect.toString()}x multiplier to red generators`;
  }
}
