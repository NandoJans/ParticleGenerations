import {Styles} from "../../enums/styles";
import {Buyable} from "../buyable";
import {Num} from "../../../num";
import {StatsService} from "../../../services/stats.service";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Automator} from "../automator";
import {TimeHelper} from "../../helpers/time-helper";

export class StarKeyCompressionAutomator extends Automator {
  name: string = "star-key-compression-automator";
  displayName: string = "Star Key Compression Automator";
  style: Styles = Styles.YELLOW;

  buyables(): Buyable[] {
    return [];
  }

  goal: Num = new Num(1, 3);
  goalString: string = "Compress a star key in less then 1 second";
  task(): Num {
    const fastestTime = StatsService.get('compression', 'fastestTime');
    if (!fastestTime || fastestTime < 0) {
      return new Num(0, 0);
    }

    if (fastestTime <= 0) {
      return new Num(0, 0);
    }

    const t = Math.max(1, fastestTime / 1000);
    const factor = 1 / (1 + Math.log2(t));
    return this.goal.mul(new Num(factor, 0));
  }

  override taskString(): string {
    const fastestTime = StatsService.get('compression', 'fastestTime');
    if (!fastestTime || fastestTime < 0) {
      return 'No time set';
    }
    return TimeHelper.formatDuration(fastestTime, 'yy dd hh:mm:ss.ms');
  }

  resetId: ResetKey = ResetHelper.registerReset(ResetKey.YELLOW, this);

  override requirement: Requirement[] = [
    new Requirement(HoldingRecord.yellowParticles, new Num(1, 350), this),
  ];
}
