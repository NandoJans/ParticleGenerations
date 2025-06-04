import {Automator} from "../automator";
import {Styles} from "../../enums/styles";
import {Buyable} from "../buyable";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {GeneratorRecord} from "../../records/generators/generator-record";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {StatsService} from "../../../services/stats.service";

export class FusionBoosterAccelerationAutomator extends Automator {
  name: string = "fusion-booster-acceleration-automator";
  displayName: string = "Fusion Booster Acceleration Automator";
  style: Styles = Styles.YELLOW;
  buyables(): Buyable[] {
    return [
      UpgradeRecord.fusionBoosterAcceleration
    ];
  }
  goal: Num = new Num(5, 2);
  goalString: string = "Buy a total of 500 fusion booster accelerations";
  task(): Num {
    return StatsService.getNum(UpgradeRecord.fusionBoosterAcceleration.name, 'totalBoughtAutomator');
  }
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.YELLOW, this);
  override requirement: Requirement[] = [
    new Requirement(UpgradeRecord.fusionBoosterAcceleration, new Num(1, 0), this),
  ];
}
