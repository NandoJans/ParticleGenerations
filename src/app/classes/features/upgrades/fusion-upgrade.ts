import {Upgrade} from "../upgrade";
import {ResetKey} from "../../enums/reset-key";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Num} from "../../../num";
import {ResetHelper} from "../../helpers/reset-helper";
import {Styles} from "../../enums/styles";
import {Enhancement} from "../enhancements/enhancement";
import {Holding} from "../holding";

export abstract class FusionUpgrade extends Upgrade {
  type: string = "fusion-upgrade";
  resetId: ResetKey;
  name: string;
  requirement: Requirement[];

  constructor(saveName: string, name: string) {
    super(saveName);
    this.name = name;
    this.requirement = [
      new Requirement(HoldingRecord.yellowParticles, new Num(1, 13), this),
    ]
    this.resetId = ResetHelper.registerReset(ResetKey.YELLOW, this);
  }

  style: Styles = Styles.FUSION;
  nav: string = "yellow";
  subNav: string = "yellowFusion";
  allowedEnhancements: Enhancement[] = [];

  enhancementString(enhancement: Enhancement): string {
    return "";
  }
  canEnhance(): boolean {
    return false;
  }
  enhance(): void {}

  bought: Num = new Num(0, 0);
  currency: Holding = HoldingRecord.yellowParticles;
}
