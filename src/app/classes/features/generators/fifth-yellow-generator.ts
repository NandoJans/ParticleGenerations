import {YellowGenerator} from "./yellow-generator";
import {Generatable} from "../interfaces/generatable";
import {GeneratorRecord} from "../../records/generators/generator-record";
import {Num} from "../../../num";
import {YellowGeneratorMultiplierUpgrade} from "../upgrades/yellow-generator-multiplier-upgrade";
import {YellowGeneratorBuyMultiplierUpgrade} from "../upgrades/yellow-generator-buy-multiplier-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Requirement} from "../interfaces/requirement";

export class FifthYellowGenerator extends YellowGenerator {
  constructor(saveName: string) {
    super(saveName, 'fifth-yellow-generator');
  }
  displayName: string = 'Yellow Generator 5';

  stringRank: string = '5';
  rank: number = 5;
  baseCost: Num = new Num(1, 100);
  cost: Num = new Num(1, 100);
  increase: Num = new Num(1, 4);
  startIncrease: Num = new Num(1, 4);

  multiplierUpgrade: YellowGeneratorMultiplierUpgrade = new YellowGeneratorMultiplierUpgrade(
    this.name + '.multiplierUpgrade',
    new Num(1, 110),
    new Num(1, 5),
    new Num(1, 1),
    new Num(5, 0),
    this
  );
  buyMultiplierUpgrade: YellowGeneratorBuyMultiplierUpgrade = new YellowGeneratorBuyMultiplierUpgrade(
    this.name + '.buyMultiplierUpgrade',
    new Num(1, 115),
    new Num(1, 6),
    new Num(1, 1),
    new Num(1.2, 0),
    this
  );

  override init() {
    super.init();
    this.generates = GeneratorRecord.fourthYellowGenerator;
    this.requirement = [
      new Requirement(UpgradeRecord.unlockFifthYellowGenerator, new Num(1, 0), this),
    ]
  }
}
