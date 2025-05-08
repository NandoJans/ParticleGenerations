import {FusionUpgrade} from "./fusion-upgrade";
import {Num} from "../../../num";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class IncreaseStarGravityUpgrade extends FusionUpgrade {
  constructor(saveName: string) {
    super(saveName, 'increase-star-gravity-upgrade');
  }

  displayName: string = 'Increase Star Gravity';

  getDescription(): string {
    return `Increase the gravity of your star by ${this.buffer.toString(2)}`;
  }

  override buffer: Num = new Num(5, 0);
  override baseBuffer: Num = new Num(5, 0);

  action(): Num | undefined {
    const effect = this.buffer.pow(this.amount);
    MultiplierRecord.yellowFusionGenerators.correct(effect);
    return effect;
  }

  baseCost: Num = new Num(1, 15);
  cost: Num = new Num(1, 15);
  override increase: Num = new Num(4, 0);
}
