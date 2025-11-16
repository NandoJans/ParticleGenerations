import {GreenGenerator} from "./green-generator";
import {Num} from "../../../num";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {GeneratorRecord} from "../../records/generators/generator-record";

export class SecondGreenGenerator extends GreenGenerator {
  displayName: string = 'Second Green Generator';

  stringRank: string = '2';
  rank: number = 2;
  baseCost: Num = new Num(2, 0);
  cost: Num = new Num(2, 0);
  increase: Num = new Num(3, 0);
  startIncrease: Num = new Num(3, 0);

  requirement: Requirement[] = [];

  constructor(saveName: string) {
    super(saveName, "second-green-generator");
  }

  override init() {
    this.generates = GeneratorRecord.firstGreenGenerator;
    this.requirement = [
      new Requirement(UpgradeRecord.unlockSecondGreenGeneratorGalaxyTree, new Num(1, 0), this)
    ];
  }
}
