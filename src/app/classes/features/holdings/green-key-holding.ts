import {Num} from '../../../num';
import {Holding} from '../holding';
import {HoldingDisplay} from '../../displays/holding-display';
import {HoldingDisplayFactory} from '../../factories/holding-display-factory';
import {ResetKey} from '../../enums/reset-key';
import {ResetHelper} from '../../helpers/reset-helper';
import {Styles} from '../../enums/styles';

export class GreenKeyHolding extends Holding {
  name = 'green-keys';
  displayName = 'Green Keys';
  abbreviation = 'GK';
  amount = new Num(0, 0);
  startAmount = new Num(0, 0);
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.BLUE, this);
  holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this)
    .withAmountPrefix('You have')
    .withAmountSuffix(' Green Keys')
    .build();

  getStyle(): Styles {
    return Styles.GREEN;
  }
}
