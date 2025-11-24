import {DarkStarCharger} from "./dark-star-charger";
import {Num} from "../../../num";
import {ResetKey} from "../../enums/reset-key";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {Multiplier} from "../multiplier";
import {GeneratorRecord} from "../../records/generators/generator-record";

/**
 * Red Generator Dark Star Charger
 *
 * Nerfs: The multipliers of red generators are raised to another ^0.5.
 *        Every tier disables one extra generator, starting with all generators.
 * Charge: Is gained by getting more red particles.
 * Amplifies: Gives a static multiplier to red generators with the function: 10^CHARGE.
 *            The effect is raised to the power of the number of tiers.
 * Tier Up: Max charge increases by 10x per tier.
 */
export class RedGeneratorDarkStarCharger extends DarkStarCharger {
  displayName: string = 'Red Generator Charger';
  resetId: ResetKey = ResetKey.GREEN;
  baseMaxCharge: Num = new Num(100, 0);
  maxTier: Num | undefined = new Num(10, 0);
  canInfiniteChargeAtMaxTier: boolean = true;
  requirement: Requirement[] = [];
  name: string = 'red-generator-dark-star-charger';

  override buffer: Num = new Num(1, 1);
  override baseBuffer: Num = new Num(1, 1);

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
    // Charge is gained by getting more red particles
    const redParticles = HoldingRecord.redParticles;
    const chargeAmount = redParticles.amount.log10();
    return chargeAmount.gt(this.charge) ? chargeAmount : this.charge;
  }

  action(): Num {
    // Base effect: 10^charge
    const baseEffect = this.buffer.pow(this.charge);
    // Raise to the power of the number of tiers
    const effect = baseEffect.pow(this.tier);
    MultiplierRecord.redParticleGenerators.correct(effect);
    return effect;
  }

  applyTierDrawback(chargeValue: Num): Num {
    // Apply tier-based drawback - reduce effectiveness as tiers increase
    if (this.tier.lte(new Num(1, 0))) {
      return chargeValue;
    }
    // Reduce charge effectiveness by dividing by (tier + 1)
    return chargeValue.div(this.tier.add(new Num(1, 0)));
  }

  applyNerfs(): void {
    // Nerfs applied:
    // 1. Red generator multipliers are raised to ^0.5
    const power = new Num(0.9, 0).pow(this.tier);

    MultiplierRecord.redParticleGenerators.addLocalHook(
      this.name,
      (multiplier: Multiplier) => multiplier.power(power),
      true
    );
    // 2. Every tier disables one extra generator, starting with all generators
    if (this.tier.greq(Num.TWO)) GeneratorRecord.fifthRedGenerator.disable();
    if (this.tier.greq(Num.THREE)) GeneratorRecord.fourthRedGenerator.disable();
    if (this.tier.greq(Num.FOUR)) GeneratorRecord.thirdRedGenerator.disable();
    if (this.tier.greq(Num.FIVE)) GeneratorRecord.secondRedGenerator.disable();
    // These nerfs are applied in the red generator calculation logic
    // The nerf state is tracked by isNerfActive flag
  }

  revertNerfs(): void {
    // Revert nerfs to red generators
    // When nerf is deactivated, red generators return to normal operation
    GeneratorRecord.fifthRedGenerator.enable();
    GeneratorRecord.fourthRedGenerator.enable();
    GeneratorRecord.thirdRedGenerator.enable();
    GeneratorRecord.secondRedGenerator.enable();
  }

  getNerfDescription(): string {
    return 'Red generator multipliers are raised to ^0.5. Each tier disables one additional generator.';
  }

  getEffectDescription(): string {
    return `${this.effect.toString()}x multiplier to red generators`;
  }

  getChargeDescription(): string {
    return 'Charges based on the amount of red particles you have.';
  }

  getRewardDescription(): string {
    return 'Provides a static multiplier to red generators.';
  }

  override getEffectBreakdown(): { formula: string; effects: string[] } {
    return {
      formula: `(10^charge)^tier`,
      effects: [
        `Current Charge: ${this.charge.toString(2)}`,
        `Tier: ${this.tier.toString(2)}`,
        `Effect: ${this.effect.toString(2)}x`
      ]
    }
  }

  override getTierMilestoneBoostDescription(): string {
    if (this.tier.lte(new Num(1, 0))) {
      return 'Tier up to raise the effect to a higher power and increase max charge by 10x.';
    }
    const nextTier = this.tier.add(new Num(1, 0));
    const currentMaxCharge = this.maxCharge;
    const nextMaxCharge = this.getMaxChargeForTier(nextTier);
    return `Next tier: Max charge increases from ${currentMaxCharge.toString()} to ${nextMaxCharge.toString()}. Effect will be raised to ^${nextTier.toString()}.`;
  }

  override init() {
    this.requirement = [
      new Requirement(HoldingRecord.redParticles, new Num(1, 15_000_000), this)
    ]
  }
}
