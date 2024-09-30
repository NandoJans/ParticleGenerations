import {Holding} from "../holding";
import {Num} from "../../../num";
import {HoldingDisplay} from "../../displays/holding-display";
import { Styles } from "../../enums/styles";
import {HoldingDisplayFactory} from "../../factories/holding-display-factory";

export class GreenSoulsHolding extends Holding {
  name: string = 'greenSouls';
  abbreviation: string = 'GS';
  amount: Num = new Num(0, 0);
  startAmount: Num = new Num(0, 0);
  holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this)
    .withAmountPrefix('You have')
    .withAmountSuffix('Green Souls')
    .build();

  override action(): Num | undefined {
    return undefined;
  }

  getStyle(): Styles {
    return Styles.GREEN;
  }
}
