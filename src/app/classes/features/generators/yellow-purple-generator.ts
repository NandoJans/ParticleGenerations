import {Generator} from "../generator";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Num} from "../../../num";
import {Holding} from "../holding";
import {Multiplier} from "../multiplier";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {Styles} from "../../enums/styles";

export abstract class YellowPurpleGenerator extends Generator {
  type: string = 'yellow-purple';
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.YELLOW, this);
  override unlocked: boolean = false;
  override scaling: Num = new Num(1, 1100000);
  baseMultiplier: Num = new Num(2, 0);
  currency: Holding = HoldingRecord.yellowParticles;
  globalMultiplier: Multiplier = MultiplierRecord.yellowPurpleGenerators;
  nav: string = 'yellow';
  style: Styles = Styles.GENERATOR_YELLOW_PURPLE;
  subNav: string = 'yellowPurple';
  increase: Num = new Num(1, 8000);
  softResetId: ResetKey = ResetHelper.registerReset(ResetKey.RED, this);
}
