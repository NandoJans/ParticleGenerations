import {YellowUpgrade} from "./yellow-upgrade";
import {Num} from "../../../num";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Requirement} from "../interfaces/requirement";
import {GeneratorRecord} from "../../records/generators/generator-record";

export class DecreaseRedGeneratorScalingUpgrade extends YellowUpgrade {
  displayName: string = 'Decrease Red Generator Scaling';
  constructor(name: string) {
    super(name, 'decrease-red-generator-scaling', true);
    this.requirement = [
      new Requirement(UpgradeRecord.breakYellowBarrier, new Num(1, 0), this),
    ];
  }

  override buffer: Num = new Num(0.9, 0);
  override baseBuffer: Num = new Num(0.9, 0);

  getDescription(): string {
    return "Multiply red generator cost scaling by " + this.buffer.toString(3) + "x.";
  }

  action(): Num {
    const scaling: Num = new Num(1, 1).mul(this.buffer.pow(this.amount));
    GeneratorRecord.redGenerators.forEach((generator) => {
      generator.scaling = scaling;
    });
    return scaling;
  }

  override limit: Num = new Num(1.2, 1);
  override scaling: Num = new Num(1, 1);
  override increase: Num = new Num(1, 5);
  baseCost: Num = new Num(1, 10);
  cost: Num = new Num(1, 10);
}
