import {Holding} from "../holding";
import {Num} from "../../../num";
import {HoldingDisplay} from "../../displays/holding-display";
import {HoldingDisplayFactory} from "../../factories/holding-display-factory";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {Styles} from "../../enums/styles";

export class BluePrestigeHolding extends Holding {
  abbreviation: string = 'B';
  amount: Num = Num.ZERO.copy();
  holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this)
    .withAmountPrefix('You have')
    .withAmountSuffix(' Blue Prestiges')
    .build();
  name: string = 'blue-prestiges';
  displayName: string = 'Blue Prestiges';
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.PURPLE, this);
  startAmount: Num = Num.ZERO.copy();

  getStyle(): Styles {
    return Styles.BLUE;
  }
}
