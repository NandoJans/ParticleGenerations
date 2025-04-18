import {BlueUpgrade} from "./blue-upgrade";
import {Num} from "../../../num";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class IncreasedYellowPowerUpgrade extends BlueUpgrade {
  baseCost: Num = new Num(1, 3);
  cost: Num = new Num(1, 3);
  override buffer: Num = new Num(8, 0);
  override baseBuffer: Num = new Num(8, 0);
  increase: Num = new Num(1, 0);
  displayName: string = "Yellow Fusion Boosts Green";
  name: string = "yellow-fusion-boosts-green";
  override oneTime: boolean = true;

  action(): Num {
    const buff: Num = this.buffer.pow(this.bought, false);
    MultiplierRecord.yellowPowerPower.correct(buff);
    return buff;
  }

  getDescription(): string {
    return `Multiply yellow power by ${this.buffer.toString(true)}x`;
  }

}
