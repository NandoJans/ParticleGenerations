import {BluePurpleUpgrade} from "./blue-purple-upgrade";
import {Num} from "../../../num";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class BluePurpleBoosterUpgrade extends BluePurpleUpgrade {
  name: string = 'blue-purple-booster-increaser';
  displayName: string = 'Blue Purple Booster';
  description: string = 'Multiply the blue purple generators by ';
  baseCost: Num = new Num(1, 40);
  cost: Num = new Num(1, 40);
  override baseBuffer: Num = new Num(2, 0);
  override buffer: Num = new Num(2, 0);
  increase: Num = new Num(1, 40);
  override scaling: Num = new Num(1, 80);
  type: string = 'blue-purple-upgrade';
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.purples, new Num(2, 0))
  ];

  action(): Num {
    const buff: Num | undefined = this.buffer.pow(this.bought, false)
    MultiplierRecord.bluePurpleGenerators.correct(buff);
    return buff;
  }

  getDescription(): string {
    return this.description + ' ' + this.buffer.toString(true) + 'x';
  }
}
