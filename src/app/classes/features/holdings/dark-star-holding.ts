import {Holding} from "../holding";
import {Num} from "../../../num";
import {HoldingDisplay} from "../../displays/holding-display";
import {HoldingDisplayFactory} from "../../factories/holding-display-factory";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {Styles} from "../../enums/styles";

export class DarkStarHolding extends Holding {
  abbreviation: string = 'DS';
  amount: Num = new Num(0, 0);
  holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this)
    .withAmountPrefix('You have')
    .withAmountSuffix(' Dark Stars')
    .withEffectPrefix('They multiply all generators by')
    .withEffectSuffix('')
    .addLine('By raising ', () => {
      return this.buffer.toString(2)
    }, ' to themselves')
    .build();
  name: string = 'dark-star-holding';
  displayName: string = 'Dark Stars';
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.YELLOW, this);
  startAmount: Num = new Num(0, 0);
  buffer: Num = new Num(2, 0);

  override action(): Num {
    const effect = this.buffer.pow(this.amount);
    MultiplierRecord.redParticleGenerators.correct(effect);
    MultiplierRecord.yellowGenerators.correct(effect);
    MultiplierRecord.greenGenerators.correct(effect);
    return effect;
  }

  getStyle(): Styles {
    return Styles.DARK;
  }
}
