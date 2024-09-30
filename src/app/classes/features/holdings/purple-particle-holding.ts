import {Holding} from "../holding";
import {Num} from "../../../num";
import {HoldingDisplay} from "../../displays/holding-display";
import {Styles} from "../../enums/styles";
import {HoldingDisplayFactory} from "../../factories/holding-display-factory";

export class PurpleParticleHolding extends Holding {
  name: string = 'purpleParticles';
  abbreviation: string = 'PP';
  amount: Num = new Num(0, 0);
  startAmount: Num = new Num(0, 0);
  holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this)
    .withAmountPrefix('You have')
    .withAmountSuffix('Purple Particles')
    .build();

  getStyle(): Styles {
    return Styles.PURPLE;
  }
}

