import {DarkStarCharger} from "./dark-star-charger";
import {Num} from "../../../num";
import {ResetKey} from "../../enums/reset-key";
import {Requirement} from "../interfaces/requirement";
import {ChallengeRecord} from "../../records/challenges/challenge-record";

export class RedGeneratorDarkStarCharger extends DarkStarCharger {
  override displayName: string = "Red Generator Dark Star Charger";
  override name: string = "redGeneratorDarkStarCharger";
  override resetId: ResetKey = ResetKey.NONE;
  override requirement: Requirement[] = [];
  override max: Num = new Num(1, 3); // Default max to 1000

  constructor(saveName: string) {
    super(saveName);
  }

  override init(): void {
    super.init();
    
    // Register the nerf function with the dark galaxy challenge
    const darkGalaxyChallenge = ChallengeRecord.darkGalaxy;
    darkGalaxyChallenge.registerNerfFunction('redGeneratorDarkStarCharger', () => {
      // If charger is enabled (charging), it increases the nerf
      if (this.charging && this.amount.greq(new Num(1, 0))) {
        // The more charged, the stronger the nerf (lower power)
        const chargeRatio = this.amount.div(this.max);
        const nerfIncrease = chargeRatio.mul(new Num(5, -2)); // Max 0.05 additional nerf
        darkGalaxyChallenge.nerfPower = new Num(1, -1).sub(nerfIncrease);
      } else {
        // Reset to base nerf power when not charging
        darkGalaxyChallenge.nerfPower = new Num(1, -1);
      }
    });
  }

  override getChargeAmount(): Num {
    // Charge by 1 per tick (50ms), so it takes 50 seconds to fully charge at 1000 max
    return new Num(1, 0);
  }
}
