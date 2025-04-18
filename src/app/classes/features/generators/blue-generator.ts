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

export abstract class BlueGenerator extends Generator {
  type: string = 'blue-particles';
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.PURPLE, this);
  softResetId: ResetKey = ResetHelper.registerSoftReset(ResetKey.BLUE, this);
  override unlocked: boolean = false;
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.blueParticles, new Num(1, 30))
  ];
  currency: Holding = HoldingRecord.blueParticles;
  baseMultiplier: Num = new Num(5, 0);
  globalMultiplier: Multiplier = MultiplierRecord.blueParticleGenerators;
  nav: string = 'blue';
  style: Styles = Styles.BLUE_GENERATOR;
  subNav: string = 'blueGenerators';
}
