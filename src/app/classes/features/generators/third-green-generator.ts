import {GreenGenerator} from "./green-generator";
import {Num} from "../../../num";
import {Requirement} from "../interfaces/requirement";
import {GeneratorRecord} from "../../records/generators/generator-record";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

export class ThirdGreenGenerator extends GreenGenerator {
  displayName: string = 'Third Green Generator';

  stringRank: string = '3';
  rank: number = 3;
  baseCost: Num = new Num(3, 0);
  cost: Num = new Num(3, 0);
  increase: Num = new Num(4, 0);
  startIncrease: Num = new Num(4, 0);

  requirement: Requirement[] = [];

  constructor(saveName: string) {
    super(saveName, "third-green-generator");
  }

  override init() {
    this.generates = GeneratorRecord.secondGreenGenerator;
    this.requirement = [
      // new Requirement(UpgradeRecord.unlockThird, new Num(1, 0), this)
    ];
  }
}
