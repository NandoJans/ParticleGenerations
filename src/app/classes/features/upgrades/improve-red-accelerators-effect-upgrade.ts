import {RedAcceleratorUpgrade} from "./red-accelerator-upgrade";
import {Num} from "../../../num";
import {HoldingRecord} from "../../records/holdings/holding-record";

export class ImproveRedAcceleratorsEffectUpgrade extends RedAcceleratorUpgrade {
  baseCost: Num = new Num(1, 90);
  cost: Num = new Num(1, 90);
  displayName: string = "Better Acceleration";
  increase: Num = new Num(1, 5);
  override buffer: Num = new Num(0.9, 0);
  override baseBuffer: Num = new Num(0.9, 0);
  constructor() {
    super("improve-red-accelerator-effect");
  }

  action(): Num | undefined {
    const effect: Num = this.buffer.pow(this.amount);
    HoldingRecord.redAccelerators.logEffect = (new Num(1, 1)).mul(effect);
    return effect;
  }

  getDescription(): string {
    const holdingEffect: string = HoldingRecord.redAccelerators.logEffect.toString(3);
    const nextEffect: string = HoldingRecord.redAccelerators.logEffect
      .mul(this.buffer)
      .toString(3);
    return "Log"+holdingEffect+"(RA) → Log"+nextEffect+"(RA).";
  }

  override effectString(): string {
    return "";
  }
}
