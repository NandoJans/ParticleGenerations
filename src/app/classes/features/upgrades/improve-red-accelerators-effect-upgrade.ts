import { RedAcceleratorUpgrade } from "./red-accelerator-upgrade";
import { Num } from "../../../num";
import { HoldingRecord } from "../../records/holdings/holding-record";
import { Enhancement } from "../enhancements/enhancement";
import { EnhancementRecord } from "../../records/enhancement-record";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class ImproveRedAcceleratorsEffectUpgrade extends RedAcceleratorUpgrade {
  baseCost: Num = new Num(1, 100);
  cost: Num = new Num(1, 100);
  displayName: string = "Even Faster Acceleration";
  increase: Num = new Num(1, 20);
  override buffer: Num = new Num(3, 0);
  override baseBuffer: Num = new Num(3, 0);
  constructor(saveName: string) {
    super(saveName, "improve-red-accelerators-effect");
  }

  action(): Num | undefined {
    const effect: Num = this.buffer.pow(this.amount);
    MultiplierRecord.redAcceleratorGenerators.correct(effect);
    return effect;
  }

  getDescription(): string {
    return "Multiply RA generation by " + this.buffer.toString(2) + "x";
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
