import {Generator} from "../generator";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {Num} from "../../../num";
import {Holding} from "../holding";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Multiplier} from "../multiplier";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {Styles} from "../../enums/styles";

export abstract class RedPurpleGenerator extends Generator {
  type: string = 'red-purple';
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.RED, this);
  override unlocked: boolean = false;
  override scaling: Num = new Num(1, 110000000);
  baseMultiplier: Num = new Num(2, 0);
  currency: Holding = HoldingRecord.yellowParticles;
  globalMultiplier: Multiplier = MultiplierRecord.redPurpleGenerators;
  nav: string = 'red';
  style: Styles = Styles.RED_PURPLE_GENERATOR;
  subNav: string = 'redPurple';
  increase: Num = new Num(1, 110000000);
  softResetId: ResetKey = ResetHelper.registerReset(ResetKey.RED_EXTENSION, this);
}
