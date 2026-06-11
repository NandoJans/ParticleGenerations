import {Upgrade} from "../upgrade";
import {Num} from "../../../num";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {Styles} from "../../enums/styles";
import {Enhancement} from "../enhancements/enhancement";
import {Holding} from "../holding";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Requirement} from "../interfaces/requirement";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Transaction} from "../interfaces/transaction";

export class IncreaseMaxFusionBoosterAccelerationUpgrade extends Upgrade {
  name: string = 'increase-max-fusion-booster-acceleration-upgrade';
  displayName: string = 'More Fusion Boosters';
  override buffer: Num = new Num(1, 0);
  override baseBuffer: Num = new Num(1, 0);
  getDescription(): string {
    return `Increase the maximum amount of fusion boosters by ${this.buffer.toString()}.`;
  }
  type: string = 'increase-max-fusion-booster-acceleration-upgrade';
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.YELLOW, this);
  style: Styles = Styles.FUSION;
  action(): Num {
    const effect = this.buffer.mul(this.amount);
    UpgradeRecord.fusionBoosterAcceleration.limit = effect;
    return effect;
  }
  nav: string = 'yellow';
  subNav: string = 'yellowFusion';
  allowedEnhancements: Enhancement[] = [];
  enhancementString(enhancement: Enhancement): string {
    return `Gain ${this.buffer.mul(enhancement.getMultiplier()).toString()} maximum Fusion Boosters per level.`;
  }
  canEnhance(): boolean {
    return true;
  }
  enhance(): void {
    if (this.enhancement) {
      this.buffer = this.buffer.mul(this.enhancement.getMultiplier());
    }
  }
  baseCost: Num = new Num(1, 15);
  cost: Num = new Num(1, 15);
  increase: Num = new Num(1, 1);
  startIncrease: Num = new Num(1, 1);
  override scaling: Num = new Num(1, 1);
  override superScalingStart: Num = new Num(100, 0);
  override superScaling: Num = new Num(1.5, 0);
  bought: Num = new Num(0, 0);
  currency: Holding = HoldingRecord.yellowParticles;
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.yellowParticles, new Num(1, 10), this),
  ];

  override effectString(): string {
    return '+' + this.effect?.toString();
  }

}
