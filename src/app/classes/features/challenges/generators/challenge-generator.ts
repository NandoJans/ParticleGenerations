import { ResetKey } from "src/app/classes/enums/reset-key";
import { Styles } from "src/app/classes/enums/styles";
import { Num } from "src/app/num";
import {Holding} from "../../holding";
import {Generatable} from "../../interfaces/generatable";
import {Requirement} from "../../interfaces/requirement";
import {Multiplier} from "../../multiplier";
import {Generator} from "../../generator";
import {MultiplierRecord} from "../../../records/multipliers/multiplier-record";

export class ChallengeGenerator extends Generator {
  globalMultiplier: Multiplier;
  resetId: ResetKey = ResetKey.NONE;
  softResetId: ResetKey = ResetKey.NONE;
  stringRank: string = '1';
  rank: number = 1;
  baseCost: Num;
  requirement: Requirement[] = [];
  startIncrease: Num;

  constructor(
    saveName: string,
    public name: string,
    public displayName: string,
    public override generates: Generatable,
    public baseMultiplier: Num,
    public type: string,
    public style: Styles,
    public nav: string,
    public subNav: string,
    public cost: Num,
    public increase: Num,
    public currency: Holding
  ) {
    super(saveName);
    this.baseCost = cost.copy();
    this.startIncrease = increase.copy();
    this.globalMultiplier = new Multiplier(this.name, new Num(1, 0));
  }

  /**
   * Override run to apply star challenge holding speed multiplier
   */
  override run(speed: Num): any {
    // Apply star challenge holding speed multiplier to speed
    const boostedSpeed = speed.mul(MultiplierRecord.starChallengeHoldingSpeed.getNum());
    return super.run(boostedSpeed);
  }
}
