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
    .addLine('Red multiplier upgrade buffer: ', () => this.getRedEffect().toString(2) + 'x', '')
    .addLine('Yellow multiplier upgrade buffer: ', () => this.getYellowEffect().toString(2) + 'x', '')
    .addLine('Green multiplier upgrade buffer: ', () => this.getGreenEffect().toString(2) + 'x', '')
    .build();

  override action(): Num {
    const redEffect = this.getRedEffect();
    MultiplierRecord.protonRedGeneratorUpgradeBuffer.correct(redEffect);
    MultiplierRecord.protonYellowGeneratorUpgradeBuffer.correct(this.getYellowEffect());
    MultiplierRecord.protonGreenGeneratorUpgradeBuffer.correct(this.getGreenEffect());
    return redEffect;
  }

  override effectString(effect: Num): string {
    return effect.toString(3) + 'x';
  }

  getRedEffect(): Num {
    return this.getEffect(new Num(2.5, -1));
  }

  getYellowEffect(): Num {
    return this.getEffect(new Num(2, -1));
  }

  getGreenEffect(): Num {
    return this.getEffect(new Num(1.5, -1));
  }

  private getEffect(power: Num): Num {
    return this.amount.add(Num.ONE).pow(power);
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
    .addLine('Red buy multiplier upgrade buffer: ', () => this.getRedEffect().toString(3) + 'x', '')
    .addLine('Yellow buy multiplier upgrade buffer: ', () => this.getYellowEffect().toString(3) + 'x', '')
    .addLine('Green buy multiplier upgrade buffer: ', () => this.getGreenEffect().toString(3) + 'x', '')
    .build();

  override action(): Num {
    const redEffect = this.getRedEffect();
    MultiplierRecord.electronRedGeneratorUpgradeBuffer.correct(redEffect);
    MultiplierRecord.electronYellowGeneratorUpgradeBuffer.correct(this.getYellowEffect());
    MultiplierRecord.electronGreenGeneratorUpgradeBuffer.correct(this.getGreenEffect());
    return redEffect;
  }

  override effectString(effect: Num): string {
    return effect.toString(3) + 'x';
  }

  getRedEffect(): Num {
    return this.getEffect(new Num(1, -2));
  }

  getYellowEffect(): Num {
    return this.getEffect(new Num(4, -3));
  }

  getGreenEffect(): Num {
    return this.getEffect(new Num(1, -3));
  }

  private getEffect(coefficient: Num): Num {
    return Num.ONE.add(this.amount.add(Num.ONE).log10().mul(coefficient));
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
    .withEffectPrefix('They multiply red particle generators by')
    .addLine('And multiply nucleus generators by', () => this.nucleusEffect.toString(2) + 'x', '')
    .build();

  nucleusEffect: Num = new Num(1, 0);

  override action(): Num {
    const effect = this.getEffect();
    MultiplierRecord.redParticleGenerators.correct(effect);
    this.nucleusEffect = this.amount.add(Num.ONE).log10();
    MultiplierRecord.nucleusGeneration.correct(this.nucleusEffect);
    return effect;
  }

  override effectString(effect: Num): string {
    return effect.toString(3) + 'x';
  }

  getEffect(): Num {
    return new Num(1, 1).pow(this.amount.sqrt());
  }
}
