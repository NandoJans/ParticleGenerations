import {Charger} from "../charger";

export abstract class DarkStarCharger extends Charger {
  override getNerfDescription(): string {
    return "No nerf currently applied";
  }

  override getChargeDescription(): string {
    return "Charge this to gain rewards";
  }

  override getRewardDescription(): string {
    return "Rewards based on charge amount";
  }

  override getEffectBreakdown(): {formula: string, effects: string[]} {
    return {
      formula: "Base × Multiplier",
      effects: ["Base effect: 1x", "No multipliers active"]
    };
  }
}
