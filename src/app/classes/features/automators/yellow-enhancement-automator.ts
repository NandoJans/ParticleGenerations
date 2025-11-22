import { Num } from "src/app/num";
import { ResetKey } from "../../enums/reset-key";
import { Styles } from "../../enums/styles";
import {Automator} from "../automator";
import {Buyable} from "../buyable";
import {ResetHelper} from "../../helpers/reset-helper";
import {StatsService} from "../../../services/stats.service";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Requirement} from "../interfaces/requirement";
import {Enhancement} from "../enhancements/enhancement";
import {EnhancementRecord} from "../../records/enhancement-record";
import {Enhancable} from "../interfaces/enhancable";
import {EnhancementService} from "../../../services/enhancement.service";

export class YellowEnhancementAutomator extends Automator {
  override name: string = "yellow-enhancement-automator";
  override displayName: string = "Yellow Enhancement Automator";
  override style: Styles = Styles.YELLOW;
  override goal: Num = new Num(1, 2);
  override goalString: string = "Enhance a total of 100 times";
  override resetId: ResetKey = ResetHelper.registerReset(ResetKey.GREEN, this);
  enhancing: Enhancement = EnhancementRecord.yellow;
  toEnhance: Enhancable[] = []

  override buyables(): Buyable[] {
    return []
  }
  override task(): Num {
    return StatsService.getNum('yellow-enhancement', 'totalEnhancements');
  }

  override init() {
    this.requirement = [
      new Requirement(HoldingRecord.yellowPrestiges, new Num(1, 0), this)
    ];
    EnhancementService.enhancementToEnhancables[this.enhancing.name].forEach(enhancable => {
      this.toEnhance.push(enhancable);
    });
  }

  override reset() {
    super.reset();
    EnhancementService.enhancementToEnhancables[this.enhancing.name].forEach(enhancable => {
      this.toEnhance.push(enhancable);
    });
  }

  override action() {
    if (this.toEnhance.length < 1) return;

    for (let enhancable of this.toEnhance) {
      if (enhancable.enhancement) {
        // Remove the enhancable
        this.toEnhance = this.toEnhance.filter(e => e !== enhancable);
        continue;
      }
      if (!this.enhancing.canEnhance()) break;

      EnhancementService.enhance(enhancable, this.enhancing);
      // Remove the enhancable
      this.toEnhance = this.toEnhance.filter(e => e !== enhancable);
    }
  }
}
