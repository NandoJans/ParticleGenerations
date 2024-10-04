import {Upgrade} from "../upgrade";
import {Num} from "../../../num";
import {Holding} from "../holding";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Requirement} from "../interfaces/requirement";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {Styles} from "../../enums/styles";
import {RespecializableUpgrade} from "./respecializable-upgrade";

export abstract class DarkUpgrade extends RespecializableUpgrade {
  bought: Num = new Num(0, 0);
  cost: Num = new Num(1, 0);
  baseCost: Num = new Num(1, 0);
  increase: Num = new Num(2, 0);
  currency: Holding = HoldingRecord.darkEnergy;
  nav: string = 'green';
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.greens, new Num(1, 1))
  ];
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.GREEN, this);
  style: Styles = Styles.DARK;
  subNav: string = 'darkEnergy';
  type: string = 'dark-energy';
}
