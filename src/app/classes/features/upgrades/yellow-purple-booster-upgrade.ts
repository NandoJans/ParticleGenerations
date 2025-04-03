import {YellowPurpleUpgrade} from "./yellow-purple-upgrade";
import {Num} from "../../../num";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class YellowPurpleBoosterUpgrade extends YellowPurpleUpgrade {
  name: string = 'yellow-purple-booster-increaser';
  displayName: string = 'Yellow Purple Booster';
  description: string = 'Multiply the yellow purple generators by ';
  baseCost: Num = new Num(1, 40);
  cost: Num = new Num(1, 40);
  override baseBuffer: Num = new Num(2, 0);
  override buffer: Num = new Num(2, 0);
  increase: Num = new Num(1, 1600);
  override scaling: Num = new Num(1, 3200);
  type: string = 'yellow-purple-upgrade';
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.purples, new Num(2, 0))
  ];

  action(): Num {
    const buff: Num | undefined = this.buffer.pow(this.bought, false)
    MultiplierRecord.yellowPurpleGenerators.correct(buff);
    return buff;
  }

  getDescription(): string {
    return this.description + ' ' + this.buffer.toString(true) + 'x';
  }
}
