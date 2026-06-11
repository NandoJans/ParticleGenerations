import {Num} from '../../../num';
import {Holding} from '../holding';
import {HoldingDisplay} from '../../displays/holding-display';
import {HoldingDisplayFactory} from '../../factories/holding-display-factory';
import {ResetKey} from '../../enums/reset-key';
import {ResetHelper} from '../../helpers/reset-helper';
import {Styles} from '../../enums/styles';
import {MultiplierRecord} from '../../records/multipliers/multiplier-record';

abstract class BlueHolding extends Holding {
  amount = Num.ZERO.copy();
  startAmount = Num.ZERO.copy();

  getStyle(): Styles {
    return Styles.BLUE;
  }
}

export class ProtonHolding extends BlueHolding {
  name = 'protons';
  displayName = 'Protons';
  abbreviation = 'p+';
  resetId = ResetHelper.registerReset(ResetKey.BLUE, this);
  holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this)
    .withAmountPrefix('You have')
    .withAmountSuffix(' Protons')
    .withEffectPrefix('Red Generator production: ')
    .build();

  override action(): Num {
    const effect = Num.ONE.add(this.amount.add(Num.ONE).log10());
    MultiplierRecord.redParticleGenerators.correct(effect);
    return effect;
  }

  override effectString(effect: Num): string {
    return effect.toString(3) + 'x';
  }
}

export class ElectronHolding extends BlueHolding {
  name = 'electrons';
  displayName = 'Electrons';
  abbreviation = 'e-';
  resetId = ResetHelper.registerReset(ResetKey.BLUE, this);
  holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this)
    .withAmountPrefix('You have')
    .withAmountSuffix(' Electrons')
    .withEffectPrefix('Red Accelerator production: ')
    .build();

  override action(): Num {
    const effect = Num.ONE.add(this.amount.add(Num.ONE).log10());
    MultiplierRecord.redAcceleratorGenerators.correct(effect);
    return effect;
  }

  override effectString(effect: Num): string {
    return effect.toString(3) + 'x';
  }
}

export class NeutronHolding extends BlueHolding {
  name = 'neutrons';
  displayName = 'Neutrons';
  abbreviation = 'n';
  resetId = ResetHelper.registerReset(ResetKey.PURPLE, this);
  holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this)
    .withAmountPrefix('You have')
    .withAmountSuffix(' Neutrons')
    .build();
}

export class NeutronClumpHolding extends BlueHolding {
  name = 'neutron-clump';
  displayName = 'Neutron Clump';
  abbreviation = 'NC';
  resetId = ResetHelper.registerReset(ResetKey.PURPLE, this);
  holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this)
    .withAmountPrefix('The clump contains')
    .withAmountSuffix(' Neutrons')
    .build();
}

export class LithiumHolding extends BlueHolding {
  name = 'lithium';
  displayName = 'Lithium';
  abbreviation = 'Li';
  resetId = ResetHelper.registerReset(ResetKey.PURPLE, this);
  holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this)
    .withAmountPrefix('The neutron clump has forged')
    .withAmountSuffix(' Lithium')
    .withEffectPrefix('Green Generator production: ')
    .build();

  override action(): Num {
    const effect = Num.ONE.add(this.amount.sqrt().mul(new Num(5, -2)));
    MultiplierRecord.greenGenerators.correct(effect);
    return effect;
  }

  override effectString(effect: Num): string {
    return effect.toString(3) + 'x';
  }
}
