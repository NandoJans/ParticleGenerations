import {Num} from "../../../num";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {YellowUpgrade} from "./yellow-upgrade";
import {Enhancement} from "../enhancements/enhancement";

export class MultiplyYellowParticlesYellowUpgrade extends YellowUpgrade {
  constructor(saveName: string) {
    super(saveName, 'multiply-yellow-particles-yellow');
  }
  displayName: string = 'Multiply Star Particles';

  override buffer: Num = new Num(2, 0);
  override baseBuffer: Num = new Num(2, 0);

  getDescription(): string {
    return "Multiply star particle gain by " + this.buffer.toString(2) + "x";
  }
  action(): Num {
    const effect: Num = this.buffer.pow(this.amount);
    MultiplierRecord.yellowParticleGain.correct(effect);
    return effect
  }

  override canEnhance(): boolean {
    return true;
  }

  private getEnhancementPower(enhancement: Enhancement): Num {
    return enhancement.getMultiplier().mul(new Num(7.5, -1));
  }

  override enhancementString(enhancement: Enhancement): string {
    return "Make the multiplier " + this.getEnhancementPower(enhancement).toString(2) + "x stronger.";
  }

  override enhance() {
    if (this.enhancement) {
      this.buffer = this.buffer.mul(this.getEnhancementPower(this.enhancement));
    }
  }

  override oneTime: boolean = false;
  baseCost: Num = new Num(2, 0);
  override increase: Num = new Num(1, 1);
  override startIncrease: Num = new Num(1, 1);
  cost: Num = new Num(2, 0);
}
