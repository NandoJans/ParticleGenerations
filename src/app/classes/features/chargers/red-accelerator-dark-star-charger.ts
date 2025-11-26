import {DarkStarCharger} from "./dark-star-charger";
import {Num} from "../../../num";
import {ResetKey} from "../../enums/reset-key";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {Multiplier} from "../multiplier";

/**
 * Red Accelerator Dark Star Charger
 *
 * Nerfs: Only the square root of red accelerators are generated, then, only the square root of red accelerators have effect.
 * Charge: Is gained by getting more red accelerators.
 * Amplifies: Provides a powerful multiplier to red accelerator generation.
 */
export class RedAcceleratorDarkStarCharger extends DarkStarCharger {
  displayName: string = 'Red Accelerator Charger';
  resetId: ResetKey = ResetKey.GREEN;
  baseMaxCharge: Num = new Num(100, 0);
  maxTier: Num | undefined = new Num(10, 0);
  canInfiniteChargeAtMaxTier: boolean = true;
  requirement: Requirement[] = [];
  name: string = 'red-accelerator-dark-star-charger';

  // Set calculation order to run after upgrades (400) but before generators (1000)
  // This ensures the charger's effect is applied at the correct time
  override calculationOrder: number = 500;

  // Static multiplier that can be adjusted to make the charger stronger
  // This multiplies the initial effect before raising to the power of tiers
  static staticMultiplier: Num = new Num(1, 1);

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
    // Charge based on red accelerators gained - only increases
    const redAccelerators = HoldingRecord.redAccelerators;
    return redAccelerators.amount.log10().pow(new Num(1.25, 0));
  }

  action(): Num {
    // Base effect: buffer^charge (multiplier * charge amount)
    // This won't charge itself indefinitely because we use charge as exponent, not as multiplier
    const baseEffect = this.buffer.pow(this.getCharge().add(this.getSharedCharge()));

    // Apply static multiplier to the initial effect
    const multipliedEffect = baseEffect.mul(RedAcceleratorDarkStarCharger.staticMultiplier);

    // Raise to the power of tier amount (0.5 * tier + 0.5)
    const effect = multipliedEffect.pow(new Num(0.5, 0).mul(this.tier).add(new Num(0.5, 0)));

    // Apply the effect to red accelerator generators
    MultiplierRecord.redAcceleratorGenerators.correct(effect);

    this.effect = effect;
    return effect;
  }

  applyNerfs(): void {
    // this.charge = new Num(0, 0);
    // Nerfs: Only square root of red accelerators are generated and have effect
    const power = new Num(0.5, 0).mul(new Num(0.9, 0).pow(this.tier.sub(Num.ONE)));

    MultiplierRecord.redAcceleratorGenerators.addLocalHook(
      this.name,
      (multiplier: Multiplier) => multiplier.power(power),
      true
    );
  }

  revertNerfs(): void {
    // Revert the square root nerfs
    delete MultiplierRecord.redAcceleratorGenerators.localHooks[this.name];
  }

  getNerfDescription(): string {
    return 'Only the square root of red accelerators are generated, then only the square root have effect. Tiers amplify this nerf.';
  }

  getEffectDescription(): string {
    return `${this.effect.toString()}x multiplier to red accelerator generation`;
  }

  getChargeDescription(): string {
    return 'Charges based on the amount of red accelerators you have.';
  }

  getRewardDescription(): string {
    return 'Provides a powerful multiplier to red accelerator generation.';
  }

  override getEffectBreakdown(): { formula: string; effects: string[] } {
    return {
      formula: `(${this.buffer.toString()}^charge × ${RedAcceleratorDarkStarCharger.staticMultiplier.toString()})^(0.5×tier + 0.5)`,
      effects: [
        `Current Charge: ${this.getCharge().toString()} + ${this.getSharedCharge().toString()}`,
        `Tier: ${this.tier.toString()}`,
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
    return `Next tier: Max charge increases from ${currentMaxCharge.toString()} to ${nextMaxCharge.toString()}. Effect power will increase.`;
  }

  override init() {
    this.requirement = [
      new Requirement(HoldingRecord.redAccelerators, new Num(1, 500_000), this)
    ]
  }
}
