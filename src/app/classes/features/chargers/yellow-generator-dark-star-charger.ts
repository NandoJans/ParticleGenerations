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

  getChargeAmount(): Num {
    // Charge based on yellow power - only increases
    const yellowPower = HoldingRecord.yellowPower;
    const chargeAmount = yellowPower.amount.log10();
    return chargeAmount.gt(this.charge) ? chargeAmount : this.charge;
  }

  action(): Num {
    // Calculate and apply massive static multiplier to yellow generators
    const effectiveCharge = this.getEffectiveCharge();
    const baseEffect = new Num(10, 0).pow(effectiveCharge);
    
    // Apply shared tier boost from all charger tiers
    const effect = this.applySharedTierBoost(baseEffect);
    
    // Apply the multiplier to yellow generators
    MultiplierRecord.yellowGenerators.correct(effect);
    
    this.effect = effect;
    return effect;
  }

  applyNerfs(): void {
    // Nerfs applied:
    // 1. Raise yellow generator multipliers to ^0.5
    const power = new Num(0.5, 0);
    
    MultiplierRecord.yellowGenerators.addLocalHook(
      this.name,
      (multiplier: Multiplier) => multiplier.power(power),
      true
    );
    
    // 2. Decrease active generators based on tier, starting with 5
    if (this.tier.greq(new Num(1, 0))) GeneratorRecord.fifthYellowGenerator.disable();
    if (this.tier.greq(new Num(2, 0))) GeneratorRecord.fourthYellowGenerator.disable();
    if (this.tier.greq(new Num(3, 0))) GeneratorRecord.thirdYellowGenerator.disable();
    if (this.tier.greq(new Num(4, 0))) GeneratorRecord.secondYellowGenerator.disable();
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
