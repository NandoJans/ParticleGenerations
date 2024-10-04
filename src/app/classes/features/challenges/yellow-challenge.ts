import {Challenge} from "../challenge";
import {Holding} from "../holding";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {ResetKey} from "../../enums/reset-key";
import {Styles} from "../../enums/styles";
import {ResetHelper} from "../../helpers/reset-helper";

export abstract class YellowChallenge extends Challenge {
  currency: Holding = HoldingRecord.redParticles;

  prestige: ResetKey = ResetKey.YELLOW;
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.YELLOW, this);

  style: Styles = Styles.YELLOW;
  type: string = 'yellow-challenges';
}
