import {FirstRedGenerator} from './first-red-generator';
import {Num} from '../../../num';
import {ElementCardEffects} from '../elements/blue-element';
import {MultiplierRecord} from '../../records/multipliers/multiplier-record';
import {Multiplier} from '../multiplier';
import {StrangeQuarkEffects} from '../strange-quark-effects';

describe('RedGenerator', () => {
  afterEach(() => {
    ElementCardEffects.reset();
    StrangeQuarkEffects.reset();
    MultiplierRecord.redParticleGenerators.reset();
    Multiplier.neutronMeltdownPower = Num.ONE.copy();
  });

  it('raises the entire red generator multiplier to the Helium power', () => {
    const generator = new FirstRedGenerator();
    generator.init();
    generator.bought = Num.ONE.copy();
    generator.mulMod = new Num(5, 0);
    MultiplierRecord.redParticleGenerators.num = new Num(3, 0);
    ElementCardEffects.heliumPower = new Num(2, 0);

    generator.run(Num.ZERO);

    // (2 base multiplier * 5 local modifier * 3 global multiplier) ^ 2 Helium
    expect(generator.multiplier.toNumber()).toBe(900);
  });

  it('applies the strange-quark effect to its buy multiplier', () => {
    const generator = new FirstRedGenerator();
    generator.init();
    generator.bought = new Num(3, 0);
    StrangeQuarkEffects.redGeneratorBuyMultiplier = new Num(2, 0);

    generator.run(Num.ZERO);

    // Three generators, each with a 2x base and a 2x strange-quark buy multiplier.
    expect(generator.multiplier.toNumber()).toBe(64);
  });
});
