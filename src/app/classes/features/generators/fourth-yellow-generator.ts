import {YellowGenerator} from "./yellow-generator";
import {Generatable} from "../interfaces/generatable";
import {GeneratorRecord} from "../../records/generators/generator-record";
import {Num} from "../../../num";
import {YellowGeneratorMultiplierUpgrade} from "../upgrades/yellow-generator-multiplier-upgrade";
import {YellowGeneratorBuyMultiplierUpgrade} from "../upgrades/yellow-generator-buy-multiplier-upgrade";
import {Requirement} from "../interfaces/requirement";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

export class FourthYellowGenerator extends YellowGenerator {
  constructor(saveName: string) {
    super(saveName, 'fourth-yellow-generator');
  }
  displayName: string = 'Yellow Generator 4';

  stringRank: string = '4';
  rank: number = 4;
  baseCost: Num = new Num(1, 35);
  cost: Num = new Num(1, 35);
  increase: Num = new Num(1, 3);
  startIncrease: Num = new Num(1, 3);

  multiplierUpgrade: YellowGeneratorMultiplierUpgrade = new YellowGeneratorMultiplierUpgrade(
    this.name + '.multiplierUpgrade',
    new Num(2, 6),
    new Num(1, 1),
    new Num(1, 1),
    new Num(5, 0),
    this
  );
  buyMultiplierUpgrade: YellowGeneratorBuyMultiplierUpgrade = new YellowGeneratorBuyMultiplierUpgrade(
    this.name + '.buyMultiplierUpgrade',
    new Num(1, 7),
    new Num(1, 2),
    new Num(1, 1),
    new Num(1.2, 0),
    this
  );

  override init() {
    super.init();
    this.generates = GeneratorRecord.thirdYellowGenerator;
    this.requirement = [
      new Requirement(UpgradeRecord.unlockFourthYellowGenerator, new Num(1, 0), this),
    ]
  }
}
