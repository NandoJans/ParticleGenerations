import {DarkStarCharger} from "./dark-star-charger";
import {Num} from "../../../num";
import {ResetKey} from "../../enums/reset-key";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {Multiplier} from "../multiplier";

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
  baseMaxCharge: Num = new Num(100, 0);
  maxTier: Num | undefined = new Num(10, 0);
  canInfiniteChargeAtMaxTier: boolean = true;
  requirement: Requirement[] = [];
  name: string = 'star-key-dark-star-charger';

  override tierNerf: Num[] = [
    new Num(0.5, 0)
  ];

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
    // Charge based on star keys - only increases
    const starKeys = HoldingRecord.starKeys;
    return starKeys.amount.log10();
  }

  action(): Num {
    // Calculate and apply yellow key-gain boost
    const effectiveCharge = this.getEffectiveCharge();
    const baseEffect = new Num(10, 0).pow(effectiveCharge);

    // Apply shared tier boost from all charger tiers
    const effect = this.applySharedTierBoost(baseEffect);

    // Apply the multiplier to yellow key gain
    MultiplierRecord.yellowKeyGain.correct(effect);

    this.effect = effect;
    return effect;
  }

  private originalStarKeyBuffer: Num | undefined;

  applyNerfs(): void {
    // Star key multiplies star key power by 0.95 instead of normal value
    const starKeys = HoldingRecord.starKeys;

    // Store original buffer if not already stored
    if (!this.originalStarKeyBuffer) {
      this.originalStarKeyBuffer = starKeys.buffer.copy();
    }

    // Get original buffer to use as base
    const baseBuffer = this.originalStarKeyBuffer;

    // Reduce star key power by multiplying buffer by 0.95, decreasing further per tier
    const nerfMultiplier = new Num(0.95, 0).pow(this.tier);
    starKeys.buffer = baseBuffer.mul(nerfMultiplier);
  }

  revertNerfs(): void {
    // Restore normal star key power multiplier
    const starKeys = HoldingRecord.starKeys;
    if (this.originalStarKeyBuffer) {
      starKeys.buffer = this.originalStarKeyBuffer.copy();
    }
  }

  getNerfDescription(): string {
    return 'Star key power multiplier reduced to 0.95x per tier (compounds with tier).';
  }

  getEffectDescription(): string {
    return `${this.effect.toString()}x yellow key gain`;
  }

  getChargeDescription(): string {
    return 'Charges based on the amount of star keys you have.';
  }

  getRewardDescription(): string {
    return 'Increases yellow key gain.';
  }

  override init() {
    this.requirement = [
      new Requirement(HoldingRecord.starKeys, new Num(1, 9999999999), this)
    ]
  }
}
