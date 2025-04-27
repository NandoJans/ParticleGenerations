import {RedAcceleratorUpgrade} from "./red-accelerator-upgrade";
import {Num} from "../../../num";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";

export class MultiplyRedAcceletorGenerationUpgrade extends RedAcceleratorUpgrade {
  baseCost: Num = new Num(1, 80);
  cost: Num = new Num(1, 80);
  displayName: string = "Faster Acceleration";
  increase: Num = new Num(1, 10);
  override buffer: Num = new Num(2, 0);
  override baseBuffer: Num = new Num(2, 0);
  name: string = "multiple-red-accelerator-generation";
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.redParticles, new Num(1, 75), this, false)
  ];

  action(): Num | undefined {
    const effect: Num = this.buffer.pow(this.amount, false);
    MultiplierRecord.redAcceleratorGenerators.correct(effect);
    return effect;
  }

  getDescription(): string {
    return "Multiply RA generation by " + this.buffer.toString(true) + "x";
  }
}
