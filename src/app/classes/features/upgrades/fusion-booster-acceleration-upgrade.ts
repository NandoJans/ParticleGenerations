import {Upgrade} from "../upgrade";
import {Num} from "../../../num";
import {Holding} from "../holding";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Requirement} from "../interfaces/requirement";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {Styles} from "../../enums/styles";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Transaction} from "../interfaces/transaction";
import {StatsService} from "../../../services/stats.service";
import {Enhancement} from "../enhancements/enhancement";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {ChallengeRecord} from "../../records/challenges/challenge-record";

export class FusionBoosterAccelerationUpgrade extends Upgrade {
  baseCost: Num = new Num(1, 1000);
  cost: Num = new Num(1, 1000);
  increase: Num = new Num(1, 0);
  bought: Num = new Num(0, 0);
  override limit: Num|undefined = new Num(0, 0);

  override buffer: Num = new Num(0.1, 0);
  override baseBuffer: Num = new Num(0.1, 0);
  hydrogenBuffer: Num = new Num(1.2, 0);
  totalHydrogenBuff: Num = new Num(1, 0);

  freeBuys: Num = new Num(1, 1);
  baseFreeBuys: Num = new Num(1, 1);
  currency: Holding = HoldingRecord.yellowFusion;
  displayName: string = "Fusion Booster Acceleration";
  name: string = "fusion-booster-acceleration-upgrade";
  nav: string = "yellow";
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.redParticles, new Num(1, 75), this)
  ];
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.RED, this);
  style: Styles = Styles.FUSION_SUPER;
  subNav: string = "yellowFusion";
  type: string = "boosterAccelerator";
  totalFreeBuys: Num = new Num(0, 0);
  override noMax: boolean = true;
  override resets: ResetKey = ResetKey.RED_BOOSTER_ACCELERATION;

  action(): Num {
    let completions: Num = new Num(0, 0);
    for (const challenge of ChallengeRecord.list) {
      if (challenge.isCompleted()) {
        if (challenge.completed instanceof Num) {
          completions = completions.add(challenge.completed);
        } else {
          completions = completions.add(new Num(1, 0));
        }
      }
    }
    const effect: Num = this.buffer.mul(this.amount).mul(completions);
    const effect2: Num = this.freeBuys.mul(this.amount);
    const effect3: Num = this.hydrogenBuffer.pow(this.amount);

    this.freeBuys = this.baseFreeBuys.copy();
    this.hydrogenBuffer = new Num(2, 0);
    UpgradeRecord.redGeneratorBooster.buffer = UpgradeRecord.redGeneratorBooster.buffer.add(effect);
    UpgradeRecord.redGeneratorBooster.amount = UpgradeRecord.redGeneratorBooster.amount.add(effect2);
    MultiplierRecord.hydrogenGenerators.correct(effect3);

    this.totalHydrogenBuff = effect3.copy();
    this.totalFreeBuys = effect2.copy();
    return effect;
  }

  getDescription(): string {
    return "Increase the power of red generator boosters by " + this.buffer.toString(3) +
      ", give " + this.freeBuys + " free buys and multiply hydrogen generation by " + this.hydrogenBuffer.toString(2) + 'x.';
  }

  override effectString(): string {
    return this.effect ? this.effect.toString(3) + ', ' + this.totalFreeBuys.toString() + ' free buys and ' + this.totalHydrogenBuff.toString(2) + 'x' : '';
  }

  override buy(amount: Num = new Num(1, 0)): Transaction {
    const transaction = super.buy(amount);
    StatsService.addNum(UpgradeRecord.redGeneratorBooster.name, 'totalBought', this.freeBuys);
    StatsService.addNum(UpgradeRecord.redGeneratorBooster.name, 'totalBoughtAutomator', this.freeBuys);
    HoldingRecord.hydrogen.reset();
    HoldingRecord.yellowFusion.reset();
    return transaction;
  }

  override enhancementString(enhancement:Enhancement): string {
    return "Enhance to add power increase of red generator boosters of "+enhancement.getAddition().mul(new Num(5, -3)).toString(3);
  }

  allowedEnhancements: Enhancement[] = [];
  canEnhance(): boolean {
    return true;
  }
  enhance(): void {
    const enhancement = this.enhancement?.getAddition().mul(new Num(5, -3));
    if (enhancement) {
      this.buffer = this.buffer.add(enhancement) as Num;
    }
  }
}
