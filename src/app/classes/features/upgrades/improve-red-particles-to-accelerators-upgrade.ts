import {RedAcceleratorUpgrade} from "./red-accelerator-upgrade";
import {Num} from "../../../num";
import {GeneratorRecord} from "../../records/generators/generator-record";

export class ImproveRedParticlesToAcceleratorsUpgrade extends RedAcceleratorUpgrade {
  baseCost: Num = new Num(1, 100);
  cost: Num = new Num(1, 100);
  displayName: string = "Better Particle Effect";
  increase: Num = new Num(1, 15);
  override buffer: Num = new Num(1.05, 0);
  override baseBuffer: Num = new Num(1.05, 0);
  constructor() {
    super("improve-red-particles-to-accelerators-effect");
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
}
