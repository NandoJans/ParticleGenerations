import {Holding} from "../holding";
import {HoldingDisplay} from "../../displays/holding-display";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";
import {HoldingDisplayFactory} from "../../factories/holding-display-factory";

export class GreenParticleHolding extends Holding {
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
