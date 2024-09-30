import {Holding} from "../holding";
import {HoldingDisplay} from "../../displays/holding-display";
import {HoldingDisplayFactory} from "../../factories/holding-display-factory";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";
import {HoldingsService} from "../../../services/holdings.service";
import {GlobalMultipliersService} from "../../../services/globals/global-multipliers.service";

export class GravityHolding extends Holding {
  name = 'gravity'
  abbreviation = 'GRA'
  amount: Num = new Num(1, 0);
  startAmount: Num = new Num(1, 0);
  holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this)
    .withAmountPrefix('You have')
    .withAmountSuffix('Gravity')
    .withEffectPrefix('Purple Generators are multiplied by')
    .build()

  override action(): Num | undefined {
    if (this.amount.greq(new Num(1, 110))) {
      HoldingsService.set('gravity', new Num(1, 110));
      this.amount = new Num(1, 110);
    }
    // @ts-ignore
    let buffer: Num = amount.log10(false)
    buffer.pow(new Num(1.1, 1))
    GlobalMultipliersService.correct('purpleParticleGenerators', buffer.add(new Num(1, 0), false));
    return buffer
  }

  getStyle(): Styles {
    return Styles.PURPLE;
  }

  override effectString(effect: Num): string {
    return super.effectString(effect) + 'x';
  }
}
