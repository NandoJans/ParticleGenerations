import { Upgrade } from "../upgrade";
import {Holding} from "../holding";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Requirement} from "../interfaces/requirement";
import {Num} from "../../../num";
import {ResetKey} from "../../enums/reset-key";
import {Styles} from "../../enums/styles";

export abstract class YellowUpgrade extends Upgrade {
  currency: Holding = HoldingRecord.yellowParticles;
  nav: string = 'yellow';
  subNav: string = 'yellowUpgrades';
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.yellows, new Num(1, 0), false)
  ];
  resetId: ResetKey = ResetKey.YELLOW;
  style: Styles = Styles.YELLOW;
  type: string = 'yellow-upgrades';
  bought: Num = new Num(0, 0);
  increase: Num = new Num(1, 1);
}
