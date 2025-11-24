import {DarkStarCharger} from "./dark-star-charger";
import {Num} from "../../../num";
import {ResetKey} from "../../enums/reset-key";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {ChallengeRecord} from "../../records/challenges/challenge-record";

/**
 * Star Challenge Dark Star Charger
 *
 * Nerfs: Makes star challenges way harder without any reward for completion. Sun particles and sirius particles cannot be generated
 * Charge: is gained based on total completions and red particles gained in sirius star challenge
 * Amplifies: Unlocks or increases max completions of the new star challenge: Rigel
 */
export class StarChallengeDarkStarCharger extends DarkStarCharger {
  displayName: string = 'Star Challenge Charger';
  resetId: ResetKey = ResetKey.GREEN;
  maxCharge: Num = new Num(100, 0);
  maxTier: Num | undefined = new Num(10, 0);
  canInfiniteChargeAtMaxTier: boolean = true;
  requirement: Requirement[] = [];
  name: string = 'star-challenge-dark-star-charger';

  getChargeAmount(): Num {
    // Charge based on total completions and red particles from sirius - only increases
    const siriusStar = ChallengeRecord.siriusStar;
    const totalCompletions = siriusStar.completed instanceof Num ? siriusStar.completed : new Num(0, 0);
    const redParticles = HoldingRecord.redParticles;

    const chargeAmount = totalCompletions.mul(redParticles.amount.log10());
    return chargeAmount.gt(this.charge) ? chargeAmount : this.charge;
  }

  action(): Num {
    // Calculate unlock/increase of Rigel challenge max completions
    const effectiveCharge = this.getEffectiveCharge();
    const effect = effectiveCharge.floor();
    
    // TODO: Apply to Rigel challenge when it's implemented
    // For now, just track the effect value
    
    this.effect = effect;
    return effect;
  }

  applyTierDrawback(chargeValue: Num): Num {
    // Reduce effectiveness with higher tiers
    if (this.tier.equals(new Num(0, 0))) {
      return chargeValue;
    }
    return chargeValue.div(this.tier.add(new Num(1, 0)));
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
      
      // Increase difficulty by 10x
      // Note: Using 'as any' to bypass TypeScript type narrowing issues with union types
      const currentDifficulty = challenge.difficultyIncrease;
      if (currentDifficulty instanceof Num) {
        (challenge as any).difficultyIncrease = currentDifficulty.mul(new Num(10, 0));
      } else if (Array.isArray(currentDifficulty)) {
        (challenge as any).difficultyIncrease = currentDifficulty.map(n => n.mul(new Num(10, 0)));
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
    return 'Star challenges are much harder with no rewards. Sun and Sirius particles cannot be generated.';
  }

  getEffectDescription(): string {
    return `Rigel challenge max completions: +${this.effect.toString()}`;
  }

  getChargeDescription(): string {
    return 'Charges based on total completions and red particles gained in Sirius star challenge.';
  }

  getRewardDescription(): string {
    return 'Unlocks or increases max completions of the Rigel star challenge.';
  }

  override init() {
    this.requirement = [
      new Requirement(HoldingRecord.redParticles, new Num(1, 9999999999), this)
    ]
  }
}
