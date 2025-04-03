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

export abstract class NuclearGenerator extends Generator {
  type: string = 'nuclear-decay';
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.GREEN, this);
  override unlocked: boolean = false;
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.greens, new Num(1, 0)),
  ];
  currency: Holding = HoldingRecord.greenSouls;
  override scaling: Num = new Num(1, 1);
  baseMultiplier: Num = new Num(2, 0);
  globalMultiplier: Multiplier = MultiplierRecord.redParticleGenerators;
  nav: string = 'red';
  style: Styles = Styles.RED;
  subNav: string = 'redParticles';
}
