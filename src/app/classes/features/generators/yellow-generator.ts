import {Generator} from "../generator";
import {Requirement} from "../interfaces/requirement";
import {Holding} from "../holding";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Num} from "../../../num";
import {Multiplier} from "../multiplier";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {Styles} from "../../enums/styles";
import {Upgrade} from "../upgrade";
import {YellowGeneratorMultiplierUpgrade} from "../upgrades/yellow-generator-multiplier-upgrade";
import {YellowGeneratorBuyMultiplierUpgrade} from "../upgrades/yellow-generator-buy-multiplier-upgrade";
import {ResetHelper} from "../../helpers/reset-helper";
import {ResetKey} from "../../enums/reset-key";

export abstract class YellowGenerator extends Generator {
  type: string = 'yellow-generator';
  requirement: Requirement[];
  name: string;
  override unlocked: boolean = false;

  protected constructor(saveName: string, name: string) {
    super(saveName);
    this.name = name;
    this.requirement = [
      new Requirement(HoldingRecord.yellowPrestiges, new Num(5, 2), this)
    ];
    this.resetId = ResetHelper.registerReset(ResetKey.YELLOW, this);
    this.softResetId = ResetHelper.registerSoftReset(ResetKey.RED, this);
  }

  resetId: ResetKey;
  softResetId: ResetKey;

  currency: Holding = HoldingRecord.yellowParticles;
  baseMultiplier: Num = new Num(2, 0);
  override scaling: Num = new Num(1, 1);
  globalMultiplier: Multiplier = MultiplierRecord.yellowGenerators;
  nav: string = 'yellow';
  style: Styles = Styles.YELLOW;
  subNav: string = 'yellowGenerators';

  abstract multiplierUpgrade: YellowGeneratorMultiplierUpgrade;
  abstract buyMultiplierUpgrade: YellowGeneratorBuyMultiplierUpgrade;


  override getUpgrades(): Upgrade[] {
    return [
      this.multiplierUpgrade,
      this.buyMultiplierUpgrade,
    ];
  }
}
