import {DarkStarCharger} from "./dark-star-charger";
import {Num} from "../../../num";
import {ResetKey} from "../../enums/reset-key";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {Multiplier} from "../multiplier";
import {GeneratorRecord} from "../../records/generators/generator-record";

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
  baseMaxCharge: Num = new Num(100, 0);
  maxTier: Num | undefined = new Num(10, 0);
  canInfiniteChargeAtMaxTier: boolean = true;
  requirement: Requirement[] = [];
  name: string = 'yellow-generator-dark-star-charger';

  override buffer: Num = new Num(5, 0);
  override baseBuffer: Num = new Num(5, 0);

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
    // Charge based on yellow power - only increases
    const yellowPower = HoldingRecord.yellowPower;
    return yellowPower.amount.log10().pow(new Num(1.23, 0));
  }

  action(): Num {
    // Base effect: 10^charge
    const baseEffect = this.buffer.pow(this.getCharge().add(this.getSharedCharge()));
    // Raise to the power of the number of tiers
    const effect = baseEffect.pow(new Num(0.55, 0).mul(this.tier).add(new Num(0.45, 0)));
    // Apply shared tier boost from all charger tiers
    MultiplierRecord.yellowGenerators.correct(effect);
    return effect;
  }

  applyNerfs(): void {
    // Nerfs applied:
    // 1. Raise yellow generator multipliers to ^0.5, decreasing further per tier
    const power = new Num(0.5, 0).mul(new Num(0.9, 0).pow(this.tier.sub(Num.ONE)));

    MultiplierRecord.yellowGenerators.addLocalHook(
      this.name,
      (multiplier: Multiplier) => multiplier.power(power),
      true
    );

    // 2. Decrease active generators based on tier, starting with 5
    if (this.tier.greq(new Num(3, 0))) GeneratorRecord.fifthYellowGenerator.disable();
    if (this.tier.greq(new Num(4, 0))) GeneratorRecord.fourthYellowGenerator.disable();
    if (this.tier.greq(new Num(5, 0))) GeneratorRecord.thirdYellowGenerator.disable();
    if (this.tier.greq(new Num(6, 0))) GeneratorRecord.secondYellowGenerator.disable();
  }

  revertNerfs(): void {
    // Revert yellow generator multiplier nerf
    delete MultiplierRecord.yellowGenerators.localHooks[this.name];

    // Restore full active generator count
    GeneratorRecord.fifthYellowGenerator.enable();
    GeneratorRecord.fourthYellowGenerator.enable();
    GeneratorRecord.thirdYellowGenerator.enable();
    GeneratorRecord.secondYellowGenerator.enable();
  }

  getNerfDescription(): string {
    return `Yellow generator multipliers are raised to ^0.5, decreasing further per tier. Tiers disable yellow generators.`;
  }

  getEffectDescription(): string {
    return `${this.effect.toString()}x multiplier to yellow generators`;
  }

  getChargeDescription(): string {
    return 'Charges based on the amount of yellow power you have.';
  }

  getRewardDescription(): string {
    return 'Provides a multiplier to yellow generators.';
  }

  override getEffectBreakdown(): { formula: string; effects: string[] } {
    return {
      formula: `charge^(0.55 x tier + 0.45)`,
      effects: [
        `Current Charge: ${this.getCharge().toString()} + ${this.getSharedCharge().toString()}`,
        `Tier: ${this.tier.toString()}`,
        `Effect: ${this.effect.toString(2)}x`
      ]
    }
  }

  override init() {
    this.requirement = [
      new Requirement(HoldingRecord.yellowPower, new Num(1, 25_000), this)
    ]
  }
}
