import {Upgrade} from "../upgrade";
import {Requirement} from "../interfaces/requirement";
import {Num} from "../../../num";
import {Holding} from "../holding";
import {ResetKey} from "../../enums/reset-key";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {ResetHelper} from "../../helpers/reset-helper";
import {Styles} from "../../enums/styles";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Transaction} from "../interfaces/transaction";
import {StatsService} from "../../../services/stats.service";

export class BoosterAccelerationUpgrade extends Upgrade {
  baseCost: Num = new Num(1, 5);
  bought: Num = new Num(0, 0);
  cost: Num = new Num(1, 5);
  increase: Num = new Num(1, 1);
  override scaling = new Num(2, 1);
  override scalingStart: Num = new Num(1, 10);

  override buffer: Num = new Num(0.025, 0);
  override baseBuffer: Num = new Num(0.025, 0);

  freeBuys: Num = new Num(1, 1);
  baseFreeBuys: Num = new Num(1, 1);
  currency: Holding = HoldingRecord.redAccelerators;
  displayName: string = "Booster Acceleration";
  name: string = "booster-acceleration-upgrade";
  nav: string = "red";
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.redParticles, new Num(1, 75), this)
  ];
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.RED, this);
  style: Styles = Styles.RED_SUPER;
  subNav: string = "accelerators";
  type: string = "boosterAccelerator";
  totalFreeBuys: Num = new Num(0, 0);
  override noMax: boolean = true;
  override resets: ResetKey = ResetKey.RED_BOOSTER_ACCELERATION;

  action(): Num {
    const effect: Num = this.buffer.mul(this.amount, false);
    const effect2: Num = this.freeBuys.mul(this.amount, false);
    this.freeBuys = this.baseFreeBuys.copy();

    UpgradeRecord.redGeneratorBooster.buffer.add(effect);
    UpgradeRecord.redGeneratorBooster.amount.add(effect2);

    this.totalFreeBuys = effect2.copy();
    return effect;
  }

  getDescription(): string {
    return "Increase the power of red generator boosters by " + this.buffer.toString(2) +
      " and give " + this.freeBuys.toString(2) +
      " free buys. Resets all red particles and red accelerators.";
  }

  override effectString(): string {
    return this.effect ? this.effect.toString(2) + ' and ' + this.totalFreeBuys.toString() + ' free buys' : '';
  }

  override buy(amount: Num = new Num(1, 0)): Transaction {
    const transaction = super.buy(amount);
    StatsService.addNum(UpgradeRecord.redGeneratorBooster.name, 'totalBought', this.freeBuys);
    return transaction;
  }
}
