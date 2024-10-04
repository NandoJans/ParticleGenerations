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

export abstract class GreenGenerator extends Generator {
  type: string = 'green-particles';
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.GREEN, this);
  softResetId: ResetKey = ResetHelper.registerSoftReset(ResetKey.YELLOW, this);
  override unlocked: boolean = false;
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.greens, new Num(1, 0))
  ];
  currency: Holding = HoldingRecord.greenParticles;
  override scaling: Num = new Num(2, 0);
  override scalingStart: Num = new Num(1, 150);
  baseMultiplier: Num = new Num(5, 0);
  globalMultiplier: Multiplier = MultiplierRecord.greenParticleGenerators;
  nav: string = 'green';
  style: Styles = Styles.GREEN;
  subNav: string = 'greenParticles';
}
