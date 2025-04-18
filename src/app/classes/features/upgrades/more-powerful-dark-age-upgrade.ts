import {BlueUpgrade} from "./blue-upgrade";
import {Num} from "../../../num";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class MorePowerfulDarkAgeUpgrade extends BlueUpgrade {
  baseCost: Num = new Num(1, 1);
  cost: Num = new Num(1, 1);
  override buffer: Num = new Num(1.67, 0);
  override baseBuffer: Num = new Num(1.67, 0);
  increase: Num = new Num(1, 0);
  displayName: string = "More Powerful Dark Age";
  name: string = "more-powerful-dark-age";
  override oneTime: boolean = true;

  action(): Num {
    const buff: Num = this.buffer.pow(this.bought, false);
    MultiplierRecord.darkPowerPower.correct(buff);
    return buff;
  }

  getDescription(): string {
    return `Dark power multiplies dark energy to the power of ${this.buffer.toString(true)}`;
  }

}
