import {Holding} from "../holding";
import {Num} from "../../../num";
import {HoldingDisplay} from "../../displays/holding-display";
import {HoldingDisplayFactory} from "../../factories/holding-display-factory";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {Styles} from "../../enums/styles";

export class StarKeyHolding extends Holding {
  name: string = 'star-key-holding';
  displayName: string = 'Star Key';
  abbreviation: string = 'SK';
  amount: Num = new Num(0, 0);
  startAmount: Num = new Num(0, 0);
  holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this)
    .withAmountPrefix('You have')
    .withAmountSuffix('Star Keys')
    .build()
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.YELLOW, this);
  override calculationOrder = 1200;
  getStyle(): Styles {
    return Styles.STAR_KEY;
  }
}
