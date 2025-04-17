import {Generator} from "../generator";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Num} from "../../../num";
import {Holding} from "../holding";
import {Multiplier} from "../multiplier";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {Styles} from "../../enums/styles";

export abstract class PurpleGenerator extends Generator {
  type: string = 'purple-particles';
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.PURPLE, this);
  softResetId: ResetKey = ResetHelper.registerSoftReset(ResetKey.BLUE, this);
  override unlocked: boolean = false;
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.purples, new Num(1, 0))
  ];
  currency: Holding = HoldingRecord.purpleParticles;
  baseMultiplier: Num = new Num(1.1, 2);
  globalMultiplier: Multiplier = MultiplierRecord.purpleParticleGenerators;
  nav: string = 'purple';
  style: Styles = Styles.PURPLE;
  subNav: string = 'purpleParticles';
}
