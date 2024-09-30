import {Num} from "../../../num";
import {HoldingDisplay} from "../../displays/holding-display";
import {GlobalMultipliersService} from "../../../services/globals/global-multipliers.service";
import {App} from "../../../App";
import {Styles} from "../../enums/styles";
import {Holding} from "../holding";
import {HoldingDisplayFactory} from "../../factories/holding-display-factory";
import {HoldingRecord} from "../../records/holdings/holding-record";

export class GreenPurpleHolding extends Holding {
  name: string = 'greenPurple';
  abbreviation: string = 'GPu';
  amount: Num = new Num(0, 0);
  startAmount: Num = new Num(0, 0);
  holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this)
    .withAmountPrefix('You have')
    .withAmountSuffix('Green Purple')
    .addLine('They are boosted by ', () => HoldingRecord.purpleVoid.amount, 'Purple Void')
    .addLine('and increase the amount of green souls by', this.getEffectDisplay, '')
    .build();

  override action(): Num | undefined {
    // @ts-ignore
    let buffer: Num = new Num(1, 0).add(amount.pow(HoldingRecord.purpleVoid.amount.log10(false), false).log(new Num(2, 2), false), false)
    buffer.mul(GlobalMultipliersService.get('purpleVoidEffect'))
    if (App.purplePhase) GlobalMultipliersService.correct('greenSoulsGain', buffer);
    return buffer
  }

  getStyle(): Styles {
    return Styles.PURPLE;
  }
}
