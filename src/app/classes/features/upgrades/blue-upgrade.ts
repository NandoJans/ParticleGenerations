import {Upgrade} from "../upgrade";
import {Holding} from "../holding";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Requirement} from "../interfaces/requirement";
import {Num} from "../../../num";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {Styles} from "../../enums/styles";

export abstract class BlueUpgrade extends Upgrade {
  currency: Holding = HoldingRecord.blueParticles;
  nav: string = 'blue';
  subNav: string = 'blueUpgrades';
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.blues, new Num(3, 0), false)
  ];
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.PURPLE, this);
  style: Styles = Styles.BLUE;
  type: string = 'blue-upgrades';
  bought: Num = new Num(0, 0);
}
