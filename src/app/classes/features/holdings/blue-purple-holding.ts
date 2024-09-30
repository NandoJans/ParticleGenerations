import {Num} from "../../../num";
import {HoldingDisplay} from "../../displays/holding-display";
import {GlobalMultipliersService} from "../../../services/globals/global-multipliers.service";
import {UpgradeService} from "../../../services/interactables/upgrade.service";
import {App} from "../../../App";
import {Styles} from "../../enums/styles";
import {Holding} from "../holding";
import {HoldingDisplayFactory} from "../../factories/holding-display-factory";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {HoldingsService} from "../../../services/holdings.service";

export class BluePurpleHolding extends Holding {
  name: string = 'bluePurple';
  abbreviation: string = 'BPu';
  amount: Num = new Num(0, 0);
  startAmount: Num = new Num(0, 0);
  holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this)
    .withAmountPrefix('You have')
    .withAmountSuffix('Red Purple')
    .addLine('They are boosted by ', () => HoldingRecord.purpleVoid.amount, 'Purple Void')
    .addLine('and increase the buy multiplier of the blue neutron generator by', this.getEffectDisplay, '')
    .build();

  override action(): Num | undefined {
    // @ts-ignore
    let buffer: Num = new Num(1, 0).add(amount.pow(HoldingRecord.purpleVoid.amount.log10(false), false).log(new Num(1, 1), false), false)
    buffer.mul(GlobalMultipliersService.get('purpleVoidEffect'))
    if (App.purplePhase) GlobalMultipliersService.correct('blueNeutronGenerators', buffer);
    return buffer
  }

  getStyle(): Styles {
    return Styles.PURPLE;
  }

  override effectString(effect: Num): string {
    return super.effectString(effect) + 'x';
  }
}
