import {Num} from "src/app/num";
import {Styles} from "../../enums/styles";
import {Automator} from "../automator";
import {Buyable} from "../buyable";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Requirement} from "../interfaces/requirement";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {GeneratorRecord} from "../../records/generators/generator-record";

export class MultiplyRedGeneratorsYellowAutomator extends Automator {
  name: string = "multiply-red-generators-yellow-automator";
  displayName: string = "Multiply Red Generators Yellow Automator";
  style: Styles = Styles.YELLOW;
  buyables(): Buyable[] {
    return [
      UpgradeRecord.multiplyRedGeneratorsYellow
    ];
  }
  goal: Num = new Num(1, 200000);
  goalString: string = "Have a total red generator multiplier of 1e200,000x";
  task(): Num {
    let total = new Num(1, 0);
    for (const generator of GeneratorRecord.redGenerators) {
      if (generator.hasBought()) {
        total = total.mul(generator.multiplier);
      }
    }
    return total;
  }
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.YELLOW, this);
  override requirement: Requirement[] = [
    new Requirement(HoldingRecord.yellowPrestiges, new Num(1, 0), this),
  ];
}
