import {Challenge} from "../challenge";
import {Holding} from "../holding";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {ResetKey} from "../../enums/reset-key";
import {Styles} from "../../enums/styles";

export abstract class YellowChallenge extends Challenge {
  currency: Holding = HoldingRecord.redParticles;

  prestige: ResetKey = ResetKey.YELLOW;
  resetId: ResetKey = ResetKey.YELLOW;

  style: Styles = Styles.YELLOW;
  type: string = 'yellow-challenges';
}
