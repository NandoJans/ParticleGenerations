import {Holding} from "../holding";
import {Num} from "../../../num";
import {HoldingDisplay} from "../../displays/holding-display";
import { Styles } from "../../enums/styles";
import {HoldingDisplayFactory} from "../../factories/holding-display-factory";
import {SettableHolding} from "./settable-holding";

export class GreenSoulsHolding extends SettableHolding {
  name: string = 'greenSouls';
  abbreviation: string = 'GS';
  amount: Num = new Num(0, 0);
  startAmount: Num = new Num(0, 0);
  holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this)
    .withAmountPrefix('You have')
    .withAmountSuffix('Green Souls')
    .build();

  getStyle(): Styles {
    return Styles.GREEN;
  }
}
