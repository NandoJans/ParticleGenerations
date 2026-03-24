import {Holding} from "../holding";
import {Num} from "../../../num";
import {HoldingDisplay} from "../../displays/holding-display";
import {HoldingDisplayFactory} from "../../factories/holding-display-factory";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {Styles} from "../../enums/styles";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class DarkMatterHolding extends Holding {
  abbreviation: string = 'DM';
  amount: Num = new Num(0, 0);
  holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this)
    .withAmountPrefix('You have')
    .withAmountSuffix(' Dark Matter')
    .withEffectPrefix('They are equal to')
    .withEffectSuffix(' Red Generator Boosters')
    .build();
  name: string = 'dark-energy';
  displayName: string = 'Dark Energy';
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.YELLOW, this);
  startAmount: Num = new Num(0, 0);

  override action(): Num {
    const effect = this.amount.log(1.15).floor();
    MultiplierRecord.freeRedGeneratorBoosters.add(effect);
    return effect;
  }

  getStyle(): Styles {
    return Styles.GREEN;
  }
}
