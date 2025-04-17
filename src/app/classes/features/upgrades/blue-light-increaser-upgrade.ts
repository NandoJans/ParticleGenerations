import {BlueLightUpgrade} from "./blue-light-upgrade";
import {Num} from "../../../num";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class BlueLightIncreaserUpgrade extends BlueLightUpgrade {
  override limit = new Num(3.5, 1);
  override scalingStart = new Num(1, 50);
  override scaling = new Num(1, 1);
  baseCost: Num = new Num(1, 4);
  cost: Num = new Num(1, 4);
  override buffer: Num = new Num(2, 0);
  override baseBuffer: Num = new Num(2, 0);
  displayName: string = "Increase Blue Light";
  increase: Num = new Num(2.5, 2);
  name: string = "blue-light-increaser";

  action(): Num {
    const buff: Num = this.buffer.pow(this.bought, false);
    MultiplierRecord.blueLightGenerators.correct(buff);
    return buff;
  }

  getDescription(): string {
    return `Generates ${this.buffer.toString(true)}x more blue light`;
  }
}
