import {YellowUpgrade} from "./yellow-upgrade";
import {Num} from "../../../num";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class MultiplyYellowKeyGainUpgrade extends YellowUpgrade {
  constructor(saveName: string) {
    super(saveName, 'multiply-yellow-key-gain');
  }
  displayName: string = 'Multiply Yellow Keys';

  override buffer: Num = new Num(2, 0);
  override baseBuffer: Num = new Num(2, 0);

  getDescription(): string {
    return "Multiply yellow key gain by " + this.buffer.toString(2) + "x";
  }
  action(): Num {
    const effect: Num = this.buffer.pow(this.amount);
    MultiplierRecord.yellowKeyGain.correct(effect);
    return effect
  }

  override oneTime: boolean = false;
  baseCost: Num = new Num(8, 0);
  override increase: Num = new Num(1, 1);
  override scaling: Num = new Num(1, 1);
  cost: Num = new Num(8, 0);
}
