import {RespecializableUpgrade} from "../upgrades/respecializable-upgrade";
import {Num} from "../../../num";
import {Holding} from "../holding";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Requirement} from "../interfaces/requirement";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {Styles} from "../../enums/styles";

export abstract class LimitedUpgrade extends RespecializableUpgrade {
  bought: Num = new Num(0, 0);
  currency: Holding = HoldingRecord.greenSouls;
  increase: Num = new Num(1, 0);
  nav: string = 'green';
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.greens, new Num(1, 0))
  ];
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.GREEN, this);
  style: Styles = Styles.LIMITED;
  subNav: string = 'greenSacrifice';
  type: string = 'green-particles';
  override oneTime: boolean = true;

  static totalBought: Num = new Num(0, 0);

  override action(): Num {
    super.action();
    LimitedUpgrade.totalBought.add(this.bought);
    return new Num(0, 0);
  }
}
