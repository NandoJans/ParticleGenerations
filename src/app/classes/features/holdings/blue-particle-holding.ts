import {Holding} from "../holding";
import {Num} from "../../../num";
import {HoldingDisplay} from "../../displays/holding-display";
import {Styles} from "../../enums/styles";
import {HoldingDisplayFactory} from "../../factories/holding-display-factory";

export class BlueParticleHolding extends Holding {
  name = 'blueParticles';
  abbreviation: string = 'BP';
  amount: Num = new Num(0, 0);
  startAmount: Num = new Num(0, 0);
  holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this)
    .withAmountPrefix('You have')
    .withAmountSuffix('Blue Particles')
    .build();

  getStyle(): Styles {
    return Styles.BLUE;
  }

}
