import {DarkStarCharger} from "./dark-star-charger";
import {Num} from "../../../num";
import {ResetKey} from "../../enums/reset-key";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {Multiplier} from "../multiplier";

/**
 * Yellow Fusion Dark Star Charger
 *
 * Nerfs: Yellow fusion limit has decreased to 6e66
 * Charge: is gained based on fusion amount multiplied by fusion booster accelerations
 * Amplifies: Hydrogen generation speed
 */
export class YellowFusionDarkStarCharger extends DarkStarCharger {
  displayName: string = 'Yellow Fusion Charger';
  resetId: ResetKey = ResetKey.GREEN;
  baseMaxCharge: Num = new Num(100, 0);
  maxTier: Num | undefined = new Num(10, 0);
  canInfiniteChargeAtMaxTier: boolean = true;
  requirement: Requirement[] = [];
  name: string = 'yellow-fusion-dark-star-charger';

  getChargeAmount(): Num {
    // Charge based on fusion amount - only increases
    const yellowFusion = HoldingRecord.yellowFusion;
    const fusionAmount = yellowFusion.amount;

    const chargeAmount = fusionAmount.log10();
    return chargeAmount.gt(this.getCharge()) ? chargeAmount : this.getCharge();
  }

  action(): Num {
    // Calculate and apply hydrogen generation speed boost
    const effectiveCharge = this.getEffectiveCharge();
    const baseEffect = new Num(1, 0).add(effectiveCharge.mul(new Num(0.1, 0)));

    // Apply shared tier boost from all charger tiers
    const effect = this.applySharedTierBoost(baseEffect);

    // Apply the multiplier to hydrogen generators
    MultiplierRecord.hydrogenGenerators.correct(effect);

    this.effect = effect;
    return effect;
  }

  private originalMaxAmount: Num | undefined;

  applyNerfs(): void {
    // Decrease yellow fusion limit to 6e66
    const yellowFusion = HoldingRecord.yellowFusion;

    // Store original max amount if not already stored
    if (!this.originalMaxAmount) {
      this.originalMaxAmount = yellowFusion.maxAmount.copy();
    }

    // Set reduced max amount
    yellowFusion.maxAmount = new Num(6, 66);

    // Apply hydrogen generation nerf
    const hydrogenPower = new Num(0.5, 0);
    MultiplierRecord.hydrogenGenerators.addLocalHook(
      this.name,
      (multiplier: Multiplier) => multiplier.power(hydrogenPower),
      true
    );
  }

  revertNerfs(): void {
    // Restore original yellow fusion limit
    const yellowFusion = HoldingRecord.yellowFusion;
    if (this.originalMaxAmount) {
      yellowFusion.maxAmount = this.originalMaxAmount.copy();
    }

    // Remove hydrogen generation nerf
    delete MultiplierRecord.hydrogenGenerators.localHooks[this.name];
  }

  getNerfDescription(): string {
    return 'Yellow fusion limit decreased to 6e66.';
  }

  getEffectDescription(): string {
    return `${this.effect.toString()}x hydrogen generation speed`;
  }

  getChargeDescription(): string {
    return 'Charges based on fusion amount multiplied by fusion booster accelerations.';
  }

  getRewardDescription(): string {
    return 'Increases hydrogen generation speed.';
  }

  override init() {
    this.requirement = [
      new Requirement(HoldingRecord.yellowFusion, new Num(1, 9999999999), this)
    ]
  }
}
