import {DarkStarCharger} from "./dark-star-charger";
import {Num} from "../../../num";
import {ResetKey} from "../../enums/reset-key";
import {Requirement} from "../interfaces/requirement";

export class RedGeneratorDarkStarCharger extends DarkStarCharger {
  override displayName: string = "Red Generator Dark Star Charger";
  override name: string = "redGeneratorDarkStarCharger";
  override resetId: ResetKey = ResetKey.NONE;
  override requirement: Requirement[] = [];
  override max: Num = new Num(1, 3); // Default max to 1000

  constructor(saveName: string) {
    super(saveName);
  }

  override getChargeAmount(): Num {
    // Charge by 1 per tick (50ms), so it takes 50 seconds to fully charge at 1000 max
    return new Num(1, 0);
  }
}
