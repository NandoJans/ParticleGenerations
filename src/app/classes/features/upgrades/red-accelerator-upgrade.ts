import {Upgrade} from "../upgrade";
import {Holding} from "../holding";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Requirement} from "../interfaces/requirement";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";

export abstract class RedAcceleratorUpgrade extends Upgrade {
  bought: Num = new Num(0, 0);
  currency: Holding = HoldingRecord.redParticles;
  nav: string = 'red';
  subNav: string = 'redAccelerators';
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.redParticles, new Num(1, 75), this, false)
  ];
  style: Styles = Styles.RED_ACCELERATOR;
  type: string = 'red-accelerators';
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.RED, this);
  override scaling: Num = new Num(1, 5);
}
