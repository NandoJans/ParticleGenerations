import {GreenEnhancement} from './green-enhancement';
import {UpgradeRecord} from '../../records/upgrades/upgrade-record';
import {GeneratorRecord} from '../../records/generators/generator-record';
import {Num} from '../../../num';
import {ChallengeRecord} from '../../records/challenges/challenge-record';

describe('GreenEnhancement', () => {
  it('uses one key and doubles yellow upgrade and generator power', () => {
    const enhancement = new GreenEnhancement('green-test');
    const upgrade = UpgradeRecord.yellowPower;
    const generator = GeneratorRecord.firstYellowGenerator;
    const challenge = ChallengeRecord.proximaCentauriStar;

    upgrade.unlocked = true;
    generator.unlocked = true;
    challenge.unlocked = true;
    upgrade.buffer = new Num(0.2, 0);
    generator.baseMulMod = Num.ONE;
    challenge.buffer = new Num(3, 0);
    enhancement.add(upgrade);
    enhancement.add(generator);
    enhancement.add(challenge);

    enhancement.run();

    expect(upgrade.buffer.toNumber()).toBeCloseTo(0.4);
    expect(generator.baseMulMod.toNumber()).toBe(2);
    expect(challenge.buffer.toNumber()).toBe(6);
    expect(enhancement.getRequirement().equals(Num.ONE)).toBeTrue();
  });
});
