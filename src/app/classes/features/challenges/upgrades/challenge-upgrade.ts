import { ResetKey } from "src/app/classes/enums/reset-key";
import { Styles } from "src/app/classes/enums/styles";
import { Num } from "src/app/num";
import { Enhancement } from "../../enhancements/enhancement";
import { Holding } from "../../holding";
import { Requirement } from "../../interfaces/requirement";
import {Upgrade} from "../../upgrade";

export abstract class ChallengeUpgrade extends Upgrade {
  baseCost: Num;
  startIncrease: Num;

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
    public difficultyIncrease: Num | Num[],
    public difficulty: number = 0
  ) {
    super(saveName);
    this.baseCost = cost.copy();
    this.baseBuffer = buffer.copy();
    this.startIncrease = increase.copy();
    this.difficulty = Math.round(difficulty);
    this.applyDifficultyIncrease();
  }

  applyDifficultyIncrease(): void {
    if (this.difficultyIncrease instanceof Num) {
      this.baseCost = this.baseCost.pow(this.difficultyIncrease);
    } else {
      if (this.difficulty >= this.difficultyIncrease.length) {
        this.difficulty = this.difficultyIncrease.length - 1;
      }
      this.baseCost = this.baseCost.pow(this.difficultyIncrease[this.difficulty]);
    }
  }

  override tryLoad() {
    super.tryLoad();
    this.applyDifficultyIncrease();
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
