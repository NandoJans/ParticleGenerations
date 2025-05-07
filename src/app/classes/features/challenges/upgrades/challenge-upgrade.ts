import { ResetKey } from "src/app/classes/enums/reset-key";
import { Styles } from "src/app/classes/enums/styles";
import { Num } from "src/app/num";
import { Enhancement } from "../../enhancements/enhancement";
import { Holding } from "../../holding";
import { Requirement } from "../../interfaces/requirement";
import {Upgrade} from "../../upgrade";

export abstract class ChallengeUpgrade extends Upgrade {
  baseCost: Num;

  protected constructor(
    saveName: string,
    public name: string,
    public displayName: string,
    public cost: Num,
    public increase: Num,
    public override scaling: Num,
    public override buffer: Num,
    public currency: Holding,
    public style: Styles,
    public nav: string,
    public subNav: string,
    public type: string,
  ) {
    super(saveName);
    this.baseCost = cost.copy();
    this.baseBuffer = buffer.copy();
  }
  getDescription(): string {
      return "";
  }

  resetId: ResetKey = ResetKey.NONE;
  allowedEnhancements: Enhancement[] = [];
  enhancementString(enhancement: Enhancement): string {
      return "";
  }
  canEnhance(): boolean {
      return false;
  }
  enhance(): void {}

  bought: Num = new Num(0, 0);
  requirement: Requirement[] = [];
}
