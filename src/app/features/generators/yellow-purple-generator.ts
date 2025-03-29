import {Generator} from "../../classes/features/generator";
import {ResetKey} from "../../classes/enums/reset-key";
import {ResetHelper} from "../../classes/helpers/reset-helper";
import {HoldingRecord} from "../../classes/records/holdings/holding-record";
import {Num} from "../../num";
import {Holding} from "../../classes/features/holding";
import {Multiplier} from "../../classes/features/multiplier";
import {MultiplierRecord} from "../../classes/records/multipliers/multiplier-record";
import {Styles} from "../../classes/enums/styles";

export abstract class YellowPurpleGenerator extends Generator {
  type: string = 'yellow-purple';
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.GREEN, this);
  override unlocked: boolean = false;
  override scaling: Num = new Num(1, 1100000);
  baseMultiplier: Num = new Num(2, 0);
  currency: Holding = HoldingRecord.yellowParticles;
  globalMultiplier: Multiplier = MultiplierRecord.yellowPurpleGenerators;
  nav: string = 'yellow';
  style: Styles = Styles.GENERATOR_YELLOW_PURPLE;
  subNav: string = 'yellowPurple';
  increase: Num = new Num(1, 8000);
  softResetId: ResetKey = ResetHelper.registerReset(ResetKey.YELLOW, this);
}
