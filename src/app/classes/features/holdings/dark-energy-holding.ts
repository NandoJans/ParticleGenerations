import {Styles} from "../../enums/styles";
import {HoldingDisplay} from "../../displays/holding-display";
import {HoldingDisplayFactory} from "../../factories/holding-display-factory";
import {Num} from "../../../num";
import {Holding} from "../holding";

export class DarkEnergyHolding extends Holding {
  name: string = 'darkEnergy';
  abbreviation: string = 'DE';
  amount: Num = new Num(0, 0);
  startAmount: Num = new Num(0, 0);
  holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this)
    .withAmountPrefix('You have')
    .withAmountSuffix('Dark Energy')
    .build();

  getStyle(): Styles {
    return Styles.GREEN;
  }
}
