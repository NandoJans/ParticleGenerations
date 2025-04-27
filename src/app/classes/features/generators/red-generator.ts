import {Generator} from "../generator";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Num} from "../../../num";
import {Requirement} from "../interfaces/requirement";
import {Holding} from "../holding";
import {Styles} from "../../enums/styles";
import {Multiplier} from "../multiplier";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {RedGeneratorMultiplierUpgrade} from "../upgrades/red-generator-multiplier-upgrade";
import {RedGeneratorBuyMultiplierUpgrade} from "../upgrades/red-generator-buy-multiplier-upgrade";
import {Upgrade} from "../upgrade";

export abstract class RedGenerator extends Generator {
  type: string = 'red-particle-generator';
  override unlocked: boolean = false;
  requirement: Requirement[] = [];
  currency: Holding = HoldingRecord.redParticles;
  baseMultiplier: Num = new Num(2, 0);
  override scalingStart: Num = new Num(1, 100);
  override scaling: Num = new Num(1, 1);
  globalMultiplier: Multiplier = MultiplierRecord.redParticleGenerators;
  nav: string = 'red';
  style: Styles = Styles.RED;
  subNav: string = 'redParticles';

  abstract multiplierUpgrade: RedGeneratorMultiplierUpgrade;
  abstract buyMultiplierUpgrade: RedGeneratorBuyMultiplierUpgrade;

  override getUpgrades(): Upgrade[] {
    return [
      this.multiplierUpgrade,
      this.buyMultiplierUpgrade,
    ];
  }
}
