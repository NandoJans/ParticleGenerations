import {Generatable} from "../interfaces/generatable";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Num} from "../../../num";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {Styles} from "../../enums/styles";
import {Multiplier} from "../multiplier";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {Holding} from "../holding";
import {Requirement} from "../interfaces/requirement";
import {Generator} from "../generator";

export class HydrogenGenerator extends Generator {
  name: string = "hydrogen-generator";
  displayName: string = 'Hydrogen Generator';
  generates: Generatable = HoldingRecord.hydrogen;
  baseMultiplier: Num = new Num(1, 0);
  type: string = "hydrogen-generator";
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.YELLOW, this);
  softResetId: ResetKey = ResetHelper.registerReset(ResetKey.YELLOW, this);
  style: Styles = Styles.YELLOW;
  nav: string = "yellow";
  subNav: string = "yellowFusion";
  globalMultiplier: Multiplier = MultiplierRecord.hydrogenGenerators
  stringRank: string = "1";
  rank: number = 1;
  baseCost: Num = new Num(1, 0);
  cost: Num = new Num(1, 0);
  increase: Num = new Num(1, 0);
  override amount: Num = new Num(1, 0);
  override bought: Num = new Num(1, 0);
  currency: Holding = HoldingRecord.yellowFusion;
  requirement: Requirement[] = [];

  barrier: Num = new Num(3, 3);
}
