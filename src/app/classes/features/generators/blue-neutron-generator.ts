import {Generator} from "../generator";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {Requirement} from "../interfaces/requirement";
import {Holding} from "../holding";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Num} from "../../../num";
import {Multiplier} from "../multiplier";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {Styles} from "../../enums/styles";

export abstract class BlueNeutronGenerator extends Generator {
  type: string = 'blue-neutrons';
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.PURPLE, this);
  softResetId: ResetKey = ResetHelper.registerReset(ResetKey.BLUE, this);
  override unlocked: boolean = false;
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.blues, new Num(1, 0))
  ];
  currency: Holding = HoldingRecord.blueParticles;
  override scaling: Num = new Num(1, 1);
  baseMultiplier: Num = new Num(1, 1);
  globalMultiplier: Multiplier = MultiplierRecord.blueNeutronGenerators;
  nav: string = 'blue';
  style: Styles = Styles.BLUE_NEUTRON_GENERATOR;
  subNav: string = 'blueNeutrons';
}
