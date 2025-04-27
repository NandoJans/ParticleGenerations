import {RedAcceleratorUpgrade} from "./red-accelerator-upgrade";
import {Num} from "../../../num";
import {GeneratorRecord} from "../../records/generators/generator-record";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";

export class ImproveRedParticlesToAcceleratorsUpgrade extends RedAcceleratorUpgrade {
  baseCost: Num = new Num(1, 100);
  cost: Num = new Num(1, 100);
  displayName: string = "Better Particle Effect";
  increase: Num = new Num(1, 15);
  override buffer: Num = new Num(0.95, 0);
  override baseBuffer: Num = new Num(0.95, 0);
  name: string = "improve-red-particles-to-accelerators-upgrade";
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.redParticles, new Num(1, 75), this, false)
  ];

  action(): Num | undefined {
    const effect: Num = this.buffer.pow(this.bought, false);
    GeneratorRecord.redAcceleratorGenerator.logEffect = (new Num(1, 1)).mul(effect, false);
    return effect;
  }

  getDescription(): string {
    const holdingEffect: string = GeneratorRecord.redAcceleratorGenerator.logEffect.toString(true);
    const nextEffect: string = GeneratorRecord.redAcceleratorGenerator.logEffect
      .mul(this.buffer, false)
      .toString(true);
    return "Log"+holdingEffect+"(RP) → Log"+nextEffect+"(RP).";
  }
}
