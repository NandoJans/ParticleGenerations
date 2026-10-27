import {Num} from "src/app/num";
import {ResetKey} from "../../enums/reset-key";
import {Styles} from "../../enums/styles";
import {ResetHelper} from "../../helpers/reset-helper";
import {Enhancement} from "../enhancements/enhancement";
import {Holding} from "../holding";
import {Requirement} from "../interfaces/requirement";
import {Upgrade} from "../upgrade";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {StatsService} from "../../../services/stats.service";
import {Transaction} from "../interfaces/transaction";

export abstract class YellowUpgrade extends Upgrade {
  static readonly purchaseStat = 'yellow-one-time-upgrades';

  override buy(amount?: Num): Transaction {
    const transaction = super.buy(amount);
    if (this.limit?.equals(Num.ONE) && transaction.amount.gt(Num.ZERO)) {
      StatsService.addNum(YellowUpgrade.purchaseStat, 'totalBought', transaction.amount);
    }
    return transaction;
  }
  type: string = "yellow-upgrade";
  resetId: ResetKey;
  name: string;
  requirement: Requirement[];

  protected constructor(saveName: string, name: string, customRequirement: boolean = false) {
    super(saveName);
    this.name = name;
    if (!customRequirement) {
      this.requirement = [
        new Requirement(HoldingRecord.yellowPrestiges, new Num(1, 0), this),
      ]
    } else {
      this.requirement = []
    }
    this.resetId = ResetHelper.registerReset(ResetKey.YELLOW, this);
  }

  style: Styles = Styles.YELLOW;
  nav: string = "yellow";
  subNav: string = "yellowUpgrades";
  allowedEnhancements: Enhancement[] = [];

  enhancementString(enhancement: Enhancement): string {
      return "";
  }
  canEnhance(): boolean {
      return false;
  }
  enhance(): void {}

  increase: Num = new Num(1, 0);
  startIncrease: Num = new Num(1, 0);
  bought: Num = new Num(0, 0);
  currency: Holding = HoldingRecord.yellowParticles;
}
