import {Num} from "../../../num";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {FusionUpgrade} from "./fusion-upgrade";

export class IncreaseStarPressureUpgrade extends FusionUpgrade {
  constructor(saveName: string) {
    super(saveName, 'increase-star-pressure-upgrade');
  }

  displayName: string = 'Increase Star Pressure Upgrade';

  getDescription(): string {
    return `Increase the pressure of your star by ${this.buffer.toString(2)}`;
  }

  override buffer: Num = new Num(3, 0);
  override baseBuffer: Num = new Num(3, 0);

  action(): Num | undefined {
    const effect = this.buffer.pow(this.amount);
    MultiplierRecord.yellowFusionGenerators.correct(effect);
    return effect;
  }

  baseCost: Num = new Num(1, 14);
  cost: Num = new Num(1, 14);
  override increase: Num = new Num(1, 1);
}
