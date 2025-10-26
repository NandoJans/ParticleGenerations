import {YellowGenerator} from "./yellow-generator";
import {Generatable} from "../interfaces/generatable";
import {GeneratorRecord} from "../../records/generators/generator-record";
import {Num} from "../../../num";
import {YellowGeneratorMultiplierUpgrade} from "../upgrades/yellow-generator-multiplier-upgrade";
import {YellowGeneratorBuyMultiplierUpgrade} from "../upgrades/yellow-generator-buy-multiplier-upgrade";

export class ThirdYellowGenerator extends YellowGenerator {
  constructor(saveName: string) {
    super(saveName, 'third-yellow-generator', true);
  }
  displayName: string = 'Yellow Generator 3';

  stringRank: string = '3';
  rank: number = 3;
  baseCost: Num = new Num(1, 4);
  cost: Num = new Num(1, 4);
  increase: Num = new Num(1, 2);
  startIncrease: Num = new Num(1, 2);

  multiplierUpgrade: YellowGeneratorMultiplierUpgrade = new YellowGeneratorMultiplierUpgrade(
    this.name + '.multiplierUpgrade',
    new Num(2, 5),
    new Num(1, 1),
    new Num(1, 1),
    new Num(5, 0),
    this
  );
  buyMultiplierUpgrade: YellowGeneratorBuyMultiplierUpgrade = new YellowGeneratorBuyMultiplierUpgrade(
    this.name + '.buyMultiplierUpgrade',
    new Num(1, 6),
    new Num(1, 2),
    new Num(1, 1),
    new Num(1.2, 0),
    this
  );

  override init() {
    super.init();
    this.generates = GeneratorRecord.secondYellowGenerator;
  }
}
