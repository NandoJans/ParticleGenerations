import {Num} from "../../../num";
import {Generatable} from "../interfaces/generatable";
import {GeneratorRecord} from "../../records/generators/generator-record";
import {RedGenerator} from "./red-generator";
import {Requirement} from "../interfaces/requirement";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {RedGeneratorMultiplierUpgrade} from "../upgrades/red-generator-multiplier-upgrade";
import {RedGeneratorBuyMultiplierUpgrade} from "../upgrades/red-generator-buy-multiplier-upgrade";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";

export class FourthRedGenerator extends RedGenerator {
  baseCost: Num = new Num(1, 4);
  cost: Num = new Num(1, 4);
  displayName: string = 'Red Generator 4';
  generates: Generatable = GeneratorRecord.thirdRedGenerator;
  name: string = 'red-generator-4';
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.RED_EXTENSION, this);
  softResetId: ResetKey = ResetHelper.registerSoftReset(ResetKey.RED_EXTENSION, this);
  increase: Num = new Num(1, 5);
  startIncrease: Num = new Num(1, 5);
  override requirement: Requirement[] = [
    new Requirement(UpgradeRecord.redGeneratorExtension, new Num(3, 0), this)
  ];
  stringRank: string = 'Fourth';
  rank: number = 4;

  multiplierUpgrade: RedGeneratorMultiplierUpgrade = new RedGeneratorMultiplierUpgrade(
    this.name + '.multiplierUpgrade',
    new Num(1, 10),
    new Num(1, 5),
    new Num(1, 1),
    new Num(1.25, 0),
    this
  );
  buyMultiplierUpgrade: RedGeneratorBuyMultiplierUpgrade = new RedGeneratorBuyMultiplierUpgrade(
    this.name + '.buyMultiplierUpgrade',
    new Num(1, 11),
    new Num(1, 6),
    new Num(1, 1),
    new Num(1.05, 0),
    this
  );
}
