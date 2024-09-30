import { Holding } from "../holding";
import {Styles} from "../../enums/styles";
import {HoldingDisplay} from "../../displays/holding-display";
import {Num} from "../../../num";
import {HoldingDisplayFactory} from "../../factories/holding-display-factory";

export class BlueHolding extends Holding {
  name = 'blues';
  abbreviation: string = 'B';
  amount: Num = new Num(0, 0);
  startAmount: Num = new Num(0, 0);
  holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this)
    .withAmountPrefix('You have')
    .withAmountSuffix('Blues')
    .build();

  getStyle(): Styles {
    return Styles.BLUE;
  }
}
