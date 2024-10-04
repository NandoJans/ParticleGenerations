import {Num} from "../../../num";
import {DarkUpgrade} from "./dark-upgrade";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class DarkRedGeneratorsUpgrade extends DarkUpgrade {
  name: string = 'dark-red-generators';
  displayName: string = 'Dark Red Generators';

  override buffer = new Num(1, 150);
  override baseBuffer = new Num(1, 150);

  getDescription(): string {
    return "Increase red generators by " + this.buffer + "."
  }

  override action(): Num {
    super.action();
    const buff: Num = this.buffer.pow(this.bought, false)
    MultiplierRecord.redParticleGenerators.correct(buff);
    return buff;
  }
}
