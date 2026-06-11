import {GreenGenerator} from './green-generator';
import {Num} from '../../../num';
import {Requirement} from '../interfaces/requirement';
import {GeneratorRecord} from '../../records/generators/generator-record';
import {UpgradeRecord} from '../../records/upgrades/upgrade-record';
import {GreenGeneratorMultiplierUpgrade} from '../upgrades/green-generator-multiplier-upgrade';
import {GreenGeneratorBuyMultiplierUpgrade} from '../upgrades/green-generator-buy-multiplier-upgrade';
import {GreenGeneratorCostDivisorUpgrade} from '../upgrades/green-generator-cost-divisor-upgrade';

export class FifthGreenGenerator extends GreenGenerator {
  displayName = 'Green Generator 5';
  stringRank = '5';
  rank = 5;
  baseCost = new Num(5, 3);
  cost = new Num(5, 3);
  increase = new Num(6, 0);
  requirement: Requirement[] = [];
  startIncrease = new Num(6, 0);

  constructor(saveName: string) {
    super(saveName, 'fifth-green-generator');
  }

  multiplierUpgrade: GreenGeneratorMultiplierUpgrade = new GreenGeneratorMultiplierUpgrade(
    this.name + '.multiplierUpgrade',
    new Num(5, 3),
    new Num(2, 0),
    new Num(2, 0),
    new Num(5, 0),
    this
  );
  buyMultiplierUpgrade: GreenGeneratorBuyMultiplierUpgrade = new GreenGeneratorBuyMultiplierUpgrade(
    this.name + '.buyMultiplierUpgrade',
    new Num(1, 4),
    new Num(2.5, 0),
    new Num(2, 0),
    new Num(1.5, 0),
    this
  );
  costDivisorUpgrade: GreenGeneratorCostDivisorUpgrade = new GreenGeneratorCostDivisorUpgrade(
    this.name + '.costDivisorUpgrade',
    new Num(1, 5),
    new Num(3, 0),
    new Num(2, 0),
    new Num(1, 1),
    this
  );

  override init(): void {
    this.generates = GeneratorRecord.fourthGreenGenerator;
    this.requirement = [
      new Requirement(UpgradeRecord.unlockFifthGreenGeneratorNuclear, Num.ONE, this),
    ];
  }
}
