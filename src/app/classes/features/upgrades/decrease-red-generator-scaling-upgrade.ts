import {YellowUpgrade} from "./yellow-upgrade";
import {Num} from "../../../num";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Requirement} from "../interfaces/requirement";
import {GeneratorRecord} from "../../records/generators/generator-record";
import {Enhancement} from "../enhancements/enhancement";

export class DecreaseRedGeneratorScalingUpgrade extends YellowUpgrade {
  displayName: string = 'Decrease Red Generator Scaling';
  constructor(name: string) {
    super(name, 'decrease-red-generator-scaling', true);
    this.requirement = [];
  }

  override tryLoad(): void {
    // Lazily set requirement once UpgradeRecord is fully initialized
    if (!this.requirement || this.requirement.length === 0) {
      this.requirement = [
        new Requirement(UpgradeRecord.breakYellowBarrier, new Num(1, 0), this),
      ];
    }
    super.tryLoad();
  }

  override buffer: Num = new Num(0.95, 0);
  override baseBuffer: Num = new Num(0.95, 0);

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
  override scaling: Num = new Num(1, 3);
  override increase: Num = new Num(1, 10);
  override startIncrease: Num = new Num(1, 10);
  baseCost: Num = new Num(1, 20);
  cost: Num = new Num(1, 20);


  override canEnhance(): boolean {
    return true;
  }

  private getEnhancementPower(enhancement: Enhancement): Num {
    return enhancement.getMultiplier().mul(new Num(0.52, 0));
  }

  override enhancementString(enhancement: Enhancement): string {
    return "Enhancement reduces scaling multiplier by " + this.getEnhancementPower(enhancement).toString(3) + "x.";
  }
  override enhance() {
    if (this.enhancement) {
      this.buffer = this.buffer.div(this.getEnhancementPower(this.enhancement));
    }
  }

}
