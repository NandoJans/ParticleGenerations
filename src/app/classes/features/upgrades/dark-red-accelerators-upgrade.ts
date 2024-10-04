import {DarkUpgrade} from "./dark-upgrade";
import {Num} from "../../../num";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class DarkRedAcceleratorsUpgrade extends DarkUpgrade {
  name: string = 'dark-red-accelerators';
  displayName: string = 'Dark Red Accelerators';

  override buffer = new Num(1, 40);
  override baseBuffer = new Num(1, 40);

  getDescription(): string {
    return "Increase red accelerators by " + this.buffer + "."
  }

  override action(): Num {
    super.action();
    const buff: Num = this.buffer.pow(this.bought, false)
    MultiplierRecord.redAcceleratorGenerators.correct(buff);
    return buff;
  }
}
