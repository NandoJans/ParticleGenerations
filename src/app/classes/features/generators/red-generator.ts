import {Generator} from "../generator";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Num} from "../../../num";
import {ResetKey} from "../../enums/reset-key";
import {Requirement} from "../interfaces/requirement";
import {Holding} from "../holding";
import {Styles} from "../../enums/styles";
import {Multiplier} from "../multiplier";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export abstract class RedGenerator extends Generator {
  type: string = 'red-particles';
  resetId: ResetKey = ResetKey.RED_EXTENSION;
  unlocked: boolean = false;
  requirement: Requirement[] = [];
  currency: Holding = HoldingRecord.redParticles;
  override scaling: Num = new Num(1, 1);
  baseMultiplier: Num = new Num(2, 0);
  globalMultiplier: Multiplier = MultiplierRecord.redParticleGenerators;
  nav: string = 'red';
  style: Styles = Styles.RED;
  subNav: string = 'redParticles';
}
