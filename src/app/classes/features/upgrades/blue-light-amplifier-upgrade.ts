import {BlueLightUpgrade} from "./blue-light-upgrade";
import {Num} from "../../../num";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class BlueLightAmplifierUpgrade extends BlueLightUpgrade {
  override limit = new Num(5.6, 1);
  override scalingStart = new Num(1, 49);
  override scaling = new Num(1, 1);
  baseCost: Num = new Num(1, 6);
  cost: Num = new Num(1, 6);
  override buffer: Num = new Num(1.05, 0);
  override baseBuffer: Num = new Num(1.02, 0);
  displayName: string = "Blue Light Amplifier";
  increase: Num = new Num(1, 1);
  name: string = "blue-light-amplifier";

  action(): Num {
    const buff: Num = this.buffer.pow(this.bought, false);
    MultiplierRecord.blueLightPower.correct(buff);
    return buff;
  }

  getDescription(): string {
    return `Increases the blue light effect by ${this.buffer.toString(true)}`;
  }

}
