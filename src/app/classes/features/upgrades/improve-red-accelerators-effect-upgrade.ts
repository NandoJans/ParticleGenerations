import {RedAcceleratorUpgrade} from "./red-accelerator-upgrade";
import {Num} from "../../../num";
import {HoldingRecord} from "../../records/holdings/holding-record";

export class ImproveRedAcceleratorsEffectUpgrade extends RedAcceleratorUpgrade {
  baseCost: Num = new Num(1, 90);
  cost: Num = new Num(1, 90);
  displayName: string = "Better Acceleration";
  increase: Num = new Num(1, 5);
  override buffer: Num = new Num(1.05, 0);
  override baseBuffer: Num = new Num(1.05, 0);
  constructor() {
    super("improve-red-accelerator-effect");
  }

  action(): Num | undefined {
    const effect: Num = this.buffer.pow(this.amount);
    HoldingRecord.redAccelerators.powEffect = HoldingRecord.redAccelerators.powEffect.mul(effect);
    return effect;
  }

  getDescription(): string {
    return `Raise accelerator effect by ^${this.buffer.toString(2)}`;
  }

  override effectString(): string {
    return '^' + this.effect?.toString(2);
  }
}
