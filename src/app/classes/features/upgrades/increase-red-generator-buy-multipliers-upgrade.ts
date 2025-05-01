import {YellowUpgrade} from "./yellow-upgrade";
import {GeneratorRecord} from "../../records/generators/generator-record";
import {RedGenerator} from "../generators/red-generator";
import {Num} from "../../../num";

export class IncreaseRedGeneratorBuyMultipliersUpgrade extends YellowUpgrade {
  constructor(saveName: string) {
    super(saveName, 'increase-red-generator-buy-multipliers');
  }
  displayName: string = 'Increase Red Generator Buy Multipliers';

  override buffer: Num = new Num(0.01, 0);
  override baseBuffer: Num = new Num(0.01, 0);
  override calculationOrder: number = 1001;

  getDescription(): string {
    return "Increase red generator buy multipliers by " + this.buffer.toString(2);
  }
  action(): undefined {
    if (this.amount.greq(new Num(1, 0))) {
      GeneratorRecord.redGenerators.forEach((generator: RedGenerator): void => {
        if (generator.multiplierUpgrade.hasBought()) {
          generator.buyMultiplierUpgrade.buffer = generator.buyMultiplierUpgrade.buffer.add(this.buffer);
        }
      });
    }
    return;
  }

  override limit: Num = new Num(1, 0);
  baseCost: Num = new Num(7, 0);
  cost: Num = new Num(7, 0);
}
