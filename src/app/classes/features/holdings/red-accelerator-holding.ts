import {Holding} from "../holding";
import {Num} from "../../../num";
import {ResetKey} from "../../enums/reset-key";
import {HoldingDisplay} from "../../displays/holding-display";
import {Styles} from "../../enums/styles";
import {HoldingDisplayFactory} from "../../factories/holding-display-factory";
import {GeneratorRecord} from "../../records/generators/generator-record";
import {ResetHelper} from "../../helpers/reset-helper";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class RedAcceleratorHolding extends Holding {
  abbreviation: string = 'RA';
  amount: Num = new Num(1, 0);
  holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this)
    .withAmountPrefix('You have')
    .withAmountSuffix('Red Accelerators')
    .withEffectPrefix('They multiply red particle generators by')
    .addLine(
      'Red Particles multiply their generation by',
      () => GeneratorRecord.redAcceleratorGenerator.redParticleEffect.toString(2) + 'x',
      ''
    ).build();
  name: string = "redAccelerators";
  displayName: string = "Red Accelerator";
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.RED_EXTENSION, this);
  startAmount: Num = new Num(1, 0);
  mulEffect: Num = new Num(1, 0);
  powEffect: Num = new Num(1, 0);

  getStyle(): Styles {
    return Styles.RED
  }

  override action(): Num {
    let effect = this.amount.log(10);
    if (effect.gt(new Num(0, 0))) {
      effect = effect.pow(this.powEffect).add(new Num(1, 0));
      effect = effect.mul(this.mulEffect);
      MultiplierRecord.redParticleGenerators.correct(effect);
      this.powEffect = new Num(1, 0)
      this.mulEffect = new Num(1, 0);
      return effect
    }
    return new Num(1, 0);
  }

  override effectString(effect: Num): string {
    return effect.toString(2) + 'x';
  }
}
