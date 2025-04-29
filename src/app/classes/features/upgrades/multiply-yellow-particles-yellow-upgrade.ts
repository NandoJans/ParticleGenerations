import {Num} from "../../../num";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {YellowUpgrade} from "./yellow-upgrade";

export class MultiplyYellowParticlesYellowUpgrade extends YellowUpgrade {
  constructor(saveName: string) {
    super(saveName, 'multiply-yellow-particles-yellow');
  }
  displayName: string = 'Multiply Yellow Particles';

  override buffer: Num = new Num(2, 0);
  override baseBuffer: Num = new Num(2, 0);

  getDescription(): string {
    return "Multiply yellow particle gain by " + this.buffer.toString(2) + "x";
  }
  action(): Num {
    const effect: Num = this.buffer.pow(this.amount);
    MultiplierRecord.yellowParticleGain.correct(effect);
    return effect
  }

  override oneTime: boolean = false;
  baseCost: Num = new Num(2, 0);
  override increase: Num = new Num(1, 1);
  cost: Num = new Num(2, 0);
}
