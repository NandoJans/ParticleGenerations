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
    return "";
  }
  canEnhance(): boolean {
    return false;
  }
  enhance(): void {

  }
  baseCost: Num = new Num(1, 15);
  cost: Num = new Num(1, 15);
  increase: Num = new Num(1, 1);
  startIncrease: Num = new Num(1, 1);
  override scaling: Num = new Num(1, 1);
  bought: Num = new Num(0, 0);
  currency: Holding = HoldingRecord.yellowParticles;
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.yellowParticles, new Num(1, 10), this),
  ];

  override effectString(): string {
    return '+' + this.effect?.toString() ?? '0';
  }

}
