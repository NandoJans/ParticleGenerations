import {Upgrade} from "../upgrade";
import {Holding} from "../holding";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {Styles} from "../../enums/styles";
import {Num} from "../../../num";

export abstract class GreenPurpleUpgrade extends Upgrade {
  currency: Holding = HoldingRecord.greenParticles;
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.GREEN, this);
  style: Styles = Styles.GREEN_PURPLE;
  bought: Num = new Num(0, 0);
  nav: string = 'green';
  subNav: string = 'greenPurple';
}
