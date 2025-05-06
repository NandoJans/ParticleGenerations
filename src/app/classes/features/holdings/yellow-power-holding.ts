import {Num} from "src/app/num";
import {HoldingDisplay} from "../../displays/holding-display";
import {ResetKey} from "../../enums/reset-key";
import {Styles} from "../../enums/styles";
import {Holding} from "../holding";
import {HoldingDisplayFactory} from "../../factories/holding-display-factory";
import {ResetHelper} from "../../helpers/reset-helper";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {ChallengeRecord} from "../../records/challenges/challenge-record";

export class YellowPowerHolding extends Holding {
    name: string = 'yellow-power-holding';
    displayName: string = 'Yellow Power';
    abbreviation: string = 'YPow';
    amount: Num = new Num(1, 0);
    startAmount: Num = new Num(1, 0);
    holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this)
      .withAmountPrefix('You have')
      .withAmountSuffix('Yellow Power')
      .withEffectPrefix('They apply a multiplier of')
      .withEffectSuffix('to red generators')
      .addLine(
        'The multiplier is calculating by raising yellow power to the power of',
        () => this.yellowPower.toString(2), ''
      ).build();
    resetId: ResetKey = ResetHelper.registerReset(ResetKey.RED, this);
    yellowPower: Num = new Num(1, 0)
    getStyle(): Styles {
        return Styles.YELLOW;
    }

    override action(): Num {
      const effect = this.amount.pow(this.yellowPower);
      MultiplierRecord.redParticleGenerators.correct(effect);
      this.yellowPower = new Num(1, 0);
      return effect;
    }

  override effectString(effect: Num): string {
    return effect.toString(2)+'x';
  }
}
