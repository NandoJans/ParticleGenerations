import {Num} from "../../../num";
import {HoldingDisplay} from "../../displays/holding-display";
import {HoldingDisplayFactory} from "../../factories/holding-display-factory";
import {Styles} from "../../enums/styles";
import {Holding} from "../holding";

export class GreenHolding extends Holding {
  name: string = 'greenParticles';
  abbreviation: string = 'GP';
  amount: Num = new Num(0, 0);
  startAmount: Num = new Num(0, 0);
  holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this)
    .withAmountPrefix('You have')
    .withAmountSuffix('Green Particles')
    .build();

  getStyle(): Styles {
    return Styles.GREEN;
  }
}
