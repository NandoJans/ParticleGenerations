import {BlueUpgrade} from "./blue-upgrade";
import {Num} from "../../../num";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class BlueParticleMultiplierUpgrade extends BlueUpgrade {
  baseCost: Num = new Num(3, 0);
  cost: Num = new Num(3, 0);
  override buffer: Num = new Num(2, 0);
  override baseBuffer: Num = new Num(2, 0);
  increase: Num = new Num(1, 1);
  displayName: string = "Multiply particles by 2";
  name: string = "blue-particle-multiplier";

  action(): Num {
    const buff: Num = this.buffer.pow(this.bought, false);
    MultiplierRecord.blueParticlesGain.correct(buff);
    return buff;
  }

  getDescription(): string {
    return `Multiply blue particles by ${this.buffer.toString(true)}x`;
  }

}
