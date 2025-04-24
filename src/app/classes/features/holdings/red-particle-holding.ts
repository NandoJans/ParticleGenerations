import {Holding} from "../holding";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";
import {HoldingDisplay} from "../../displays/holding-display";
import {HoldingDisplayFactory} from "../../factories/holding-display-factory";
import {ResetHelper} from "../../helpers/reset-helper";
import {ResetKey} from "../../enums/reset-key";

export class RedParticleHolding extends Holding {
  name = 'redParticles';
  abbreviation = 'RP';
  amount = new Num(1, 1);
  startAmount: Num = new Num(1, 1);
  resetId = ResetHelper.registerReset(ResetKey.RED_EXTENSION, this);

  holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this)
    .withAmountPrefix('You have')
    .withAmountSuffix('Red Particles')
    .build();

  getStyle(): Styles {
    return Styles.RED;
  }
}
