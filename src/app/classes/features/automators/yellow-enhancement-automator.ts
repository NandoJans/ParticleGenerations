import { Num } from "src/app/num";
import { ResetKey } from "../../enums/reset-key";
import { Styles } from "../../enums/styles";
import {Buyable} from "../buyable";
import {ResetHelper} from "../../helpers/reset-helper";
import {StatsService} from "../../../services/stats.service";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Requirement} from "../interfaces/requirement";
import {Enhancement} from "../enhancements/enhancement";
import {EnhancementRecord} from "../../records/enhancement-record";
import {Enhancable} from "../interfaces/enhancable";
import {EnhancementService} from "../../../services/enhancement.service";
import {OrderedExecutionAutomator} from "./ordered-execution-automator";

export class YellowEnhancementAutomator extends OrderedExecutionAutomator {
  override name: string = "yellow-enhancement-automator";
  override displayName: string = "Yellow Enhancement Automator";
  override style: Styles = Styles.YELLOW;
  override goal: Num = new Num(1, 2);
  override goalString: string = "Enhance a total of 100 times";
  override resetId: ResetKey = ResetHelper.registerReset(ResetKey.GREEN, this);
  enhancing: Enhancement = EnhancementRecord.yellow;

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

    const enhancableNames = this.getEnhancables().map(enhancable => enhancable.name);
    this.setInitialExecutionOrder(enhancableNames);
    this.syncExecutionOrder(enhancableNames);
  }


  override getAvailableExecutionItems(): string[] {
    return this.getEnhancables().map(enhancable => enhancable.name);
  }

  override action() {
    const enhancablesByName: {[key: string]: Enhancable} = {};
    this.getEnhancables().forEach(enhancable => {
      enhancablesByName[enhancable.name] = enhancable;
    });

    const orderedNames = this.getExecutionOrder();

    for (const enhancableName of orderedNames) {
      const enhancable = enhancablesByName[enhancableName];
      if (!enhancable || enhancable.enhancement) {
        continue;
      }

      if (!this.enhancing.canEnhance()) {
        break;
      }

      EnhancementService.enhance(enhancable, this.enhancing);
    }
  }

  private getEnhancables(): Enhancable[] {
    return EnhancementService.enhancementToEnhancables[this.enhancing.name] ?? [];
  }
}
