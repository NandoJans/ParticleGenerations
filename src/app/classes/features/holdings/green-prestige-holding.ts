import {Num} from "../../../num";
import {HoldingDisplay} from "../../displays/holding-display";
import {HoldingDisplayFactory} from "../../factories/holding-display-factory";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {Styles} from "../../enums/styles";
import {Holding} from "../holding";

export class GreenPrestigeHolding extends Holding {
  abbreviation: string = 'G';
  amount: Num = new Num(0, 0);
  holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this)
    .withAmountPrefix('You have')
    .withAmountSuffix(' Green Prestiges')
    .build();
  name: string = 'green-prestiges';
  displayName: string = 'Green Prestiges';
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.GREEN, this);
  startAmount: Num = new Num(0, 0);

  getStyle(): Styles {
    return Styles.GREEN;
  }
}
