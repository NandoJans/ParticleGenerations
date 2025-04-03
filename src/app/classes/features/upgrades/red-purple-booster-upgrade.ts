import {RedPurpleUpgrade} from "./red-purple-upgrade";
import {Num} from "../../../num";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class RedPurpleBoosterUpgrade extends RedPurpleUpgrade {
  name: string = 'red-purple-booster-increaser';
  displayName: string = 'Red Purple Booster';
  description: string = 'Multiply the red purple generators by ';
  baseCost: Num = new Num(1, 40);
  cost: Num = new Num(1, 40);
  override baseBuffer: Num = new Num(2, 0);
  override buffer: Num = new Num(2, 0);
  increase: Num = new Num(1, 160000);
  override scaling: Num = new Num(1, 340000);
  type: string = 'red-purple-upgrade';
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.purples, new Num(2, 0))
  ];

  action(): Num {
    const buff: Num | undefined = this.buffer.pow(this.bought, false)
    MultiplierRecord.redPurpleGenerators.correct(buff);
    return buff;
  }

  getDescription(): string {
    return this.description + ' ' + this.buffer.toString(true) + 'x';
  }
}
