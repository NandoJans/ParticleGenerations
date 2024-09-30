import {Num} from "../../../num";
import {HoldingDisplay} from "../../displays/holding-display";
import {HoldingDisplayFactory} from "../../factories/holding-display-factory";
import {GlobalMultipliersService} from "../../../services/globals/global-multipliers.service";
import {Styles} from "../../enums/styles";
import {Holding} from "../holding";

export class YellowFusionHolding extends Holding {
  name: string = 'yellowFusion';
  abbreviation: string = 'YF';
  amount: Num = new Num(1, 0);
  startAmount: Num = new Num(1, 0);
  holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this)
    .withAmountPrefix('You have')
    .withAmountSuffix('Yellow Fusion')
    .withEffectPrefix('They multiply yellow generators by')
    .build()
  maxAmount: Num = new Num(1, 110);
  startMaxAmount: Num = new Num(1, 110);

  override action(): Num | undefined {
    // @ts-ignore
    let buffer: Num = this.amount.pow(this.maxAmount, false).add(new Num(1, 0), false);
    if (this.amount.num < 1) this.amount.num = 1;
    GlobalMultipliersService.correct('yellowParticleGenerators', buffer);
    return buffer;
  }

  getStyle(): Styles {
    return Styles.YELLOW;
  }

  override effectString(effect: Num): string {
    return super.effectString(effect) + 'x';
  }

  override reset(): void {
    super.reset();
    this.maxAmount = this.startMaxAmount.copy();
  }
}
