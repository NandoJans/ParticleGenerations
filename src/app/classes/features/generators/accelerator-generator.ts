import {Generator} from "../generator";
import {ResetKey} from "../../enums/reset-key";
import {Requirement} from "../interfaces/requirement";
import {Holding} from "../holding";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Num} from "../../../num";
import {Multiplier} from "../multiplier";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {Styles} from "../../enums/styles";

export abstract class AcceleratorGenerator extends Generator {
  type: string = 'red-accelerators';
  resetId: ResetKey = ResetKey.RED;
  unlocked: boolean = false;
  requirement: Requirement[] = [];
  currency: Holding = HoldingRecord.redAccelerators;
  increase: Num = new Num(1, 1);
  override scaling: Num = new Num(1, 1);
  baseMultiplier: Num = new Num(2, 0);
  globalMultiplier: Multiplier = MultiplierRecord.redParticleGenerators;
  nav: string = 'red';
  style: Styles = Styles.RED;
  subNav: string = 'redAccelerators';
}
