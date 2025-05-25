import {RedUpgrade} from "./red-upgrade";
import {Num} from "../../../num";
import {ResetKey} from "../../enums/reset-key";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {ResetHelper} from "../../helpers/reset-helper";
import {Transaction} from "../interfaces/transaction";
import {StatsService} from "../../../services/stats.service";
import {Enhancement} from "../enhancements/enhancement";

export class RedGeneratorBoosterUpgrade extends RedUpgrade {
  cost: Num = new Num(1, 2);
  baseCost: Num = new Num(1, 2);
  override scalingStart: Num = new Num(1, 1000);
  override scaling: Num = new Num(1, 1);
  increase: Num = new Num(1, 1);
  override buffer: Num = new Num(1.025, 0);
  override baseBuffer: Num = new Num(1.025, 0);
  override unlocked: boolean = true;
  override startUnlocked: boolean = true;

  bought: Num = new Num(0, 0);
  displayName: string = "Red Generator Booster";
  name: string = "redGeneratorBooster";
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.RED_EXTENSION, this);

  action(): Num {
    const buff: Num = this.buffer
      .pow(this.amount
        .add(MultiplierRecord.freeRedGeneratorBoosters.getNum())
      );
    MultiplierRecord.redParticleGenerators.correct(buff);
    return buff;
  }

  getDescription(): string {
    return `Increases red generator production by ${this.buffer.toString(3)}x.`;
  }

  override buy(amount: Num = new Num(1, 0)): Transaction {
    const transaction = super.buy(amount);
    StatsService.addNum(this.name, 'totalBought', transaction.amount);
    StatsService.addNum(this.name, 'totalBoughtAutomator', transaction.amount);
    return transaction;
  }

  override enhance(): void {
    this.buffer = this.buffer.add(this.enhancement?.getAddition().mul(new Num(2.5, -2)) as Num)
  }

  override enhancementString(enhancement: Enhancement): string {
    return `Adds ${enhancement.getAddition().mul(new Num(2.5, -2)).toString(3)}x to red generator booster production.`;
  }
}
