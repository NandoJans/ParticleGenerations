import { Num } from "src/app/num";
import {YellowUpgrade} from "./yellow-upgrade";
import {GeneratorRecord} from "../../records/generators/generator-record";
import {RedGenerator} from "../generators/red-generator";

export class IncreaseRedGeneratorSubMultipliersUpgrade extends YellowUpgrade {
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

  override limit: Num = new Num(1, 0);
  baseCost: Num = new Num(6, 0);
  cost: Num = new Num(6, 0);
}
