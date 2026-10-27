import {Num} from '../../../num';
import {StatsService} from '../../../services/stats.service';
import {Automator} from '../automator';
import {Buyable} from '../buyable';
import {ResetKey} from '../../enums/reset-key';
import {Styles} from '../../enums/styles';
import {Requirement} from '../interfaces/requirement';
import {UpgradeRecord} from '../../records/upgrades/upgrade-record';
import {YellowUpgrade} from '../upgrades/yellow-upgrade';

export class YellowOneTimeUpgradesAutomator extends Automator {
  name = 'yellow-one-time-upgrades-automator';
  displayName = 'Yellow One-time Upgrades Automator';
  style = Styles.BLUE;
  goal = new Num(5, 2);
  goalString = 'Buy yellow one-time upgrades 500 times';
  resetId = ResetKey.NONE;
  override requirement: Requirement[] = [];

  buyables(): Buyable[] {
    return [
      ...UpgradeRecord.yellowUpgradeList,
      ...UpgradeRecord.postBreakYellowUpgradeList,
    ].filter(upgrade => upgrade.limit?.equals(Num.ONE));
  }

  task(): Num {
    return StatsService.getNum(YellowUpgrade.purchaseStat, 'totalBought');
  }

  override isUnlocked(): boolean {
    return this.task().greq(this.goal);
  }
}
