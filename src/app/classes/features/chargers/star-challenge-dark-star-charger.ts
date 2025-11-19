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
    // Charge based on total completions and red particles from sirius
    const siriusStar = ChallengeRecord.siriusStar;
    const totalCompletions = siriusStar.completed instanceof Num ? siriusStar.completed : new Num(0, 0);
    const redParticles = HoldingRecord.redParticles;
    
    const chargeAmount = totalCompletions.mul(redParticles.amount.log10());
    return chargeAmount.gt(new Num(0, 0)) ? chargeAmount : new Num(0, 0);
  }

  action(): void {
    // Calculate unlock/increase of Rigel challenge max completions
    const effectiveCharge = this.getEffectiveCharge();
    this.effect = effectiveCharge.floor();
  }

  applyTierDrawback(chargeValue: Num): Num {
    // Reduce effectiveness with higher tiers
    if (this.tier.equals(new Num(0, 0))) {
      return chargeValue;
    }
    return chargeValue.div(this.tier.add(new Num(1, 0)));
  }

  applyNerfs(): void {
    // Nerfs applied:
    // 1. Make star challenges way harder without rewards
    // 2. Prevent sun and sirius particles from being generated
    // These nerfs are applied in the star challenge and particle generation logic
    // The nerf state is tracked by isNerfActive flag
  }

  revertNerfs(): void {
    // Restore star challenge difficulty and rewards
    // Re-enable sun and sirius particle generation
    // Challenges return to normal operation
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
