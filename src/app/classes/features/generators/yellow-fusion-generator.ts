import {Num} from "src/app/num";
import {ResetKey} from "../../enums/reset-key";
import {Styles} from "../../enums/styles";
import {Generator} from "../generator";
import {Holding} from "../holding";
import {Generatable} from "../interfaces/generatable";
import {Requirement} from "../interfaces/requirement";
import {Multiplier} from "../multiplier";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {ResetHelper} from "../../helpers/reset-helper";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class YellowFusionGenerator extends Generator {
  name: string = "yellow-fusion-generator";
  displayName: string = 'Yellow Fusion Generator';

  baseMultiplier: Num = new Num(1, 0);
  type: string = "yellow-fusion-generator";
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.YELLOW, this);
  softResetId: ResetKey = ResetHelper.registerReset(ResetKey.YELLOW, this);
  style: Styles = Styles.YELLOW;
  nav: string = "yellow";
  subNav: string = "yellowGenerators";
  globalMultiplier: Multiplier = MultiplierRecord.yellowFusionGenerators
  stringRank: string = "1";
  rank: number = 1;
  baseCost: Num = new Num(1, 1);
  cost: Num = new Num(1, 1);
  increase: Num = new Num(1, 1);
  startIncrease: Num = new Num(1, 1);
  currency: Holding = HoldingRecord.yellowFusion;
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.hydrogen, new Num(1, 0), this)
  ];

  override init() {
    this.generates = HoldingRecord.yellowFusion;
  }
}
