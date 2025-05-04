import {RedAcceleratorUpgrade} from "./red-accelerator-upgrade";
import {Num} from "../../../num";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Enhancement} from "../enhancements/enhancement";
import {EnhancementRecord} from "../../records/enhancement-record";

export class ImproveRedAcceleratorsEffectUpgrade extends RedAcceleratorUpgrade {
  baseCost: Num = new Num(1, 90);
  cost: Num = new Num(1, 90);
  displayName: string = "Better Acceleration";
  increase: Num = new Num(1, 5);
  override buffer: Num = new Num(1.01, 0);
  override baseBuffer: Num = new Num(1.01, 0);
  constructor(saveName: string) {
    super(saveName, "improve-red-accelerator-effect");
  }

  action(): Num | undefined {
    const effect: Num = this.buffer.pow(this.amount);
    HoldingRecord.redAccelerators.powEffect = HoldingRecord.redAccelerators.powEffect.mul(effect);
    return effect;
  }

  getDescription(): string {
    return `Raise accelerator effect by ^${this.buffer.toString(3)}`;
  }

  override effectString(): string {
    return '^' + this.effect?.toString(3);
  }

  allowedEnhancements: Enhancement[] = [
    EnhancementRecord.yellow
  ]

  override canEnhance(): boolean {
    return true;
  }

  override enhancementString(enhancement: Enhancement): string {
    return "Add " + enhancement.getAddition().mul(new Num(5, -3)).toString(3) + "^ to the buffer";
  }

  override enhance() {
    this.buffer = this.buffer.add(this.enhancement?.getAddition().mul(new Num(1, -3)) as Num)
  }
}
