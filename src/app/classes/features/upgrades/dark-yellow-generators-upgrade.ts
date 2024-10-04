import {DarkUpgrade} from "./dark-upgrade";
import {Num} from "../../../num";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class DarkYellowGeneratorsUpgrade extends DarkUpgrade {
  name: string = 'dark-yellow-generators';
  displayName: string = 'Dark Yellow Generators';

  override buffer = new Num(1, 15);
  override baseBuffer = new Num(1, 15);

  getDescription(): string {
    return "Multiply the yellow generators by " + this.buffer + ".";
  }

  override action(): Num {
    super.action();
    const buff: Num = this.buffer.pow(this.bought, false)
    MultiplierRecord.yellowPowerGenerators.correct(buff);
    return buff;
  }
}
