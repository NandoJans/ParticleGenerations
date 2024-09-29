import {Holding} from "../holding";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";
import {HoldingDisplay} from "../../displays/holding-display";
import {HoldingDisplayFactory} from "../../factories/holding-display-factory";

export class RedParticleHolding extends Holding {
  name = 'redParticles';
  abbreviation = 'RP';
  amount = new Num(1, 1);
  startAmount: Num = new Num(1, 1);

  holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this)
    .withAmountPrefix('You have')
    .withAmountSuffix('Red Particles')
    .build();

  getStyle(): Styles {
    return Styles.RED;
  }
}
