import {Upgrade} from "../../classes/features/upgrade";
import {Num} from "../../num";
import {Holding} from "../../classes/features/holding";
import {HoldingRecord} from "../../classes/records/holdings/holding-record";
import {ResetKey} from "../../classes/enums/reset-key";
import {ResetHelper} from "../../classes/helpers/reset-helper";
import {Styles} from "../../classes/enums/styles";

export abstract class YellowPurpleUpgrade extends Upgrade {
  currency: Holding = HoldingRecord.yellowParticles;
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.YELLOW, this);
  style: Styles = Styles.YELLOW_PURPLE;
  bought: Num = new Num(0, 0);
  nav: string = 'yellow';
  subNav: string = 'yellowPurple';
}
