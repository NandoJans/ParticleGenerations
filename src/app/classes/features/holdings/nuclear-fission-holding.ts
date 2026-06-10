import {Num} from '../../../num';
import {Holding} from '../holding';
import {HoldingDisplay} from '../../displays/holding-display';
import {HoldingDisplayFactory} from '../../factories/holding-display-factory';
import {ResetKey} from '../../enums/reset-key';
import {ResetHelper} from '../../helpers/reset-helper';
import {Styles} from '../../enums/styles';
import {NuclearConfig} from '../../config/nuclear-config';
import {MultiplierRecord} from '../../records/multipliers/multiplier-record';

export class NuclearFissionHolding extends Holding {
  name = 'nuclear-fission';
  displayName = 'Nuclear Fission';
  abbreviation = 'NF';
  amount = new Num(0, 0);
  startAmount = new Num(0, 0);
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.BLUE, this);
  holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this)
    .withAmountPrefix('The core has released')
    .withAmountSuffix(' Nuclear Fission')
    .withEffectPrefix('Red Generator Booster buy multiplier: ')
    .withEffectSuffix('')
    .build();

  override action(): Num {
    const effect = Num.ONE.add(
      this.amount.add(Num.ONE).pow(NuclearConfig.fissionBoosterPower)
    );
    MultiplierRecord.redGeneratorBoosterBuyMultiplier.correct(effect);
    return effect;
  }

  override effectString(effect: Num): string {
    return effect.toString(4) + 'x';
  }

  getStyle(): Styles {
    return Styles.NUCLEAR;
  }
}
