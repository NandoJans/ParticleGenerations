import {Num} from "../../../num";
import {HoldingDisplay} from "../../displays/holding-display";
import {GlobalMultipliersService} from "../../../services/globals/global-multipliers.service";
import {UpgradeService} from "../../../services/interactables/upgrade.service";
import {App} from "../../../App";
import {Styles} from "../../enums/styles";
import {Holding} from "../holding";
import {HoldingDisplayFactory} from "../../factories/holding-display-factory";
import {HoldingRecord} from "../../records/holdings/holding-record";

export class YellowPurpleHolding extends Holding {
  name: string = 'yellowPurple';
  abbreviation: string = 'YPu';
  amount: Num = new Num(1, 0);
  startAmount: Num = new Num(1, 0);
  holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this)
    .withAmountPrefix('You have')
    .withAmountSuffix('Yellow Purple')
    .withEffectPrefix('')
    .withEffectSuffix('Purple Particles')
    .build();

  override action(): Num | undefined {
    // @ts-ignore
    let buffer: Num = new Num(2, 0).add(amount.pow(HoldingRecord.purpleVoid.amount.log10(false), false).log(new Num(3, 2), false), false)
    buffer.mul(GlobalMultipliersService.get('purpleVoidEffect'))
    if (App.purplePhase) UpgradeService.setValue('yellow-repeatable-multiplier', 'buffer', buffer);
    return buffer
  }

  getStyle(): Styles {
    return Styles.PURPLE;
  }
}
