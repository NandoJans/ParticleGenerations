import {Holding} from "../holding";
import {Num} from "../../../num";
import {HoldingDisplay} from "../../displays/holding-display";
import {HoldingDisplayFactory} from "../../factories/holding-display-factory";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {Styles} from "../../enums/styles";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {GeneratorRecord} from "../../records/generators/generator-record";

export class HydrogenHolding extends Holding {
  name: string = 'hydrogen-holding';
  displayName: string = 'Hydrogen';
  abbreviation: string = 'H';
  amount: Num = new Num(0, 0);
  startAmount: Num = new Num(0, 0);
  holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this)
    .withAmountPrefix('You have')
    .withAmountSuffix('Hydrogen')
    .withEffectPrefix('They generate')
    .withEffectSuffix('yellow fusion per second')
    .build()
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.RED, this);
  hydrogenPower: Num = new Num(2, 0);
  getStyle(): Styles {
    return Styles.HYDROGEN;
  }

barrier: Num = new Num(1, 1000);

  override action(): Num {
    if (this.amount.greq(Num.ONE)) {
      let effect = this.hydrogenPower.pow(this.amount.sub(Num.ONE).floor());
    if (effect.greq(this.barrier)) {
      const exponent = effect.log10()
      const base = this.barrier.log10();
      const thresholds = exponent.div(base);
      effect = effect.div(new Num(2, 0).pow(thresholds));
    }
      GeneratorRecord.yellowFusionGenerator.bought = new Num(1, 0);
      GeneratorRecord.yellowFusionGenerator.amount = new Num(1, 0);
      MultiplierRecord.yellowFusionGenerators.correct(effect);
      this.hydrogenPower = new Num(2, 0);
      return effect;
    } else {
      GeneratorRecord.yellowFusionGenerator.bought = new Num(0, 0);
      GeneratorRecord.yellowFusionGenerator.amount = new Num(0, 0);
      return Num.ZERO;
    }
  }

  override effectString(effect: Num): string {
    return effect.toString();
  }
}
