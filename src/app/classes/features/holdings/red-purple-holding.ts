import {Num} from "../../../num";
import {HoldingDisplay} from "../../displays/holding-display";
import {HoldingDisplayFactory} from "../../factories/holding-display-factory";
import {Styles} from "../../enums/styles";
import {Holding} from "../holding";
import {GlobalMultipliersService} from "../../../services/globals/global-multipliers.service";
import {App} from "../../../App";
import {UpgradeService} from "../../../services/interactables/upgrade.service";
import {HoldingRecord} from "../../records/holdings/holding-record";

export class RedPurpleHolding extends Holding {
  name: string = 'redPurple';
  abbreviation: string = 'RPu';
  amount: Num = new Num(0, 0);
  startAmount: Num = new Num(0, 0);
  holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this)
    .withAmountPrefix('You have')
    .withAmountSuffix('Red Purple')
    .withEffectPrefix('')
    .withEffectSuffix('Red Particles')
    .build();

  override action(): Num | undefined {
    // @ts-ignore
    let buffer: Num = new Num(4, 0).add(amount.pow(HoldingRecord.purpleVoid.amount.log10(false), false).log(new Num(1, 1), false), false);
    buffer.mul(GlobalMultipliersService.get('purpleVoidEffect'))
    if (App.purplePhase) UpgradeService.setValue('red-generator-extension', 'buffer', buffer);
    return buffer
  }

  getStyle(): Styles {
    return Styles.PURPLE;
  }
}
