import {Styles} from "../../enums/styles";
import {Buyable} from "../buyable";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {GeneratorRecord} from "../../records/generators/generator-record";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Automator} from "../automator";
import {EnhancementRecord} from "../../records/enhancement-record";

export class MultiplyYellowKeysYellowAutomator extends Automator {
  name: string = "multiply-yellow-keys-yellow-automator";
  displayName: string = "Multiply Yellow Keys Yellow Automator";
  style: Styles = Styles.YELLOW;
  buyables(): Buyable[] {
    return [
      UpgradeRecord.multiplyYellowKeyGain
    ];
  }
  goal: Num = new Num(2, 1);
  goalString: string = "Enhance a total of 20 red phase elements";
  task(): Num {
    return new Num(Object.keys(EnhancementRecord.yellow.enhancables).length, 0);
  }
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.YELLOW, this);
  override requirement: Requirement[] = [
    new Requirement(HoldingRecord.yellowPrestiges, new Num(1, 0), this),
  ];
}
