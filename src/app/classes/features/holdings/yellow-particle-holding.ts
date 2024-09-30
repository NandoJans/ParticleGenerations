import {Holding} from "../holding";
import {Num} from "../../../num";
import {HoldingDisplay} from "../../displays/holding-display";
import {HoldingDisplayFactory} from "../../factories/holding-display-factory";
import {Styles} from "../../enums/styles";

export class YellowParticleHolding extends Holding {
  name: string = 'yellowParticles';
  abbreviation: string = 'YP';
  amount: Num = new Num(0, 0);
  startAmount: Num = new Num(0, 0);
  holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this)
    .withAmountPrefix('You have')
    .withAmountSuffix('Yellow Particles')
    .build();

  getStyle(): Styles {
    return Styles.YELLOW;
  }

}
