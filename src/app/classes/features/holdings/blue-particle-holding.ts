import {Holding} from "../holding";
import {Num} from "../../../num";
import {ResetKey} from "../../enums/reset-key";
import {HoldingDisplay} from "../../displays/holding-display";
import {HoldingDisplayFactory} from "../../factories/holding-display-factory";
import {ResetHelper} from "../../helpers/reset-helper";
import {Styles} from "../../enums/styles";

export class BlueParticleHolding extends Holding {
  abbreviation: string = 'BP';
  amount: Num = Num.ZERO.copy();
  holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this)
    .withAmountPrefix('You have')
    .withAmountSuffix(' Blue Particles')
    .build();
  name: string = 'blue-particles';
  displayName: string = 'Blue Particles';
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.PURPLE, this);
  startAmount: Num = Num.ZERO.copy();

  getStyle(): Styles {
    return Styles.BLUE;
  }
}
