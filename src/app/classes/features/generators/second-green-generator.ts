import {GreenGenerator} from "./green-generator";
import {Num} from "../../../num";
import {Requirement} from "../interfaces/requirement";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {GeneratorRecord} from "../../records/generators/generator-record";
import {GreenGeneratorMultiplierUpgrade} from "../upgrades/green-generator-multiplier-upgrade";
import {GreenGeneratorBuyMultiplierUpgrade} from "../upgrades/green-generator-buy-multiplier-upgrade";
import {GreenGeneratorCostDivisorUpgrade} from "../upgrades/green-generator-cost-divisor-upgrade";

export class SecondGreenGenerator extends GreenGenerator {
  displayName: string = 'Second Green Generator';

  stringRank: string = '2';
  rank: number = 2;
  baseCost: Num = new Num(5, 0);
  cost: Num = new Num(5, 0);
  increase: Num = new Num(3, 0);
  startIncrease: Num = new Num(3, 0);

  requirement: Requirement[] = [];

  constructor(saveName: string) {
    super(saveName, "second-green-generator");
  }

  multiplierUpgrade: GreenGeneratorMultiplierUpgrade = new GreenGeneratorMultiplierUpgrade(
    this.name + '.multiplierUpgrade',
    new Num(5, 0),
    new Num(2, 0),
    new Num(2, 0),
    new Num(7, 0),
    this
  );
  buyMultiplierUpgrade: GreenGeneratorBuyMultiplierUpgrade = new GreenGeneratorBuyMultiplierUpgrade(
    this.name + '.buyMultiplierUpgrade',
    new Num(1, 1),
    new Num(2.5, 0),
    new Num(2, 0),
    new Num(1.5, 0),
    this
  )
  costDivisorUpgrade: GreenGeneratorCostDivisorUpgrade = new GreenGeneratorCostDivisorUpgrade(
    this.name + '.costDivisorUpgrade',
    new Num(1, 2),
    new Num(3, 0),
    new Num(2, 0),
    new Num(1, 1),
    this
  )

  override init() {
    this.generates = GeneratorRecord.firstGreenGenerator;
    this.requirement = [
      new Requirement(UpgradeRecord.unlockSecondGreenGeneratorGalaxyTree, new Num(1, 0), this)
    ];
  }
}
