import {DarkStarCharger} from "./dark-star-charger";
import {Num} from "../../../num";
import {ResetKey} from "../../enums/reset-key";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {ChallengeRecord} from "../../records/challenges/challenge-record";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {ProximaCentauriStarChallenge} from "../challenges/proxima-centauri-star-challenge";

/**
 * Star Challenge Dark Star Charger
 *
 * Nerfs: Makes star challenges way harder without any reward for completion. Sun particles and sirius particles cannot be generated
 * Charge: is gained based on total completions and red particles gained in sirius star challenge
 * Amplifies:
 *   1. Increases challenge holding generation speed slightly
 *   2. Increases the buff gained from challenges slightly
 *   3. Increases Proxima Centauri max buff
 */
export class StarChallengeDarkStarCharger extends DarkStarCharger {
  displayName: string = 'Star Challenge Charger';
  resetId: ResetKey = ResetKey.GREEN;
  baseMaxCharge: Num = new Num(100, 0);
  maxTier: Num | undefined = new Num(10, 0);
  canInfiniteChargeAtMaxTier: boolean = true;
  requirement: Requirement[] = [];
  name: string = 'star-challenge-dark-star-charger';

  // Effect breakdown values for display
  holdingSpeedEffect: Num = new Num(1, 0);
  challengeBuffEffect: Num = new Num(1, 0);
  proximaMaxBuffEffect: Num = new Num(1, 0);

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
    // Charge based on total completions and red particles from sirius - only increases
    const siriusStar = ChallengeRecord.siriusStar;
    const totalCompletions = siriusStar.completed instanceof Num ? siriusStar.completed : new Num(0, 0);
    const redParticles = HoldingRecord.redParticles;

    return totalCompletions.mul(redParticles.amount.log10());
  }

  action(): Num {
    const effectiveCharge = this.getEffectiveCharge();

    // Calculate the three effects based on charge and tier
    // 1. Challenge holding generation speed: slight increase (1 + charge * 0.01 * tier)
    this.holdingSpeedEffect = Num.ONE.add(
      effectiveCharge.mul(new Num(0.01, 0)).mul(this.tier)
    );

    // 2. Challenge buff boost: slight increase (1 + charge * 0.005 * tier)
    this.challengeBuffEffect = Num.ONE.add(
      effectiveCharge.mul(new Num(0.005, 0)).mul(this.tier)
    );

    // 3. Proxima Centauri max buff increase: (1 + charge * 0.02 * tier)
    this.proximaMaxBuffEffect = Num.ONE.add(
      effectiveCharge.mul(new Num(0.02, 0)).mul(this.tier)
    );

    // Apply shared tier boost from all charger tiers
    this.holdingSpeedEffect = this.applySharedTierBoost(this.holdingSpeedEffect);
    this.challengeBuffEffect = this.applySharedTierBoost(this.challengeBuffEffect);
    this.proximaMaxBuffEffect = this.applySharedTierBoost(this.proximaMaxBuffEffect);

    // Apply the multipliers
    MultiplierRecord.starChallengeHoldingSpeed.correct(this.holdingSpeedEffect);
    MultiplierRecord.challengeBuffBoost.correct(this.challengeBuffEffect);
    MultiplierRecord.proximaCentauriMaxBuff.correct(this.proximaMaxBuffEffect);

    // Update Proxima Centauri's max effect using the constant from the challenge class
    const proximaChallenge = ChallengeRecord.proximaCentauriStar;
    proximaChallenge.maxEffect = ProximaCentauriStarChallenge.BASE_MAX_EFFECT.mul(this.proximaMaxBuffEffect);

    // Store the challenge buff effect as the primary display effect (most representative of overall power)
    this.effect = this.challengeBuffEffect;
    return this.effect;
  }

  private originalDifficulties: Map<string, Num | Num[]> = new Map();

  applyNerfs(): void {
    // Nerfs applied:
    // 1. Make star challenges way harder without rewards
    // 2. Prevent sun and sirius particles from being generated
    // Store original difficulties and increase them
    const challenges = [
      ChallengeRecord.proximaCentauriStar,
      ChallengeRecord.lalandeStar,
      ChallengeRecord.sunStar,
      ChallengeRecord.siriusStar
    ];

    challenges.forEach(challenge => {
      // Store original difficulty
      if (!this.originalDifficulties.has(challenge.name)) {
        if (challenge.difficultyIncrease instanceof Num) {
          this.originalDifficulties.set(challenge.name, challenge.difficultyIncrease.copy());
        } else if (Array.isArray(challenge.difficultyIncrease)) {
          this.originalDifficulties.set(challenge.name, challenge.difficultyIncrease.map(n => n.copy()));
        } else {
          this.originalDifficulties.set(challenge.name, new Num(1, 0));
        }
      }

      // Increase difficulty by 10x per tier
      // Note: Using 'as any' to bypass TypeScript type narrowing issues with union types
      const difficultyMultiplier = new Num(10, 0).pow(this.tier);
      const currentDifficulty = challenge.difficultyIncrease;
      if (currentDifficulty instanceof Num) {
        (challenge as any).difficultyIncrease = currentDifficulty.mul(difficultyMultiplier);
      } else if (Array.isArray(currentDifficulty)) {
        (challenge as any).difficultyIncrease = currentDifficulty.map(n => n.mul(difficultyMultiplier));
      }
    });
  }

  revertNerfs(): void {
    // Restore star challenge difficulty and rewards
    const challenges = [
      ChallengeRecord.proximaCentauriStar,
      ChallengeRecord.lalandeStar,
      ChallengeRecord.sunStar,
      ChallengeRecord.siriusStar
    ];

    challenges.forEach(challenge => {
      // Restore original difficulty
      // Note: Using 'as any' to bypass TypeScript type narrowing issues with union types
      const originalDifficulty = this.originalDifficulties.get(challenge.name);
      if (originalDifficulty !== undefined) {
        if (originalDifficulty instanceof Num) {
          (challenge as any).difficultyIncrease = originalDifficulty.copy();
        } else if (Array.isArray(originalDifficulty)) {
          (challenge as any).difficultyIncrease = originalDifficulty.map(n => n.copy());
        }
      }
    });
  }

  getNerfDescription(): string {
    return 'Star challenges are much harder (difficulty multiplied by 10^tier) with no rewards. Sun and Sirius particles cannot be generated.';
  }

  getEffectDescription(): string {
    return `Holding speed: ${this.holdingSpeedEffect.toString(2)}x, Buff boost: ${this.challengeBuffEffect.toString(2)}x, Proxima max: ${this.proximaMaxBuffEffect.toString(2)}x`;
  }

  getChargeDescription(): string {
    return 'Charges based on total completions and red particles gained in Sirius star challenge.';
  }

  getRewardDescription(): string {
    return 'Increases challenge holding generation speed, challenge buff gains, and Proxima Centauri max buff.';
  }

  override getEffectBreakdown(): { formula: string; effects: string[] } {
    return {
      formula: "charge × tier × factor",
      effects: [
        `Current Charge: ${this.getCharge().toString()} + ${this.getSharedCharge().toString()}`,
        `Tier: ${this.tier.toString()}`,
        `Holding Speed: ${this.holdingSpeedEffect.toString(2)}x`,
        `Challenge Buff Boost: ${this.challengeBuffEffect.toString(2)}x`,
        `Proxima Centauri Max Buff: ${this.proximaMaxBuffEffect.toString(2)}x`
      ]
    }
  }

  override init() {
    this.requirement = [
      new Requirement(HoldingRecord.redParticles, new Num(1, 9999999999), this)
    ]
  }
}
