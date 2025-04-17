import {BlueLightUpgrade} from "./blue-light-upgrade";
import {Num} from "../../../num";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class YellowFusionEffectIncreaserUpgrade extends BlueLightUpgrade {
  override limit = new Num(1, 1);
  override scalingStart = new Num(1, 20);
  override scaling = new Num(4, 1);
  baseCost: Num = new Num(1, 7);
  cost: Num = new Num(1, 7);
  override buffer: Num = new Num(1.25, 0);
  override baseBuffer: Num = new Num(1.25, 0);
  displayName: string = "Yellow Fusion Effect Increaser";
  increase: Num = new Num(1, 3);
  name: string = "yellow-fusion-effect-increaser";

  action(): Num {
    const buff: Num = this.buffer.pow(this.bought, false);
    MultiplierRecord.yellowFusionBlueLightEffect.correct(buff);
    return buff;
  }

  getDescription(): string {
    return `Increases the power of the yellow fusion effect by ${this.buffer.toString(true)}`;
  }
}
