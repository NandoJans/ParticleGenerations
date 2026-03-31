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
  startIncrease: Num = new Num(1, 0);
  bought: Num = new Num(0, 0);
  override limit: Num|undefined = new Num(0, 0);

  override buffer: Num = new Num(0.1, 0);
  override baseBuffer: Num = new Num(0.1, 0);
  hydrogenBuffer: Num = new Num(1, 0);
  totalHydrogenBuff: Num = new Num(1, 0);

  freeBuys: Num = new Num(1, 1);
  baseFreeBuys: Num = new Num(1, 1);
  currency: Holding = HoldingRecord.yellowFusion;
  displayName: string = "Fusion Booster Acceleration";
  name: string = "fusion-booster-acceleration-upgrade";
  nav: string = "yellow";
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.yellowParticles, new Num(1, 10), this)
  ];
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.RED, this);
  style: Styles = Styles.FUSION_SUPER;
  subNav: string = "yellowFusion";
  type: string = "boosterAccelerator";
  totalFreeBuys: Num = new Num(0, 0);
  override noMax: boolean = true;
  override resets: ResetKey = ResetKey.RED_BOOSTER_ACCELERATION;

  action(): Num {
    const effect: Num = this.buffer.mul(this.amount);
    const effect2: Num = this.freeBuys.mul(this.amount);
    const effect3: Num = this.hydrogenBuffer.pow(this.amount);

    this.freeBuys = this.baseFreeBuys.copy();
    this.hydrogenBuffer = new Num(1.2, 0);
    UpgradeRecord.redGeneratorBooster.buffer = UpgradeRecord.redGeneratorBooster.buffer.add(effect);
    UpgradeRecord.redGeneratorBooster.amount = UpgradeRecord.redGeneratorBooster.amount.add(effect2);

    if (HoldingRecord.yellowFusion.amount.lt(new Num(1, 1000))) {
      MultiplierRecord.hydrogenGenerators.correct(effect3);
    }

    this.totalHydrogenBuff = effect3.copy();
    this.totalFreeBuys = effect2.copy();
    return effect;
  }

  override postAction() {
    let completions: Num = new Num(0, 0);
    for (const challenge of ChallengeRecord.list) {
      if (challenge.completed instanceof Num) {
        completions = completions.add(challenge.completed);
      } else if (challenge.completed) {
        completions = completions.add(new Num(1, 0));
      }
    }
    this.buffer = this.buffer.mul(completions)
  }

  getDescription(): string {
    return "Increase the power of red generator boosters by " + this.buffer.toString(3) +
      ", give " + this.freeBuys + " free buys and multiply hydrogen generation by " + this.hydrogenBuffer.toString(2) + 'x.';
  }

  override effectString(): string {
    return this.effect ? this.effect.toString(3) + ', ' + this.totalFreeBuys.toString() + ' free buys and ' + this.totalHydrogenBuff.toString(2) + 'x' : '';
  }

  divideInsteadOfReset: boolean = false;

  override buy(amount: Num = new Num(1, 0)): Transaction {
    // If the fusion booster acceleration upgrade does not reset anything anymore, we check if more can be bought.
    // We do this by calculating the amount that can be bought by doing n = log10(yellow fusion) / 1000
    if (this.resets === ResetKey.NONE) {
      amount = HoldingRecord.yellowFusion.amount.log10().div(new Num(1, 3)).floor();
    }

    const transaction = super.buy(amount);
    StatsService.addNum(UpgradeRecord.redGeneratorBooster.name, 'totalBought', this.freeBuys);
    StatsService.addNum(UpgradeRecord.redGeneratorBooster.name, 'totalBoughtAutomator', this.freeBuys);
    StatsService.addNum(this.name, 'totalBought', transaction.amount);
    StatsService.addNum(this.name, 'totalBoughtAutomator', transaction.amount);
    if (this.divideInsteadOfReset) {
      HoldingRecord.yellowFusion.amount = HoldingRecord.yellowFusion.amount.div((new Num(1, 1000)).pow(transaction.amount));
      HoldingRecord.hydrogen.amount = HoldingRecord.hydrogen.amount.sub((new Num(3, 3)).mul(transaction.amount));
      if (HoldingRecord.hydrogen.amount.lte(HoldingRecord.hydrogen.startAmount)) {
        HoldingRecord.hydrogen.amount = HoldingRecord.hydrogen.startAmount.copy();
      }
    } else {
      HoldingRecord.hydrogen.reset();
      HoldingRecord.yellowFusion.reset();
    }
    return transaction;
  }

  override enhancementString(enhancement:Enhancement): string {
    return "Enhance to add power increase of red generator boosters of "+enhancement.getAddition().mul(new Num(5, -3)).toString(3);
  }

  allowedEnhancements: Enhancement[] = [];
  canEnhance(): boolean {
    return false;
  }
  enhance(): void {

  }
}
