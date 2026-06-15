import {DarkStarCharger} from "./dark-star-charger";
import {Num} from "../../../num";
import {ResetKey} from "../../enums/reset-key";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

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
    new Num(0.9, 0), // TIER II
    new Num(0.8, 0), // TIER III
    new Num(0.7, 0), // TIER IV
    new Num(0.6, 0), // TIER V
    new Num(0.5, 0), // TIER VI
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
    return HoldingRecord.starKeys.amount.pow(new Num(2, 0));
  }

  action(): Num {
    const effectiveCharge = this.getEffectiveCharge().add(this.getSharedCharge());
    const baseEffect = new Num(2, 0).pow(effectiveCharge);
    const effect = this.applySharedTierBoost(baseEffect);
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
    return 'Charges from your Star Keys ^ 2.';
  }

  getRewardDescription(): string {
    return 'Increases yellow key gain.';
  }

  override getEffectBreakdown(): { formula: string; effects: string[] } {
    return {
      formula: '10^(charge + combined charge) × shared tier boost',
      effects: [
        `Current Charge: ${this.getEffectiveCharge().toString()} + ${this.getSharedCharge().toString()}`,
        `Tier: ${this.tier.toString()}`,
        `Yellow Key Gain: ${this.effect.toString(2)}x`
      ]
    };
  }

  override getTierMilestoneBoostDescription(): string {
    return 'Each tier raises the charge cap by 10x and contributes to the shared charger boost.';
  }

  override init() {
    this.requirement = [
      new Requirement(HoldingRecord.starKeys, new Num(95, 0), this)
    ];
  }
}
