import {Holding} from "../holding";
import {Num} from "../../../num";
import {ResetKey} from "../../enums/reset-key";
import {HoldingDisplay} from "../../displays/holding-display";
import {HoldingDisplayFactory} from "../../factories/holding-display-factory";
import {ResetHelper} from "../../helpers/reset-helper";
import {Styles} from "../../enums/styles";

export class GreenParticleHolding extends Holding {
  abbreviation: string = 'GP';
  amount: Num = new Num(0, 0);
  holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this)
    .withAmountPrefix('You have')
    .withAmountSuffix(' Green Particles')
    .build();
  name: string = 'green-particles';
  displayName: string = 'Green Particles';
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.GREEN, this);
  startAmount: Num = new Num(0, 0);

  getStyle(): Styles {
    return Styles.GREEN;
  }
}
