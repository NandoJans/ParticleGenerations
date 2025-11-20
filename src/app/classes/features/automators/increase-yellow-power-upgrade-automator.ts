import {Styles} from "../../enums/styles";
import {Buyable} from "../buyable";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Automator} from "../automator";

export class IncreaseYellowPowerUpgradeAutomator extends Automator {
  name: string = "increase-yellow-power-upgrade-automator";
  displayName: string = "Increase Yellow Power Upgrade Automator";
  style: Styles = Styles.YELLOW;
  buyables(): Buyable[] {
    return [
      UpgradeRecord.yellowPower
    ];
  }
  goal: Num = new Num(1, 10_000);
  goalString: string = "Reach 1e10.000 Yellow Power";
  task(): Num {
    return HoldingRecord.yellowPower.amount;
  }
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.GREEN, this);
  override requirement: Requirement[] = [
    new Requirement(HoldingRecord.yellowPrestiges, new Num(1, 0), this),
  ];
}
