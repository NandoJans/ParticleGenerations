import { Num } from "src/app/num";
import {YellowUpgrade} from "./yellow-upgrade";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {Transaction} from "../interfaces/transaction";
import {Enhancement} from "../enhancements/enhancement";

export class MultiplyRedGeneratorsYellowUpgrade extends YellowUpgrade {
  constructor(saveName: string) {
      super(saveName, 'multiply-red-generators-yellow');
  }
  displayName: string = 'Multiply Red Generators';

  override buffer: Num = new Num(2, 0);
  override baseBuffer: Num = new Num(2, 0);

  getDescription(): string {
      return "Multiply red generators by " + this.buffer.toString(2) + "x";
  }
  action(): Num|undefined {
    const effect: Num = this.buffer.pow(this.amount);
    MultiplierRecord.redParticleGenerators.correct(effect);
    return effect
  }

  override canEnhance(): boolean {
    return true;
  }

  private getEnhancementPower(enhancement: Enhancement): Num {
    return enhancement.getMultiplier().mul(new Num(5, 0));
  }

  override enhancementString(enhancement: Enhancement): string {
    return "Make the multiplier " + this.getEnhancementPower(enhancement) + "x";
  }

  override enhance() {
    if (this.enhancement) {
      this.buffer = this.buffer.mul(this.getEnhancementPower(this.enhancement));
    }
  }

  override oneTime: boolean = false;
  baseCost: Num = new Num(1, 0);
  override increase: Num = new Num(2, 0);
  override startIncrease: Num = new Num(2, 0);
  cost: Num = new Num(1, 0);

}
