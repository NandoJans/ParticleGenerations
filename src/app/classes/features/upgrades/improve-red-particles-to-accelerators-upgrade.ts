import {RedAcceleratorUpgrade} from "./red-accelerator-upgrade";
import {Num} from "../../../num";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {GeneratorRecord} from "../../records/generators/generator-record";

export class ImproveRedParticlesToAcceleratorsUpgrade extends RedAcceleratorUpgrade {
  baseCost: Num = new Num(1, 100);
  cost: Num = new Num(1, 100);
  displayName: string = "Better Acceleration";
  increase: Num = new Num(1, 40);
  override buffer: Num = new Num(0.95, 0);
  override baseBuffer: Num = new Num(0.95, 0);
  name: string = "improve-red-accelerator-effect";

  action(): Num | undefined {
    const effect: Num = this.buffer.pow(this.bought, false);
    GeneratorRecord.redAcceleratorGenerator.logEffect = (new Num(1, 1)).mul(effect, false);
    return effect;
  }

  getDescription(): string {
    const holdingEffect: string = GeneratorRecord.redAcceleratorGenerator.logEffect.toString(true);
    const nextEffect: string = GeneratorRecord.redAcceleratorGenerator.logEffect
      .mul(this.buffer.pow(this.bought.add(new Num(1, 0), false), false), false)
      .toString(true);
    return "Log"+holdingEffect+"(RP) → Log"+nextEffect+"(RP).";
  }
}
