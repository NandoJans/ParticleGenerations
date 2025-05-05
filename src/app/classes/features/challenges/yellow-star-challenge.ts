import {Challenge} from "../challenge";
import {ResetKey} from "../../enums/reset-key";

export abstract class YellowStarChallenge extends Challenge {
  type: string = "yellow-star-challenge";
  prestigeLayer: string = "yellow";
  prestige: ResetKey = ResetKey.RED;
}
