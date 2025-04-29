import {RedAcceleratorUpgrade} from "./red-accelerator-upgrade";
import {Num} from "../../../num";
import {GeneratorRecord} from "../../records/generators/generator-record";
import {Enhancement} from "../enhancements/enhancement";
import {EnhancementRecord} from "../../records/enhancement-record";

export class ImproveRedParticlesToAcceleratorsUpgrade extends RedAcceleratorUpgrade {
  baseCost: Num = new Num(1, 100);
  cost: Num = new Num(1, 100);
  displayName: string = "Better Particle Effect";
  increase: Num = new Num(1, 15);
  override buffer: Num = new Num(1.01, 0);
  override baseBuffer: Num = new Num(1.01, 0);
  constructor(saveName: string) {
    super(saveName, "improve-red-particles-to-accelerators-effect");
  }

  action(): Num | undefined {
    const effect: Num = this.buffer.pow(this.bought);
    GeneratorRecord.redAcceleratorGenerator.powEffect = GeneratorRecord.redAcceleratorGenerator.powEffect.mul(effect);
    return effect;
  }

  getDescription(): string {
    return `Raise power effect by ^${this.buffer.toString(2)}`;
  }

  override effectString(): string {
    return '^' + this.effect?.toString(2);
  }

  allowedEnhancements: Enhancement[] = [
    EnhancementRecord.yellow
  ]

  override canEnhance(): boolean {
    return true;
  }

  override enhancementString(enhancement: Enhancement): string {
    return "Add " + enhancement.getAddition().mul(new Num(5, -3)).toString(2) + "^ to the buffer";
  }

  override enhance() {
    this.buffer = this.buffer.mul(this.enhancement?.getAddition().mul(new Num(5, -3)) as Num)
  }
}
