import {Holding} from "../holding";
import {Num} from "../../../num";
import {HoldingDisplay} from "../../displays/holding-display";
import {HoldingDisplayFactory} from "../../factories/holding-display-factory";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {Styles} from "../../enums/styles";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class DarkEnergyHolding extends Holding {
  abbreviation: string = 'DE';
  amount: Num = new Num(0, 0);
  holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this)
    .withAmountPrefix('You have')
    .withAmountSuffix(' Dark Energy')
    .build();
  name: string = 'dark-energy';
  displayName: string = 'Dark Energy';
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.GREEN, this);
  startAmount: Num = new Num(0, 0);

  override action(): undefined {
    this.amount = MultiplierRecord.totalDarkEnergyGain.getNum()
      .sub(MultiplierRecord.totalDarkEnergyCost.getNum());
    return;
  }

  getStyle(): Styles {
    return Styles.DARK;
  }
}
