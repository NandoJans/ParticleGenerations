import {Num} from '../../../num';
import {App} from '../../../App';
import {Holding} from '../holding';
import {HoldingDisplay} from '../../displays/holding-display';
import {HoldingDisplayFactory} from '../../factories/holding-display-factory';
import {ResetKey} from '../../enums/reset-key';
import {ResetHelper} from '../../helpers/reset-helper';
import {Styles} from '../../enums/styles';
import {NuclearConfig} from '../../config/nuclear-config';
import {HoldingRecord} from '../../records/holdings/holding-record';

export class NuclearPotentialHolding extends Holding {
  name = 'nuclear-potential';
  displayName = 'Nuclear Potential';
  abbreviation = 'NP';
  amount = new Num(0, 0);
  startAmount = new Num(0, 0);
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.BLUE, this);
  holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this)
    .withAmountPrefix('The reactor contains')
    .withAmountSuffix(' Nuclear Potential')
    .withEffectPrefix('It generates')
    .withEffectSuffix(' Nuclear Fission per second')
    .build();

  override action(): Num {
    const generation = this.amount.mul(NuclearConfig.fissionPerPotentialPerSecond);
    HoldingRecord.nuclearFission.generate(generation.mul(App.getSpeed()));
    return generation;
  }

  override effectString(effect: Num): string {
    return effect.toString(2);
  }

  getStyle(): Styles {
    return Styles.NUCLEAR;
  }
}
