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

export class FifthRedGenerator extends RedGenerator {
  baseCost: Num = new Num(1, 5);
  cost: Num = new Num(1, 5);
  displayName: string = 'Red Generator 5';
  generates: Generatable = GeneratorRecord.fourthRedGenerator;
  name: string = 'red-generator-5';
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.RED_EXTENSION, this);
  softResetId: ResetKey = ResetHelper.registerSoftReset(ResetKey.RED_EXTENSION, this);
  increase: Num = new Num(1, 6);
  startIncrease: Num = new Num(1, 6);
  override requirement: Requirement[] = [
    new Requirement(UpgradeRecord.redGeneratorExtension, new Num(4, 0), this)
  ];
  stringRank: string = 'Fifth';
  rank: number = 5;


  multiplierUpgrade: RedGeneratorMultiplierUpgrade = new RedGeneratorMultiplierUpgrade(
    this.name + '.multiplierUpgrade',
    new Num(1, 12),
    new Num(1, 6),
    new Num(1, 1),
    new Num(1.25, 0),
    this
  );
  buyMultiplierUpgrade: RedGeneratorBuyMultiplierUpgrade = new RedGeneratorBuyMultiplierUpgrade(
    this.name + '.buyMultiplierUpgrade',
    new Num(1, 13),
    new Num(1, 7),
    new Num(1, 1),
    new Num(1.05, 0),
    this
  );
}
