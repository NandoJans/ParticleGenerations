import {Upgrade} from "../upgrade";
import {Holding} from "../holding";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {Styles} from "../../enums/styles";
import {Num} from "../../../num";

export abstract class BluePurpleUpgrade extends Upgrade {
  currency: Holding = HoldingRecord.blueParticles;
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.BLUE, this);
  style: Styles = Styles.BLUE_PURPLE;
  bought: Num = new Num(0, 0);
  nav: string = 'blue';
  subNav: string = 'bluePurple';
}
