import {FirstRedGenerator} from './first-red-generator';
import {Num} from '../../../num';
import {ElementCardEffects} from '../elements/blue-element';
import {MultiplierRecord} from '../../records/multipliers/multiplier-record';
import {Multiplier} from '../multiplier';

describe('RedGenerator', () => {
  afterEach(() => {
    ElementCardEffects.reset();
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
});
