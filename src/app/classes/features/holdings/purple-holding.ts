import {Num} from "../../../num";
import {HoldingDisplay} from "../../displays/holding-display";
import {HoldingDisplayFactory} from "../../factories/holding-display-factory";
import {Styles} from "../../enums/styles";
import {Holding} from "../holding";

export class PurpleHolding extends Holding {
  name: string = 'purples';
  abbreviation: string = 'P';
  amount: Num = new Num(0, 0);
  startAmount: Num = new Num(0, 0);
  holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this)
    .withAmountPrefix('You have')
    .withAmountSuffix('Purples')
    .build();

  getStyle(): Styles {
    return Styles.PURPLE;
  }
}
