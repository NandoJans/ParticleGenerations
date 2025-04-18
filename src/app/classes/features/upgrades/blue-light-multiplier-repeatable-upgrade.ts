import {BlueUpgrade} from "./blue-upgrade";
import {Num} from "../../../num";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class BlueLightMultiplierRepeatableUpgrade extends  BlueUpgrade {
  override scalingStart = new Num(1, 110);
  override scaling = new Num(1, 1);
  baseCost: Num = new Num(5, 0);
  cost: Num = new Num(5, 0);
  override buffer: Num = new Num(2, 0);
  override baseBuffer: Num = new Num(2, 0);
  increase: Num = new Num(1, 1);
  displayName: string = "Multiply light by 2";
  name: string = "blue-light-multiplier-repeatable";

  action(): Num {
    const buff: Num = this.buffer.pow(this.bought, false);
    MultiplierRecord.blueLightGenerators.correct(buff);
    return buff;
  }

  getDescription(): string {
    return `Multiply blue light by ${this.buffer.toString(true)}x`;
  }

}
