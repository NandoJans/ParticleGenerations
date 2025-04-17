import {Generator} from "../generator";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {Num} from "../../../num";
import {Holding} from "../holding";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Multiplier} from "../multiplier";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {Styles} from "../../enums/styles";

export abstract class BluePurpleGenerator extends Generator {
  type: string = 'blue-purple';
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.BLUE, this);
  override unlocked: boolean = false;
  baseMultiplier: Num = new Num(2, 0);
  currency: Holding = HoldingRecord.blueParticles;
  globalMultiplier: Multiplier = MultiplierRecord.bluePurpleGenerators;
  nav: string = 'blue';
  style: Styles = Styles.BLUE_PURPLE_GENERATOR;
  subNav: string = 'bluePurple';
  softResetId: ResetKey = ResetHelper.registerReset(ResetKey.GREEN, this);
}
