import {Enhancement} from './enhancement';
import {Styles} from '../../enums/styles';
import {HoldingRecord} from '../../records/holdings/holding-record';
import {ResetKey} from '../../enums/reset-key';
import {ResetHelper} from '../../helpers/reset-helper';
import {Num} from '../../../num';

export class GreenEnhancement extends Enhancement {
  style: Styles = Styles.GREEN;
  respecResetKey: ResetKey = ResetKey.YELLOW;
  name = 'green-enhancement';
  displayName = 'Green Enhancement';
  description = 'Assign a Green Key to permanently enhance an eligible yellow element.';
  actionMessage = 'Click a yellow element to enhance it.';
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.BLUE, this);

  override getHolding() {
    return HoldingRecord.greenKeys;
  }

  getRequirement(): Num {
    return Num.ONE;
  }

  canEnhance(): boolean {
    return this.getHolding().amount.greq(this.getRequirement());
  }

  getMultiplier(): Num {
    return new Num(2, 0);
  }

  getAddition(): Num {
    return new Num(2, 0);
  }

  override reset(): void {
    Object.values(this.enhancables).forEach(enhancable => {
      enhancable.enhancement = null;
    });
    this.enhancables = {};
  }

  override run(): void {
    Object.values(this.enhancables).forEach(enhancable => {
      if (enhancable.unlocked && enhancable.canEnhance()) enhancable.enhance();
    });
  }
}
