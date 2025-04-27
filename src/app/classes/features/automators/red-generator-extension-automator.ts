import {Automator} from "../automator";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {Buyable} from "../buyable";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {StatsService} from "../../../services/stats.service";

export class RedGeneratorExtensionAutomator extends Automator {
  displayName: string = 'Extension Automator';
  goal: Num = new Num(1, 3);
  goalString: string = 'Reset red generators a total of 1.000 times';
  name: string = 'red-generator-extension-automator';
  style: Styles = Styles.RED_AUTOMATOR;
  override unlocked: boolean = true;
  override startUnlocked: boolean = true;
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.RED, this);

  buyables(): Buyable[] {
    return [
      UpgradeRecord.redGeneratorExtension,
    ];
  }

  task(): Num {
    return StatsService.getNum('red-particle-generator', 'totalReset') || new Num(1, 0);
  }
}
