import {Upgrade} from "../upgrade";
import {Num} from "../../../num";
import {Holding} from "../holding";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {Styles} from "../../enums/styles";

export abstract class YellowPurpleUpgrade extends Upgrade {
  currency: Holding = HoldingRecord.yellowParticles;
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.YELLOW, this);
  style: Styles = Styles.YELLOW_PURPLE;
  bought: Num = new Num(0, 0);
  nav: string = 'yellow';
  subNav: string = 'yellowPurple';
}
