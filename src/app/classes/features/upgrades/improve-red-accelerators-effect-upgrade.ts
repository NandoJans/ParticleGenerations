import {RedAcceleratorUpgrade} from "./red-accelerator-upgrade";
import {Num} from "../../../num";
import {HoldingRecord} from "../../records/holdings/holding-record";

export class ImproveRedAcceleratorsEffectUpgrade extends RedAcceleratorUpgrade {
  baseCost: Num = new Num(1, 90);
  cost: Num = new Num(1, 90);
  displayName: string = "Better Acceleration";
  increase: Num = new Num(1, 30);
  override buffer: Num = new Num(0.95, 0);
  override baseBuffer: Num = new Num(0.95, 0);
  name: string = "improve-red-accelerator-effect";

  action(): Num | undefined {
    const effect: Num = this.buffer.pow(this.bought, false);
    HoldingRecord.redAccelerators.logEffect = (new Num(1, 1)).mul(effect, false);
    return effect;
  }

  getDescription(): string {
    const holdingEffect: string = HoldingRecord.redAccelerators.logEffect.toString(true);
    const nextEffect: string = HoldingRecord.redAccelerators.logEffect
      .mul(this.buffer.pow(this.bought.add(new Num(1, 0), false), false), false)
      .toString(true);
    return "Log"+holdingEffect+"(RA) → Log"+nextEffect+"(RA).";
  }
}
