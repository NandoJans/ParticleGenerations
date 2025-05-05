import {YellowGenerator} from "./yellow-generator";
import {Generatable} from "../interfaces/generatable";
import {Num} from "../../../num";
import {YellowGeneratorMultiplierUpgrade} from "../upgrades/yellow-generator-multiplier-upgrade";
import {YellowGeneratorBuyMultiplierUpgrade} from "../upgrades/yellow-generator-buy-multiplier-upgrade";
import {GeneratorRecord} from "../../records/generators/generator-record";

export class SecondYellowGenerator extends YellowGenerator {
  constructor(saveName: string) {
    super(saveName, 'second-yellow-generator');
  }
  displayName: string = 'Second Yellow Generator';
  generates: Generatable = GeneratorRecord.firstYellowGenerator;
  stringRank: string = '2';
  rank: number = 2;
  baseCost: Num = new Num(1, 3);
  cost: Num = new Num(1, 3);
  increase: Num = new Num(1, 2);

  multiplierUpgrade: YellowGeneratorMultiplierUpgrade = new YellowGeneratorMultiplierUpgrade(
    this.name + '.multiplierUpgrade',
    new Num(2, 4),
    new Num(1, 1),
    new Num(1, 1),
    new Num(5, 0),
    this
  );
  buyMultiplierUpgrade: YellowGeneratorBuyMultiplierUpgrade = new YellowGeneratorBuyMultiplierUpgrade(
    this.name + '.buyMultiplierUpgrade',
    new Num(1, 5),
    new Num(1, 2),
    new Num(1, 1),
    new Num(1.2, 0),
    this
  );
}
