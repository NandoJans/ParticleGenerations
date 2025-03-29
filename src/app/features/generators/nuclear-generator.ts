import {Generator} from "../../classes/features/generator";
import {ResetKey} from "../../classes/enums/reset-key";
import {ResetHelper} from "../../classes/helpers/reset-helper";
import {Requirement} from "../../classes/features/interfaces/requirement";
import {Holding} from "../../classes/features/holding";
import {HoldingRecord} from "../../classes/records/holdings/holding-record";
import {Num} from "../../num";
import {Multiplier} from "../../classes/features/multiplier";
import {MultiplierRecord} from "../../classes/records/multipliers/multiplier-record";
import {Styles} from "../../classes/enums/styles";

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
