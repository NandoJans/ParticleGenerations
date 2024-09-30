import {Num} from "../../../num";
import {HoldingDisplay} from "../../displays/holding-display";
import {HoldingDisplayFactory} from "../../factories/holding-display-factory";
import {Styles} from "../../enums/styles";
import {Holding} from "../holding";

export class PurpleVoidHolding extends Holding {
  name: string = 'purpleVoid';
  abbreviation: string = 'PV';
  amount: Num = new Num(0, 0);
  startAmount: Num = new Num(0, 0);
  holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this)
    .withAmountPrefix('You have')
    .withAmountSuffix('Purple Void')
    .build();

  getStyle(): Styles {
    return Styles.PURPLE;
  }
}
