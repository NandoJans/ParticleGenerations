import {DarkStarCharger} from "./dark-star-charger";
import {Num} from "../../../num";
import {ResetKey} from "../../enums/reset-key";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {ChallengeRecord} from "../../records/challenges/challenge-record";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {ProximaCentauriStarChallenge} from "../challenges/proxima-centauri-star-challenge";
import {Multiplier} from "../multiplier";
import {Challenge} from "../challenge";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

/**
 * Star Challenge Dark Star Charger
 *
 * Nerfs: Makes star challenges way harder without any reward for completion. Reduces challenge holding generation by applying ^0.5.
 *        Sirius star challenge is especially difficult with an extra 100x multiplier on top of the base nerf.
 * Charge: is gained from red particles earned while currently inside any star challenge
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
  override tierNerf: Num[] = [
    new Num(0.5, 0)
  ];

  /**
   * Extra difficulty multiplier applied specifically to Sirius star challenge
   * when the Star Challenge Dark Charger is active.
   * This makes Sirius way more difficult compared to other star challenges.
   */
  private static readonly SIRIUS_EXTRA_DIFFICULTY_MULTIPLIER: Num = new Num(1, 5);

  // Effect breakdown values for display
  holdingSpeedEffect: Num = new Num(1, 0);
  challengeBuffEffect: Num = new Num(1, 0);
  proximaMaxBuffEffect: Num = new Num(1, 0);
  starChallengeGeneratorEffect: Num = new Num(1, 0);

  private getStarChallenges(): Challenge[] {
    return [
      ChallengeRecord.proximaCentauriStar,
      ChallengeRecord.lalandeStar,
      ChallengeRecord.sunStar,
      ChallengeRecord.siriusStar
    ];
  }

  private isInStarChallenge(): boolean {
    const currentYellowChallenge = ChallengeRecord.currentChallenges['yellow'];
    return this.getStarChallenges().includes(currentYellowChallenge);
  }

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
    // Only charge while currently in a star challenge.
    if (!this.isInStarChallenge()) {
      return Num.ZERO.copy();
    }

    // While inside a star challenge, charge directly from red particles gained in that run.
    // Most star challenges reset red particles on start, so current amount reflects in-challenge progress.
    return HoldingRecord.redParticles.amount.log10().div(new Num(1, 2));
  }

  action(): Num {
    const effectiveCharge = this.getEffectiveCharge().add(this.getSharedCharge());

    // Calculate the three effects based on charge and tier
    // 1. Challenge holding generation speed: slight increase (1 + charge * 0.01 * tier)
    this.holdingSpeedEffect = Num.ONE.add(
      new Num(3, 0).pow(effectiveCharge).mul(this.tier)
    );

    // 2. Challenge buff boost: slight increase (1 + charge * 0.005 * tier)
    this.challengeBuffEffect = Num.ONE.add(
      effectiveCharge.mul(new Num(0.005, 0)).mul(this.tier)
    );

    // 3. Proxima Centauri max buff increase: (1 + charge * 0.02 * tier)
    this.proximaMaxBuffEffect = Num.ONE.add(
      new Num(2, 0).mul(this.tier).pow(effectiveCharge)
    );

    // 4. In-star-challenge production boost for red generators/accelerators and yellow generators.
    this.starChallengeGeneratorEffect = Num.ONE.add(
      new Num(10, 0).pow(effectiveCharge.mul(new Num(0.25, 0))).mul(this.tier)
    );

    // Apply shared tier boost from all charger tiers
    this.holdingSpeedEffect = this.applySharedTierBoost(this.holdingSpeedEffect);
    this.challengeBuffEffect = this.applySharedTierBoost(this.challengeBuffEffect);
    this.proximaMaxBuffEffect = this.applySharedTierBoost(this.proximaMaxBuffEffect);
    this.starChallengeGeneratorEffect = this.applySharedTierBoost(this.starChallengeGeneratorEffect);

    // Apply the multipliers
    MultiplierRecord.starChallengeHoldingSpeed.correct(this.holdingSpeedEffect);
    MultiplierRecord.challengeBuffBoost.correct(this.challengeBuffEffect);
    MultiplierRecord.proximaCentauriMaxBuff.correct(this.proximaMaxBuffEffect);
    if (this.isInStarChallenge()) {
      MultiplierRecord.redParticleGenerators.correct(this.starChallengeGeneratorEffect.pow(new Num(1, 1)));
      MultiplierRecord.redAcceleratorGenerators.correct(this.starChallengeGeneratorEffect.pow(new Num(1, 1)));
      MultiplierRecord.yellowGenerators.correct(this.starChallengeGeneratorEffect);
    }

    // Update Proxima Centauri's max effect using the constant from the challenge class,
    // also applying the Greater Proxima Centauri star key upgrade buff if it has been bought
    const proximaChallenge = ChallengeRecord.proximaCentauriStar;
    const starKeyBuff = UpgradeRecord.greaterProximaCentauriStarKey.hasBought()
      ? UpgradeRecord.greaterProximaCentauriStarKey.buffer
      : new Num(1, 0);
    proximaChallenge.maxEffect = ProximaCentauriStarChallenge.BASE_MAX_EFFECT
      .mul(this.proximaMaxBuffEffect)
      .mul(starKeyBuff);

    // Store the challenge buff effect as the primary display effect (most representative of overall power)
    this.effect = this.challengeBuffEffect;
    return this.effect;
  }

  private originalDifficulties: Map<string, Num | Num[]> = new Map();

  applyNerfs(): void {
    // Nerfs applied:
    // 1. Make star challenges way harder without rewards
    // 2. Reduce challenge holding generation by applying ^0.5
    // 3. Sirius star challenge is way more difficult with an extra multiplier
    // Store original difficulties and increase them
    const challenges = [
      ChallengeRecord.proximaCentauriStar,
      ChallengeRecord.lalandeStar,
      ChallengeRecord.sunStar,
      ChallengeRecord.siriusStar
    ];

    challenges.forEach(challenge => {
      // Store original difficulty if not already stored
      if (!this.originalDifficulties.has(challenge.name)) {
        if (challenge.difficultyIncrease instanceof Num) {
          this.originalDifficulties.set(challenge.name, challenge.difficultyIncrease.copy());
        } else if (Array.isArray(challenge.difficultyIncrease)) {
          this.originalDifficulties.set(challenge.name, challenge.difficultyIncrease.map(n => n.copy()));
        } else {
          this.originalDifficulties.set(challenge.name, new Num(1, 0));
        }
      }

      // Get the original difficulty to use as a base
      const originalDifficulty = this.originalDifficulties.get(challenge.name);
      if (!originalDifficulty) return;

      // Increase difficulty by 10x per tier
      // Note: Using 'as any' to bypass TypeScript type narrowing issues with union types
      const baseDifficultyMultiplier = new Num(10, 0).pow(this.tier);

      // Apply extra difficulty multiplier specifically to Sirius star challenge
      const difficultyMultiplier = challenge === ChallengeRecord.siriusStar
        ? baseDifficultyMultiplier.mul(StarChallengeDarkStarCharger.SIRIUS_EXTRA_DIFFICULTY_MULTIPLIER)
        : baseDifficultyMultiplier;

      if (originalDifficulty instanceof Num) {
        (challenge as any).difficultyIncrease = originalDifficulty.mul(difficultyMultiplier);
      } else if (Array.isArray(originalDifficulty)) {
        (challenge as any).difficultyIncrease = originalDifficulty.map(n => n.mul(difficultyMultiplier));
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
        // Remove from map once restored to allow re-storing if nerfs are re-applied later
        this.originalDifficulties.delete(challenge.name);
      }
    });

    // Remove the ^0.5 reduction hook from challenge holding generation speed
    delete MultiplierRecord.starChallengeHoldingSpeed.localHooks[this.name];
  }

  getNerfDescription(): string {
    return 'Star challenges are much harder (difficulty multiplied by 10^tier) with no rewards. Sirius star challenge is way more difficult (extra 100x multiplier). Challenge holding generation is reduced (^0.5).';
  }

  getEffectDescription(): string {
    return `Holding speed: ${this.holdingSpeedEffect.toString(2)}x, Buff boost: ${this.challengeBuffEffect.toString(2)}x, Proxima max: ${this.proximaMaxBuffEffect.toString(2)}x`;
  }

  getChargeDescription(): string {
    return 'Charges from log10(red particles gained) / 100 while you are currently inside a star challenge.';
  }

  getRewardDescription(): string {
    return 'Increases challenge holding generation speed, challenge buff gains, Proxima Centauri max buff, and star challenge red/yellow generator production.';
  }

  override getEffectBreakdown(): { formula: string; effects: string[] } {
    return {
      formula: "log10(red particles while in a star challenge) / 100",
      effects: [
        `Current Charge: ${this.getCharge().toString()} + ${this.getSharedCharge().toString()}`,
        `Tier: ${this.tier.toString()}`,
        `Holding Speed: ${this.holdingSpeedEffect.toString(2)}x`,
        `Challenge Buff Boost: ${this.challengeBuffEffect.toString(2)}x`,
        `Proxima Centauri Max Buff: ${this.proximaMaxBuffEffect.toString(2)}x`,
        `In-Challenge Generator Boost: ${this.starChallengeGeneratorEffect.toString(2)}x`
      ]
    }
  }

  override init() {
    this.requirement = [
      new Requirement(HoldingRecord.redParticles, new Num(1, 50_000_000), this)
    ]
  }
}
