import {Generator} from "../generator";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {Num} from "../../../num";
import {Holding} from "../holding";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Multiplier} from "../multiplier";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {Styles} from "../../enums/styles";

export abstract class GreenPurpleGenerator extends Generator {
  type: string = 'green-purple';
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.GREEN, this);
  override unlocked: boolean = false;
  baseMultiplier: Num = new Num(2, 0);
  currency: Holding = HoldingRecord.greenParticles;
  globalMultiplier: Multiplier = MultiplierRecord.greenPurpleGenerators;
  nav: string = 'green';
  style: Styles = Styles.GREEN_PURPLE_GENERATOR;
  subNav: string = 'greenPurple';
  softResetId: ResetKey = ResetHelper.registerReset(ResetKey.YELLOW, this);
}
