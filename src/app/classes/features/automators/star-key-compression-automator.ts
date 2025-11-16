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
    const fastestTime = StatsService.get('compression', 'fastestTime') as Num | null;
    if (!fastestTime || fastestTime.lte(Num.ZERO)) {
      return new Num(0, 0);
    }

    const t = fastestTime.toNumber(); // or whatever converts Num -> number

    if (t <= 0) {
      return new Num(0, 0);
    }

    // For times <= 1s we can keep the simple inverse (and optionally cap it)
    if (t <= 1) {
      // 1 / t, but don’t let it explode too much if someone has 0.001s
      const multiplier = Math.min(5, 1 / t); // max 5× over-completion, tweak as you like
      return this.goal.mul(new Num(multiplier, 0));
    }

    // Logarithmic decay for slower-than-goal times
    const factor = 1 / (1 + Math.log2(t));
    return this.goal.mul(new Num(factor, 0));
  }

  override taskString(): string {
    const fastestTime = StatsService.get('compression', 'fastestTime');
    return TimeHelper.formatDuration(fastestTime, 'dd hh:mm:ss.SSS');
  }

  resetId: ResetKey = ResetHelper.registerReset(ResetKey.YELLOW, this);

  override requirement: Requirement[] = [
    new Requirement(HoldingRecord.yellowParticles, new Num(1, 350), this),
  ];
}
