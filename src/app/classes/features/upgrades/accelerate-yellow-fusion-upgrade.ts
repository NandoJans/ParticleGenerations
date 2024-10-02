import {YellowUpgrade} from "./yellow-upgrade";
import {Num} from "../../../num";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class AccelerateYellowFusionUpgrade extends YellowUpgrade {
  name: string = 'accelerate-yellow-fusion';
  displayName: string = 'Better condition';

  baseCost: Num = new Num(1, 32);
  cost: Num = new Num(1, 32);
  override oneTime: boolean = true;
  override subNav: string = 'yellowFusion'

  override buffer: Num = new Num(1.1, 0);
  override baseBuffer: Num = new Num(1.1, 0);

  override action(): Num {
    const buff: Num = this.buffer.pow(this.amount, false);
    MultiplierRecord.yellowFusion.correct(buff);
    return buff
  }

  override getDescription(): string {
    const buffer: Num = this.buffer.sub(new Num(1, 0), false).mul(new Num(1, 2), false);
    return 'Make better conditions to accelerate fusion. Speeds up fusion by '+buffer.toString()+'%.';
  }

  override effectString(): string {
    if (this.effect === undefined) {
      return '';
    }
    const effect: Num = this.effect.sub(new Num(1, 0), false).mul(new Num(1, 2), false);
    return effect.toString()+'%';
  }
}
