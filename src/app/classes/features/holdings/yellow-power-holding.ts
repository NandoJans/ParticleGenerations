import {Holding} from "../holding";
import {Num} from "../../../num";
import {HoldingDisplay} from "../../displays/holding-display";
import {HoldingDisplayFactory} from "../../factories/holding-display-factory";
import {Styles} from "../../enums/styles";
import {GlobalMultipliersService} from "../../../services/globals/global-multipliers.service";

export class YellowPowerHolding extends Holding {
  name: string = 'yellowPower';
  abbreviation: string = 'YW';
  amount: Num = new Num(1, 0);
  startAmount: Num = new Num(1, 0);
  holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this)
    .withAmountPrefix('You have')
    .withAmountSuffix('Yellow Power')
    .withEffectPrefix('They multiply red generators by')
    .build()

  override action(): Num | undefined {
    // @ts-ignore
    let buffer: Num = new Num(1, 0);
    if (this.amount.greq(new Num(1, 0))) {
      // @ts-ignore
      buffer = amount.pow(GlobalMultipliersService.get('yellowPowerPower'), false).add(new Num(1, 0), false);
    }
    GlobalMultipliersService.correct('redParticleGenerators', buffer);
    return buffer;
  }

  getStyle(): Styles {
    return Styles.YELLOW;
  }

  override effectString(effect: Num): string {
    return super.effectString(effect) + 'x';
  }
}
