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
import {Enhancement} from "../enhancements/enhancement";
import {EnhancementRecord} from "../../records/enhancement-record";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

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

  override allowedEnhancements: Enhancement[] = [
    EnhancementRecord.yellow
  ];

  override reset() {
    super.reset();
    if (UpgradeRecord.startWithMoreRedExtensionsUpgrade.bought.greq(new Num(this.rank - 1, 0))) {
      this.unlock();
      this.multiplierUpgrade.unlock();
      this.buyMultiplierUpgrade.unlock();
    }
  }

  override getUpgrades(): Upgrade[] {
    return [
      this.multiplierUpgrade,
      this.buyMultiplierUpgrade,
    ];
  }
}
