import {Holding} from "../holding";
import {Num} from "../../../num";
import {HoldingDisplay} from "../../displays/holding-display";
import {HoldingDisplayFactory} from "../../factories/holding-display-factory";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {Styles} from "../../enums/styles";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class YellowFusionHolding extends Holding {
  name: string = 'yellow-fusion-holding';
  displayName: string = 'Yellow Fusion';
  abbreviation: string = 'YF';
  amount: Num = new Num(1, 1);
  startAmount: Num = new Num(1, 1);
  holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this)
    .withAmountPrefix('You have')
    .withAmountSuffix('Yellow Fusion')
    .withEffectPrefix('They multiply yellow generators by')
    .withEffectSuffix('')
    .build()
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.RED, this);
  fusionPower: Num = new Num(1, -1)
  getStyle(): Styles {
    return Styles.FUSION;
  }

  override action(): Num {
    const effect = this.amount.pow(this.fusionPower);
    MultiplierRecord.yellowGenerators.correct(effect);
    this.fusionPower = new Num(1, -1);
    return effect;
  }

  override effectString(effect: Num): string {
    return effect.toString(2)+'x';
  }
}
