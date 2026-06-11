import {Upgrade} from "../upgrade";
import {ResetKey} from "../../enums/reset-key";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Num} from "../../../num";
import {ResetHelper} from "../../helpers/reset-helper";
import {Styles} from "../../enums/styles";
import {Enhancement} from "../enhancements/enhancement";
import {Holding} from "../holding";

export abstract class StarKeySubUpgrade extends Upgrade {
  type: string = "star-key-upgrade";
  resetId: ResetKey;
  name: string;
  requirement: Requirement[];

  protected constructor(saveName: string, name: string) {
    super(saveName);
    this.name = name;
    this.requirement = [
      new Requirement(HoldingRecord.yellowParticles, new Num(1, 350), this),
    ]
    this.resetId = ResetHelper.registerReset(ResetKey.YELLOW, this);
  }

  style: Styles = Styles.SUB_STAR_KEY;
  nav: string = "yellow";
  subNav: string = "yellowStarKeys";
  allowedEnhancements: Enhancement[] = [];

  enhancementString(enhancement: Enhancement): string {
    return `Increase this Star Key upgrade's multiplier to ${this.buffer.mul(enhancement.getMultiplier()).toString(2)}x.`;
  }
  canEnhance(): boolean {
    return true;
  }
  enhance(): void {
    if (this.enhancement) {
      this.buffer = this.buffer.mul(this.enhancement.getMultiplier());
    }
  }

  override getDisplayName(): string {
    return "";
  }

  bought: Num = new Num(0, 0);
  currency: Holding = HoldingRecord.yellowKeys;
}
