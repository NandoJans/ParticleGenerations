import {Charger} from "../charger";
import {ChallengeService} from "../../../services/interactables/challenge.service";
import {Num} from "../../../num";

export abstract class DarkStarCharger extends Charger {
  override getNerfDescription(): string {
    if (!this.charging || this.amount.lte(new Num(0, 0))) {
      return "No nerf currently applied";
    }
    
    const chargeRatio = this.amount.div(this.max).mul(new Num(1, 2));
    return `Nerfs dark galaxy challenge by ${chargeRatio.toString(2)} (multipliers raised to lower power)`;
  }

  override getChargeDescription(): string {
    return "Charges while inside the dark galaxy challenge";
  }

  override getRewardDescription(): string {
    return "Increases nerf on dark galaxy challenge as it charges";
  }

  override getEffectBreakdown(): {formula: string, effects: string[]} {
    const effects: string[] = [];
    
    if (this.amount.greq(new Num(1, 0))) {
      const chargeRatio = this.amount.div(this.max);
      const nerfIncrease = chargeRatio.mul(new Num(5, -2));
      effects.push(`Charge level: ${chargeRatio.mul(new Num(1, 2)).toString(1)}%`);
      effects.push(`Nerf increase: ${nerfIncrease.toString(3)}`);
    } else {
      effects.push("No charge accumulated yet");
    }
    
    return {
      formula: "0.1 - (charge% × 0.05)",
      effects: effects
    };
  }

  /**
   * Only charge when inside the dark galaxy challenge
   */
  protected override shouldCharge(): boolean {
    return ChallengeService.inChallenge('green');
  }
}
