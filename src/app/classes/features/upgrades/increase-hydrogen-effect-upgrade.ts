import {Upgrade} from "../upgrade";
import {Num} from "../../../num";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {Styles} from "../../enums/styles";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Enhancement} from "../enhancements/enhancement";
import {Holding} from "../holding";
import {Requirement} from "../interfaces/requirement";

export class IncreaseHydrogenEffectUpgrade extends Upgrade {
  name: string = 'increase-hydrogen-effect-upgrade';
  displayName: string = 'Increase Hydrogen Effect';
  override buffer: Num = new Num(1.01, 0);
  override baseBuffer: Num = new Num(1.01, 0);
  override limit: Num = new Num(2.5, 1);
  getDescription(): string {
    return `Increase the effect of Hydrogen by ${this.buffer.toString(2)}x`;
  }
  type: string = 'increase-hydrogen-effect-upgrade';
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.YELLOW, this);
  style: Styles = Styles.HYDROGEN;
  action(): Num {
    const effect = this.buffer.pow(this.amount);
    HoldingRecord.hydrogen.hydrogenPower = HoldingRecord.hydrogen.hydrogenPower.mul(effect)
    return effect;
  }
  nav: string = 'yellow';
  subNav: string = 'yellowFusion';
  allowedEnhancements: Enhancement[] = [];
  enhancementString(enhancement: Enhancement): string {
    return "";
  }
  canEnhance(): boolean {
    return false;
  }
  enhance(): void {

  }
  baseCost: Num = new Num(1, 10);
  cost: Num = new Num(1, 10);
  override scaling: Num = new Num(2, 0);
  increase: Num = new Num(1, 2);
  startIncrease: Num = new Num(1, 2);
  bought: Num = new Num(0, 0);
  currency: Holding = HoldingRecord.yellowParticles;
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.yellowParticles, new Num(1, 10), this),
  ];
}
