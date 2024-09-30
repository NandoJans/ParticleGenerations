import {Holding} from "../holding";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";
import {HoldingDisplay} from "../../displays/holding-display";
import {HoldingDisplayFactory} from "../../factories/holding-display-factory";
import {GlobalMultipliersService} from "../../../services/globals/global-multipliers.service";

export class BlueHydrogenHolding extends Holding {
  name = 'blueHydrogen';
  abbreviation: string = 'BH';
  amount: Num = new Num(0, 0);
  startAmount: Num = new Num(0, 0);
  holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this)
    .withAmountPrefix('You have')
    .withAmountSuffix('Blue Hydrogen')
    .withEffectPrefix('Blue Light is generated')
    .withEffectSuffix('faster')
    .build();

  override action(): Num {
    // @ts-ignore
    let buffer: Num = this.amount.pow(new Num(5, 0), false).div(this.amount.mul(this.amount.log10(false), false).add(new Num(1, 0), false), false).add(new Num(1, 0), false);

    GlobalMultipliersService.correct('blueLightGenerators', buffer);

    return buffer;
  }

  getStyle(): Styles {
    return Styles.BLUE;
  }

  override effectString(effect: Num): string {
    return super.effectString(effect) + 'x';
  }
}
