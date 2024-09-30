import {Holding} from "../holding";
import {Styles} from "../../enums/styles";
import {Num} from "../../../num";
import {HoldingDisplay} from "../../displays/holding-display";
import {HoldingDisplayFactory} from "../../factories/holding-display-factory";

export class GreenEnergyHolding extends Holding {
  name: string = 'greenEnergy';
  abbreviation: string = 'GE';
  amount: Num = new Num(0, 0);
  startAmount: Num = new Num(0, 0);
  holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this)
    .withAmountPrefix('You have')
    .withAmountSuffix('Green Energy')
    .withEffectPrefix('It is equivalent to')
    .withEffectSuffix('Red Boosters')
    .build();

  override action(): Num | undefined {
    // @ts-ignore
    let buffer: Num = this.amount.log(new Num(0.8, 0), false).floor(false);
    return buffer.copy();
  }

  getStyle(): Styles {
    return Styles.GREEN;
  }
}
