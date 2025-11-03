import {Upgrade} from "../upgrade";
import {ResetKey} from "../../enums/reset-key";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Num} from "../../../num";
import {ResetHelper} from "../../helpers/reset-helper";
import {Styles} from "../../enums/styles";
import {Enhancement} from "../enhancements/enhancement";
import {Holding} from "../holding";

export abstract class StarKeyUpgrade extends Upgrade {
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

  style: Styles = Styles.STAR_KEY;
  nav: string = "yellow";
  subNav: string = "yellowStarKeys";
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
  currency: Holding = HoldingRecord.starKeys;

  cost: Num = new Num(1, 0);
  baseCost: Num = new Num(1, 0);

  override oneTime: boolean = true;
  override limit: Num = new Num(1, 0);
}
