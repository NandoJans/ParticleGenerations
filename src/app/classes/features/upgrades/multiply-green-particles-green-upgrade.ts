import {Num} from "../../../num";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {GreenUpgrade} from "./green-upgrade";

export class MultiplyGreenParticlesGreenUpgrade extends GreenUpgrade {
  constructor(saveName: string) {
    super(saveName, 'multiply-green-particles-green');
  }
  displayName: string = 'Multiply Green Particles';

  override buffer: Num = new Num(2, 0);
  override baseBuffer: Num = new Num(2, 0);

  getDescription(): string {
    return "Multiply green particle gain by " + this.buffer.toString(2) + "x";
  }
  action(): Num {
    const effect: Num = this.buffer.pow(this.amount);
    MultiplierRecord.greenParticleGain.correct(effect);
    return effect
  }

  override oneTime: boolean = false;
  baseCost: Num = new Num(2, 0);
  override increase: Num = new Num(1, 1);
  override startIncrease: Num = new Num(1, 1);
  cost: Num = new Num(2, 0);
}
