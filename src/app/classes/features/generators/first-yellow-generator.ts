import {Num} from "src/app/num";
import {Generatable} from "../interfaces/generatable";
import {YellowGenerator} from "./yellow-generator";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {YellowGeneratorMultiplierUpgrade} from "../upgrades/yellow-generator-multiplier-upgrade";
import {YellowGeneratorBuyMultiplierUpgrade} from "../upgrades/yellow-generator-buy-multiplier-upgrade";

export class FirstYellowGenerator extends YellowGenerator {
  constructor(saveName: string) {
    super(saveName, 'first-yellow-generator', true);
  }
  displayName: string = 'Yellow Generator 1';

  stringRank: string = '1';
  rank: number = 1;
  // Bring the first active Yellow purchase closer to the first prestige instead of leaving a dead zone.
  baseCost: Num = new Num(7.5, 1);
  cost: Num = new Num(7.5, 1);
  increase: Num = new Num(1, 1);
  startIncrease: Num = new Num(1, 1);
  multiplierUpgrade: YellowGeneratorMultiplierUpgrade = new YellowGeneratorMultiplierUpgrade(
    this.name + '.multiplierUpgrade',
    new Num(2, 3),
    new Num(1, 1),
    new Num(1, 1),
    new Num(5, 0),
    this
  );
  buyMultiplierUpgrade: YellowGeneratorBuyMultiplierUpgrade = new YellowGeneratorBuyMultiplierUpgrade(
    this.name + '.buyMultiplierUpgrade',
    new Num(1, 4),
    new Num(1, 2),
    new Num(1, 1),
    new Num(1.2, 0),
    this
  );

  override init() {
    super.init();
    this.generates = HoldingRecord.yellowPower;
  }
}
