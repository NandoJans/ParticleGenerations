import {Upgrade} from "../upgrade";
import {Holding} from "../holding";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";

export abstract class RedAcceleratorUpgrade extends Upgrade {
  bought: Num = new Num(0, 0);
  currency: Holding = HoldingRecord.redParticles;
  nav: string = 'red';
  subNav: string = 'redAccelerators';
  style: Styles = Styles.RED_ACCELERATOR;
  type: string = 'red-accelerators';
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.RED_BOOSTER_ACCELERATION, this);
  override scalingStart: Num = new Num(1, 1000);
  override scaling: Num = new Num(1, 2);
}
