import {Num} from "src/app/num";
import {ResetKey} from "../../enums/reset-key";
import {Styles} from "../../enums/styles";
import {ResetHelper} from "../../helpers/reset-helper";
import {Enhancement} from "../enhancements/enhancement";
import {Holding} from "../holding";
import {Requirement} from "../interfaces/requirement";
import {Upgrade} from "../upgrade";
import {HoldingRecord} from "../../records/holdings/holding-record";

export abstract class GreenUpgrade extends Upgrade {
  type: string = "green-upgrade";
  resetId: ResetKey;
  name: string;
  requirement: Requirement[];

  protected constructor(saveName: string, name: string, customRequirement: boolean = false) {
    super(saveName);
    this.name = name;
    if (!customRequirement) {
      this.requirement = [
        new Requirement(HoldingRecord.greenPrestiges, new Num(1, 0), this),
      ]
    } else {
      this.requirement = []
    }
    this.resetId = ResetHelper.registerReset(ResetKey.GREEN, this);
  }

  style: Styles = Styles.GREEN;
  nav: string = "green";
  subNav: string = "greenGenerators";
  allowedEnhancements: Enhancement[] = [];

  enhancementString(enhancement: Enhancement): string {
      return "";
  }
  canEnhance(): boolean {
      return false;
  }
  enhance(): void {}

  increase: Num = new Num(1, 0);
  startIncrease: Num = new Num(1, 0);
  bought: Num = new Num(0, 0);
  currency: Holding = HoldingRecord.greenParticles;
}
