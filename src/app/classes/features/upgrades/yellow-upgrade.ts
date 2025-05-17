import {Num} from "src/app/num";
import {ResetKey} from "../../enums/reset-key";
import {Styles} from "../../enums/styles";
import {ResetHelper} from "../../helpers/reset-helper";
import {Enhancement} from "../enhancements/enhancement";
import {Holding} from "../holding";
import {Requirement} from "../interfaces/requirement";
import {Upgrade} from "../upgrade";
import {HoldingRecord} from "../../records/holdings/holding-record";

export abstract class YellowUpgrade extends Upgrade {
  type: string = "yellow-upgrade";
  resetId: ResetKey;
  name: string;
  requirement: Requirement[];

  constructor(saveName: string, name: string, isBreak: boolean = false) {
    super(saveName);
    this.name = name;
    if (!isBreak) {
      this.requirement = [
        new Requirement(HoldingRecord.yellowPrestiges, new Num(1, 0), this),
      ]
    } else {
      this.requirement = []
    }
    this.resetId = ResetHelper.registerReset(ResetKey.YELLOW, this);
  }

  style: Styles = Styles.YELLOW;
  nav: string = "yellow";
  subNav: string = "yellowUpgrades";
  allowedEnhancements: Enhancement[] = [];

  enhancementString(enhancement: Enhancement): string {
      return "";
  }
  canEnhance(): boolean {
      return false;
  }
  enhance(): void {}

  override oneTime: boolean = true;
  increase: Num = new Num(0, 0);
  bought: Num = new Num(0, 0);
  currency: Holding = HoldingRecord.yellowParticles;
}
