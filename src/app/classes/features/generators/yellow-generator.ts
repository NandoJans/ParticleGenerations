import {Generator} from "../generator";
import {ResetKey} from "../../enums/reset-key";
import {Requirement} from "../interfaces/requirement";
import {Holding} from "../holding";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Num} from "../../../num";
import {Multiplier} from "../multiplier";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {Styles} from "../../enums/styles";
import {ResetHelper} from "../../helpers/reset-helper";

export abstract class YellowGenerator extends Generator {
  type: string = 'yellow-particles';
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.GREEN, this);
  softResetId: ResetKey = ResetHelper.registerReset(ResetKey.YELLOW, this);
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.yellowParticles, new Num(1, 2))
  ];
  currency: Holding = HoldingRecord.yellowParticles;
  override scaling: Num = new Num(2, 0);
  override scalingStart: Num = new Num(1, 50000)
  baseMultiplier: Num = new Num(20, 0);
  globalMultiplier: Multiplier = MultiplierRecord.yellowPowerGenerators;
  nav: string = 'yellow';
  style: Styles = Styles.YELLOW;
  subNav: string = 'yellowGenerators';
}
