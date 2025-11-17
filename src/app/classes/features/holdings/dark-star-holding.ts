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
    .withEffectPrefix('Red generators: ')
    .withEffectSuffix('')
    .addLine('Yellow generators: ', () => {
      const yellowEffect = this.yellowBuffer.pow(this.amount);
      return yellowEffect.toString(2) + 'x';
    }, '')
    .addLine('Green generators: ', () => {
      const greenEffect = this.greenBuffer.pow(this.amount);
      return greenEffect.toString(2) + 'x';
    }, '')
    .build();
  name: string = 'dark-star-holding';
  displayName: string = 'Dark Stars';
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.GREEN, this);
  startAmount: Num = new Num(0, 0);
  redBuffer: Num = new Num(10, 0);      // Red gets 10x per dark star
  yellowBuffer: Num = new Num(3, 0);    // Yellow gets 3x per dark star
  greenBuffer: Num = new Num(2, 0);     // Green gets 2x per dark star

  override action(): Num {
    const redEffect = this.redBuffer.pow(this.amount);
    const yellowEffect = this.yellowBuffer.pow(this.amount);
    const greenEffect = this.greenBuffer.pow(this.amount);
    
    MultiplierRecord.redParticleGenerators.correct(redEffect);
    MultiplierRecord.yellowGenerators.correct(yellowEffect);
    MultiplierRecord.greenGenerators.correct(greenEffect);
    
    return redEffect;  // Return red effect as the primary effect
  }

  getStyle(): Styles {
    return Styles.DARK;
  }
}
