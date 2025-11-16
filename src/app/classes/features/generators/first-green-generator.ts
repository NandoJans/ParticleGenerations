import {GreenGenerator} from "./green-generator";
import {Requirement} from "../interfaces/requirement";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import { Generatable } from "../interfaces/generatable";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {GreenGeneratorMultiplierUpgrade} from "../upgrades/green-generator-multiplier-upgrade";
import {GreenGeneratorBuyMultiplierUpgrade} from "../upgrades/green-generator-buy-multiplier-upgrade";
import {GreenGeneratorCostDivisorUpgrade} from "../upgrades/green-generator-cost-divisor-upgrade";

export class FirstGreenGenerator extends GreenGenerator {
  displayName: string = 'First Green Generator';

  stringRank: string = '1';
  rank: number = 1;
  baseCost: Num = new Num(1, 0);
  cost: Num = new Num(1, 0);
  increase: Num = new Num(2, 0);
  startIncrease: Num = new Num(2, 0);

  requirement: Requirement[] = [];

  constructor(saveName: string) {
    super(saveName, "first-green-generator");
  }

  multiplierUpgrade: GreenGeneratorMultiplierUpgrade = new GreenGeneratorMultiplierUpgrade(
    this.name + '.multiplierUpgrade',
    new Num(1, 0),
    new Num(2, 0),
    new Num(2, 0),
    new Num(1, 1),
    this
  );
  buyMultiplierUpgrade: GreenGeneratorBuyMultiplierUpgrade = new GreenGeneratorBuyMultiplierUpgrade(
    this.name + '.buyMultiplierUpgrade',
    new Num(2, 0),
    new Num(2.5, 0),
    new Num(2, 0),
    new Num(1.5, 0),
    this
  )
  costDivisorUpgrade: GreenGeneratorCostDivisorUpgrade = new GreenGeneratorCostDivisorUpgrade(
    this.name + '.costDivisorUpgrade',
    new Num(1, 1),
    new Num(3, 0),
    new Num(2, 0),
    new Num(1, 1),
    this
  )

  override init() {
    this.generates = HoldingRecord.darkMatter;
    this.requirement = [
      new Requirement(UpgradeRecord.unlockFirstGreenGeneratorGalaxyTree, new Num(1, 0), this)
    ];
  }
}
