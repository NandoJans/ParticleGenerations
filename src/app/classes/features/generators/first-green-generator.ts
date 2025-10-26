import {GreenGenerator} from "./green-generator";
import {Requirement} from "../interfaces/requirement";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import { Generatable } from "../interfaces/generatable";
import {HoldingRecord} from "../../records/holdings/holding-record";

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

  override init() {
    this.generates = HoldingRecord.darkMatter;
    this.requirement = [
      new Requirement(UpgradeRecord.unlockFirstGreenGenerator, new Num(1, 0), this)
    ];
  }
}
