import {Upgrade} from "../upgrade";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Num} from "../../../num";
import {ResetHelper} from "../../helpers/reset-helper";
import {ResetKey} from "../../enums/reset-key";
import {Holding} from "../holding";
import {Multiplier} from "../multiplier";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {Styles} from "../../enums/styles";
import {Generator} from "../generator";

export abstract class GreenGenerator extends Generator {
  type: string = 'green-generator';
  name: string;
  override unlocked: boolean = false;

  protected constructor(saveName: string, name: string) {
    super(saveName);
    this.name = name;
    this.resetId = ResetHelper.registerReset(ResetKey.GREEN, this);
    this.softResetId = ResetHelper.registerSoftReset(ResetKey.YELLOW, this);
  }

  resetId: ResetKey;
  softResetId: ResetKey;

  currency: Holding = HoldingRecord.greenParticles;
  baseMultiplier: Num = new Num(Math.PI, 0);
  override scaling: Num = new Num(2, 0);
  globalMultiplier: Multiplier = MultiplierRecord.greenGenerators;
  nav: string = 'green';
  style: Styles = Styles.GREEN;
  subNav: string = 'greenGenerators';

  // abstract multiplierUpgrade: YellowGeneratorMultiplierUpgrade;
  // abstract buyMultiplierUpgrade: YellowGeneratorBuyMultiplierUpgrade;


  override getUpgrades(): Upgrade[] {
    return [];
  }
}
