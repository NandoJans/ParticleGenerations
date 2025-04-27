import {RedAcceleratorUpgrade} from "./red-accelerator-upgrade";
import {Num} from "../../../num";
import {HoldingRecord} from "../../records/holdings/holding-record";

export class MultiplyRedAcceleratorEffectUpgrade extends RedAcceleratorUpgrade {
  displayName: string = "Multiply Accelerator Effect";
  override baseCost: Num = new Num(1, 100);
  override cost: Num = new Num(1, 100);
  increase: Num = new Num(1, 15);
  override buffer: Num = new Num(1.5, 0);
  override baseBuffer: Num = new Num(1.5, 0);

  constructor() {
    super("multiply-red-accelerator-effect");
  }

  action(): Num {
    const effect = this.buffer.pow(this.bought);
    HoldingRecord.redAccelerators.mulEffect = HoldingRecord.redAccelerators.mulEffect.mul(effect);
    return effect;
  }

  getDescription(): string {
    return "Multiply red accelerator effect by " + this.buffer.toString(2) + "x.";
  }


}
