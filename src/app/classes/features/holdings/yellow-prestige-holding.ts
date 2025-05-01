import {Holding} from "../holding";
import {Num} from "../../../num";
import {HoldingDisplay} from "../../displays/holding-display";
import {HoldingDisplayFactory} from "../../factories/holding-display-factory";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {Styles} from "../../enums/styles";

export class YellowPrestigeHolding extends Holding {
  abbreviation: string = 'Y';
  amount: Num = new Num(0, 0);
  holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this)
    .withAmountPrefix('You have')
    .withAmountSuffix(' Yellow Prestiges')
    .build();
  name: string = 'yellow-prestige';
  displayName: string = 'Yellow Prestige';
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.YELLOW, this);
  startAmount: Num = new Num(0, 0);

  getStyle(): Styles {
    return Styles.YELLOW;
  }
}
