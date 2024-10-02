import {Num} from "../../../num";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {YellowUpgrade} from "./yellow-upgrade";

export class YellowParticleMultiplierUpgrade extends YellowUpgrade {
  name: string = 'yellow-particle-multiplier';
  displayName: string = 'Multiply particles by 2';

  baseCost: Num = new Num(1, 0);
  cost: Num = new Num(1, 0);
  override increase: Num = new Num(1, 1);
  override scaling: Num = new Num(1, 1);
  override scalingStart: Num = new Num(1, 10000000);

  override baseBuffer: Num = new Num(2, 0);
  override buffer: Num = new Num(2, 0);

  override action(): Num {
    const buff: Num = this.buffer.pow(this.bought, false);
    MultiplierRecord.yellowParticlesGain.correct(buff);
    return buff;
  }

  override getDescription(): string {
    return 'Multiply yellow particles gain by ' + this.buffer.toString(true) + 'x';
  }

  override effectString(): string {
    return super.effectString()+"x";
  }
}
