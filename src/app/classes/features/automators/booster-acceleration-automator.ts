import {Automator} from "../automator";
import {Requirement} from "../interfaces/requirement";
import {Num} from "../../../num";
import {Buyable} from "../buyable";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Styles} from "../../enums/styles";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {StatsService} from "../../../services/stats.service";

export class BoosterAccelerationAutomator extends Automator {
  displayName: string = 'Booster Acceleration Automator';
  goal: Num = new Num(1, 5);
  goalString: string = 'Have a total of 100.000 red generator booster buys';
  name: string = 'booster-acceleration-automator';
  style: Styles = Styles.RED_AUTOMATOR;
  override unlocked: boolean = false;
  override requirement: Requirement[] = [
    new Requirement(HoldingRecord.redParticles, new Num(1, 75), this)
  ];
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.RED, this);

  buyables(): Buyable[] {
    return [
      UpgradeRecord.boosterAccelerationUpgrade
    ];
  }

  task(): Num {
    return StatsService.getNum(UpgradeRecord.redGeneratorBooster.name, 'totalBoughtAutomator') || new Num(1, 0);
  }

  override reset() {
    StatsService.setNum(UpgradeRecord.redGeneratorBooster.name, 'totalBoughtAutomator', new Num(0, 0));
    super.reset();
  }
}
