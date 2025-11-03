import {Automator} from "../automator";
import {Styles} from "../../enums/styles";
import {Buyable} from "../buyable";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {Requirement} from "../interfaces/requirement";
import {StatsService} from "../../../services/stats.service";
import {HoldingRecord} from "../../records/holdings/holding-record";

export class FusionBoosterAccelerationAutomator extends Automator {
  name: string = "fusion-booster-acceleration-automator";
  displayName: string = "Fusion Booster Acceleration Automator";
  style: Styles = Styles.YELLOW;
  buyables(): Buyable[] {
    return [
      UpgradeRecord.fusionBoosterAcceleration
    ];
  }
  goal: Num = new Num(1, 2);
  goalString: string = "Buy a total of 100 fusion booster accelerations";
  task(): Num {
    return StatsService.getNum(UpgradeRecord.fusionBoosterAcceleration.name, 'totalBoughtAutomator');
  }
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.YELLOW, this);
  override requirement: Requirement[] = [
    new Requirement(HoldingRecord.yellowParticles, new Num(1, 10), this),
  ];
}
