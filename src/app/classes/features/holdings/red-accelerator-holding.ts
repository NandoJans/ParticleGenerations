import {Holding} from "../holding";
import {Num} from "../../../num";
import {ResetKey} from "../../enums/reset-key";
import {HoldingDisplay} from "../../displays/holding-display";
import {Styles} from "../../enums/styles";
import {HoldingDisplayFactory} from "../../factories/holding-display-factory";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {GeneratorRecord} from "../../records/generators/generator-record";
import {ResetHelper} from "../../helpers/reset-helper";

export class RedAcceleratorHolding extends Holding {
  abbreviation: string = 'RA';
  amount: Num = new Num(1, 0);
  holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this)
    .withAmountPrefix('You have')
    .withAmountSuffix('Red Accelerators')
    .withEffectPrefix('They multiply red particle generators by')
    .addLine(
      'Red Particles multiply their generation by',
      () => GeneratorRecord.redAcceleratorGenerator.redParticleEffect.toString(true) + 'x',
      ''
    ).build();
  name: string = "Red Accelerator";
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.RED_EXTENSION, this);
  startAmount: Num = new Num(1, 0);
  logEffect: Num = new Num(1, 1);

  getStyle(): Styles {
    return Styles.RED
  }

  override action(): Num {
    const effect = this.amount.log(this.logEffect, false).add(new Num(1, 0), false);
    MultiplierRecord.redParticleGenerators.correct(effect)
    this.logEffect = new Num(1, 1)
    return effect
  }

  override effectString(effect: Num): string {
    return effect.toString(true) + 'x';
  }

}
