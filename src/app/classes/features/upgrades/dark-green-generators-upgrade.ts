import {DarkUpgrade} from "./dark-upgrade";
import {Num} from "../../../num";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class DarkGreenGeneratorsUpgrade extends DarkUpgrade {
  name: string = 'dark-green-generators';
  displayName: string = 'Dark Green Generators';

  override buffer = new Num(3, 0);
  override baseBuffer = new Num(3, 0);

  getDescription(): string {
    return "Multiply the green generators by " + this.buffer + ".";
  }

  override action(): Num {
    super.action();
    const buff: Num = this.buffer.pow(this.bought, false)
    MultiplierRecord.greenParticleGenerators.correct(buff);
    return buff;
  }
}
