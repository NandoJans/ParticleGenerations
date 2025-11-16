import {Challenge} from "../challenge";
import {ResetKey} from "../../enums/reset-key";
import {Holding} from "../holding";
import {HoldingRecord} from "../../records/holdings/holding-record";

export abstract class YellowStarChallenge extends Challenge {
  type: string = "yellow-star-challenge";
  prestigeLayer: string = "yellow";
  prestige: ResetKey = ResetKey.RED;

  override getCurrency(): Holding {
    return HoldingRecord.redParticles;
  }
}
