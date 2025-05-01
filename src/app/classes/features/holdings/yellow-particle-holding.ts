import {Holding} from "../holding";
import {Num} from "../../../num";
import {ResetKey} from "../../enums/reset-key";
import {HoldingDisplay} from "../../displays/holding-display";
import {HoldingDisplayFactory} from "../../factories/holding-display-factory";
import {ResetHelper} from "../../helpers/reset-helper";
import {Styles} from "../../enums/styles";

export class YellowParticleHolding extends Holding {
  abbreviation: string = 'YP';
  amount: Num = new Num(0, 0);
  holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this)
    .withAmountPrefix('You have')
    .withAmountSuffix(' Yellow Particles')
    .build();
  name: string = 'yellow-particles';
  displayName: string = 'Yellow Particles';
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.YELLOW, this);
  startAmount: Num = new Num(0, 0);

  getStyle(): Styles {
    return Styles.YELLOW;
  }

}
