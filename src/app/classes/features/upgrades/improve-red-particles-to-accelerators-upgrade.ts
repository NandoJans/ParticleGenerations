import { RedAcceleratorUpgrade } from "./red-accelerator-upgrade";
import {Num} from "../../../num";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Enhancement} from "../enhancements/enhancement";
import {EnhancementRecord} from "../../records/enhancement-record";

export class ImproveRedParticlesToAcceleratorsUpgrade extends RedAcceleratorUpgrade {
  displayName: string = "Improve Red Particles to Accelerators";
  override baseCost: Num = new Num(1, 110);
  override cost: Num = new Num(1, 110);
  increase: Num = new Num(1, 20);
  startIncrease: Num = new Num(1, 20);
  override buffer: Num = new Num(3, 0);
  override baseBuffer: Num = new Num(3, 0);

  constructor(saveName: string) {
    super(saveName, "improve-red-particles-to-accelerators");
  }

  action(): Num {
    const effect = this.buffer.pow(this.bought);
    HoldingRecord.redAccelerators.mulEffect = HoldingRecord.redAccelerators.mulEffect.mul(effect);
    return effect;
  }

  getDescription(): string {
    return "Multiply red accelerator effect by " + this.buffer.toString(2) + "x.";
  }

  allowedEnhancements: Enhancement[] = [
    EnhancementRecord.yellow
  ];

  override canEnhance(): boolean {
    return true;
  }

  override enhancementString(enhancement: Enhancement): string {
    return "Multiply buffer by " + enhancement.getMultiplier().toString(2) + "x";
  }

  override enhance() {
    this.buffer = this.buffer.mul(this.enhancement?.getMultiplier() as Num)
  }
}
