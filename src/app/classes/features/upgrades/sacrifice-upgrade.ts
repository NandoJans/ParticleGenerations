import { Num } from "src/app/num";
import { ResetKey } from "../../enums/reset-key";
import { Styles } from "../../enums/styles";
import { Enhancement } from "../enhancements/enhancement";
import { Requirement } from "../interfaces/requirement";
import {Upgrade} from "../upgrade";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {ResetHelper} from "../../helpers/reset-helper";
import {Transaction} from "../interfaces/transaction";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export abstract class SacrificeUpgrade extends Upgrade {
  getDescription(): string {
    return '';
  }
  type: string = 'sacrifice-upgrade';
  resetId: ResetKey;
  style: Styles = Styles.SMALL_SUB_GREEN;

  override calculationOrder: number = 51;

  action(): undefined {
    MultiplierRecord.totalDarkEnergyGain.add(this.amount);
    return
  }

  override buy(amount?: Num): Transaction {
    return super.buy(amount);
  }

  nav: string = 'green';
  subNav: string = 'galaxyTree';
  allowedEnhancements: Enhancement[] = [];
  enhancementString(enhancement: Enhancement): string {
      return '';
  }
  canEnhance(): boolean {
      return false;
  }
  enhance(): void {

  }
  bought: Num = new Num(0, 0);
  requirement: Requirement[];
  name: string;

  override getCostString(): string {
    return this.cost.toString();
  }

  constructor(saveName: string, name: string) {
    super(saveName);
    this.name = name;
    this.requirement = [
      new Requirement(HoldingRecord.greenPrestiges, new Num(1, 0), this)
    ];
    this.resetId = ResetHelper.registerReset(ResetKey.GREEN, this);
  }
}
