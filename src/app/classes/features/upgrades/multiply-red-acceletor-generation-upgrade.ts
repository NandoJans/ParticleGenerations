import {RedAcceleratorUpgrade} from "./red-accelerator-upgrade";
import {Num} from "../../../num";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {Enhancement} from "../enhancements/enhancement";
import {EnhancementRecord} from "../../records/enhancement-record";

export class MultiplyRedAcceletorGenerationUpgrade extends RedAcceleratorUpgrade {
  baseCost: Num = new Num(1, 80);
  cost: Num = new Num(1, 80);
  displayName: string = "Faster Acceleration";
  increase: Num = new Num(1, 10);
  startIncrease: Num = new Num(1, 10);
  override buffer: Num = new Num(2, 0);
  override baseBuffer: Num = new Num(2, 0);
  constructor(saveName: string) {
    super(saveName, "multiple-red-accelerator-generation");
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
