import { Num } from "src/app/num";
import {FusionUpgrade} from "./fusion-upgrade";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class IncreaseStarMassUpgrade extends FusionUpgrade {
  constructor(saveName: string) {
    super(saveName, 'increase-star-mass-upgrade');
  }

  displayName: string = 'Increase Star Mass';

  getDescription(): string {
    return `Increase the mass of your star by ${this.buffer.toString(2)}`;
  }

  override buffer: Num = new Num(2, 0);
  override baseBuffer: Num = new Num(2, 0);

  action(): Num | undefined {
    const effect = this.buffer.pow(this.amount);
    MultiplierRecord.yellowFusionGenerators.correct(effect);
    return effect;
  }

  baseCost: Num = new Num(1, 13);
  cost: Num = new Num(1, 13);
  increase: Num = new Num(2, 0);
}
