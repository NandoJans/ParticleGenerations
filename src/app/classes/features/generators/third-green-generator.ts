import {GreenGenerator} from "./green-generator";
import {Num} from "../../../num";
import {Requirement} from "../interfaces/requirement";
import {GeneratorRecord} from "../../records/generators/generator-record";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {GreenGeneratorMultiplierUpgrade} from "../upgrades/green-generator-multiplier-upgrade";
import {GreenGeneratorBuyMultiplierUpgrade} from "../upgrades/green-generator-buy-multiplier-upgrade";
import {GreenGeneratorCostDivisorUpgrade} from "../upgrades/green-generator-cost-divisor-upgrade";

export class ThirdGreenGenerator extends GreenGenerator {
  displayName: string = 'Third Green Generator';

  stringRank: string = '3';
  rank: number = 3;
  baseCost: Num = new Num(5, 1);
  cost: Num = new Num(3, 0);
  increase: Num = new Num(4, 0);
  startIncrease: Num = new Num(4, 0);

  requirement: Requirement[] = [];

  constructor(saveName: string) {
    super(saveName, "third-green-generator");
  }

  multiplierUpgrade: GreenGeneratorMultiplierUpgrade = new GreenGeneratorMultiplierUpgrade(
    this.name + '.multiplierUpgrade',
    new Num(5, 1),
    new Num(2, 0),
    new Num(2, 0),
    new Num(5, 0),
    this
  );
  buyMultiplierUpgrade: GreenGeneratorBuyMultiplierUpgrade = new GreenGeneratorBuyMultiplierUpgrade(
    this.name + '.buyMultiplierUpgrade',
    new Num(1, 2),
    new Num(2.5, 0),
    new Num(2, 0),
    new Num(1.5, 0),
    this
  )
  costDivisorUpgrade: GreenGeneratorCostDivisorUpgrade = new GreenGeneratorCostDivisorUpgrade(
    this.name + '.costDivisorUpgrade',
    new Num(1, 3),
    new Num(3, 0),
    new Num(2, 0),
    new Num(1, 1),
    this
  )

  override init() {
    this.generates = GeneratorRecord.secondGreenGenerator;
    this.requirement = [
      // new Requirement(UpgradeRecord.unlockThird, new Num(1, 0), this)
    ];
  }
}
