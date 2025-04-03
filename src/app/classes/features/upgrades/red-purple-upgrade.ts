import {Upgrade} from "../upgrade";
import {Holding} from "../holding";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {Styles} from "../../enums/styles";
import {Num} from "../../../num";

export abstract class RedPurpleUpgrade extends Upgrade {
  currency: Holding = HoldingRecord.redParticles;
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.RED, this);
  style: Styles = Styles.RED_PURPLE;
  bought: Num = new Num(0, 0);
  nav: string = 'red';
  subNav: string = 'redPurple';
}
