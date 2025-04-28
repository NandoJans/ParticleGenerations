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
  goal: Num = new Num(1, 2);
  goalString: string = 'Reset red generators a total of 100 times';
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
    return StatsService.getNum('red-particle-generator', 'totalResetAutomator') || new Num(1, 0);
  }

  override reset() {
    StatsService.setNum('red-particle-generator', 'totalResetAutomator', new Num(0, 0));
    super.reset();
  }
}
