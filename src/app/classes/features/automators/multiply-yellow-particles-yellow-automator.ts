import {Automator} from "../automator";
import {Styles} from "../../enums/styles";
import {Buyable} from "../buyable";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";

export class MultiplyYellowParticlesYellowAutomator extends Automator {
  name: string = "multiply-yellow-particles-yellow-automator";
  displayName: string = "Multiply Yellow Particles Yellow Automator";
  style: Styles = Styles.YELLOW;
  buyables(): Buyable[] {
    return [
      UpgradeRecord.multiplyYellowParticlesYellow
    ];
  }
  goal: Num = new Num(1, 1500);
  goalString: string = "Have a total of 1e1,500 yellow power";
  task(): Num {
    return HoldingRecord.yellowPower.amount;
  }
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.YELLOW, this);
  override requirement: Requirement[] = [
    new Requirement(HoldingRecord.yellowPrestiges, new Num(1, 0), this),
  ];
}
