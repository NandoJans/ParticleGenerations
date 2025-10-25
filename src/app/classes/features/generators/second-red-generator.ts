import {Num} from "../../../num";
import {Generatable} from "../interfaces/generatable";
import {RedGenerator} from "./red-generator";
import {GeneratorRecord} from "../../records/generators/generator-record";
import {Requirement} from "../interfaces/requirement";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {RedGeneratorMultiplierUpgrade} from "../upgrades/red-generator-multiplier-upgrade";
import {RedGeneratorBuyMultiplierUpgrade} from "../upgrades/red-generator-buy-multiplier-upgrade";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";

export class SecondRedGenerator extends RedGenerator {
  baseCost: Num = new Num(1, 2);
  cost: Num = new Num(1, 2);
  displayName: string = 'Red Generator 2';
  name: string = 'red-generator-2';
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.RED_EXTENSION, this);
  softResetId: ResetKey = ResetHelper.registerSoftReset(ResetKey.RED_EXTENSION, this);
  increase: Num = new Num(1, 3);
  startIncrease: Num = new Num(1, 3);
  override requirement: Requirement[] = [
    new Requirement(UpgradeRecord.redGeneratorExtension, new Num(1, 0), this)
  ];
  stringRank: string = 'Second';
  rank: number = 2;

  override init() {
    this.generates = GeneratorRecord.firstRedGenerator;
  }

  multiplierUpgrade: RedGeneratorMultiplierUpgrade = new RedGeneratorMultiplierUpgrade(
    this.name + '.multiplierUpgrade',
    new Num(1, 4),
    new Num(1, 3),
    new Num(1, 1),
    new Num(1.25, 0),
    this
  );
  buyMultiplierUpgrade: RedGeneratorBuyMultiplierUpgrade = new RedGeneratorBuyMultiplierUpgrade(
    this.name + '.buyMultiplierUpgrade',
    new Num(1, 5),
    new Num(1, 4),
    new Num(1, 1),
    new Num(1.05, 0),
    this
  );
}
