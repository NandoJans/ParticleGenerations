import {YellowUpgrade} from "./yellow-upgrade";
import {Num} from "../../../num";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class YellowRepeatableMultiplierUpgrade extends YellowUpgrade {
  name: string = 'yellow-repeatable-multiplier';
  displayName: string = 'Multiply red generators';

  baseCost: Num = new Num(1, 0);
  cost: Num = new Num(1, 0);
  override increase: Num = new Num(1, 1);

  override baseBuffer: Num = new Num(2, 0);
  override buffer: Num = new Num(2, 0);


  override action(): Num {
    const buff: Num = this.buffer.pow(this.bought, false);
    MultiplierRecord.redParticleGenerators.correct(buff);
    return buff;
  }

  override getDescription(): string {
    return 'Multiply red generators by '+this.buffer.toString(true)+'x';
  }

  override effectString(): string {
    return super.effectString()+"x";
  }
}
