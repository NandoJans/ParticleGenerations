import {Requirement} from "../interfaces/requirement";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {GeneratorRecord} from "../../records/generators/generator-record";
import { YellowUpgrade } from "./yellow-upgrade";

export class DecreaseRedGeneratorBoosterScalingUpgrade extends YellowUpgrade {
  displayName: string = 'Decrease Red Generator Booster Scaling';
  constructor(name: string) {
    super(name, 'decrease-red-generator-booster-scaling');
    this.requirement = [
      new Requirement(UpgradeRecord.breakYellowBarrier, new Num(1, 0), this),
    ];
  }

  override buffer: Num = new Num(0.9, 0);
  override baseBuffer: Num = new Num(0.9, 0);

  getDescription(): string {
    return "Multiply red generator booster cost scaling by " + this.buffer.toString(3) + "x.";
  }

  action(): Num {
    const scaling: Num = new Num(1, 1).mul(this.buffer.pow(this.amount));
    GeneratorRecord.redGenerators.forEach((generator) => {
      generator.scaling = scaling;
    });
    return scaling;
  }

  override limit: Num = new Num(1.5, 1);
  override scaling: Num = new Num(1, 3);
  override increase: Num = new Num(1, 25);
  override startIncrease: Num = new Num(1, 25);
  baseCost: Num = new Num(1, 75);
  cost: Num = new Num(1, 75);
}
