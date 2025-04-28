import {Upgrade} from "../upgrade";
import {Holding} from "../holding";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";
import {Requirement} from "../interfaces/requirement";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";

export abstract class RedAcceleratorUpgrade extends Upgrade {
  protected constructor(saveName: string, name: string) {
    super(saveName);
    this.name = name;
    this.requirement = [
      new Requirement(HoldingRecord.redParticles, new Num(1, 75), this, false)
    ];
    this.resetId = ResetHelper.registerReset(ResetKey.RED_BOOSTER_ACCELERATION, this);
  }
  name: string;
  requirement: Requirement[];
  resetId: ResetKey;
  bought: Num = new Num(0, 0);
  currency: Holding = HoldingRecord.redParticles;
  nav: string = 'red';
  subNav: string = 'redAccelerators';
  style: Styles = Styles.RED_ACCELERATOR;
  type: string = 'red-accelerators';
  override scalingStart: Num = new Num(1, 1000);
  override scaling: Num = new Num(1, 2);
}
