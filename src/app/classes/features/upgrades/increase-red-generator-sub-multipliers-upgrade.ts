import { Num } from "src/app/num";
import {YellowUpgrade} from "./yellow-upgrade";
import {GeneratorRecord} from "../../records/generators/generator-record";
import {RedGenerator} from "../generators/red-generator";
import {Enhancement} from "../enhancements/enhancement";

export class IncreaseRedGeneratorSubMultipliersUpgrade extends YellowUpgrade {
  private static readonly ENHANCEMENT_MULTIPLIER = new Num(10, 0);

  constructor(saveName: string) {
    super(saveName, 'increase-red-generator-sub-multipliers');
  }
  displayName: string = 'Increase Red Generator Sub Multipliers';
  override buffer: Num = new Num(1.2, 0);
  override baseBuffer: Num = new Num(1.2, 0);
  override calculationOrder: number = 1001;

  getDescription(): string {
    return "Multiply red generator sub multipliers by " + this.buffer.toString(2) + "x";
  }
  action(): undefined {
    if (this.amount.greq(new Num(1, 0))) {
      GeneratorRecord.redGenerators.forEach((generator: RedGenerator): void => {
        generator.multiplierUpgrade.buffer = generator.multiplierUpgrade.buffer.mul(this.buffer);
      });
    }
    return;
  }

  override canEnhance(): boolean {
    return true;
  }

  override enhancementString(enhancement: Enhancement): string {
    return `Multiply red generator sub multipliers by ${this.buffer.mul(IncreaseRedGeneratorSubMultipliersUpgrade.ENHANCEMENT_MULTIPLIER).toString(2)}x.`;
  }

  override enhance(): void {
    if (this.enhancement) {
      this.buffer = this.buffer.mul(IncreaseRedGeneratorSubMultipliersUpgrade.ENHANCEMENT_MULTIPLIER);
    }
  }

  override limit: Num = new Num(1, 0);
  baseCost: Num = new Num(6, 0);
  cost: Num = new Num(6, 0);
}
