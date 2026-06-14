import {NuclearConfig} from '../../config/nuclear-config';
import {NuclearUpgrade} from './nuclear-upgrade';
import {Num} from '../../../num';
import {MultiplierRecord} from '../../records/multipliers/multiplier-record';


describe('NuclearUpgrade', () => {
  it('starts Chain Reaction at 10 Nuclear Fission and doubles generation per level', () => {
    const config = NuclearConfig.upgrades.find(upgrade => upgrade.target === 'nuclearFissionGain');

    expect(config).toBeDefined();
    expect(config!.baseCost.equals(new Num(1, 1))).toBeTrue();

    const upgrade = new NuclearUpgrade(config!);
    upgrade.amount = new Num(3, 0);
    MultiplierRecord.nuclearFissionGain.reset();
    upgrade.action();

    expect(MultiplierRecord.nuclearFissionGain.getNum().toNumber()).toBe(8);
    MultiplierRecord.nuclearFissionGain.reset();
  });

  it('configures Reactor Yield as a repeatable Nuclear Potential gain upgrade', () => {
    const config = NuclearConfig.upgrades.find(upgrade => upgrade.target === 'nuclearPotentialGain');

    expect(config).toBeDefined();
    const upgrade = new NuclearUpgrade(config!);
    upgrade.amount = new Num(2, 0);

    expect(upgrade.limit).toBeUndefined();
    expect(upgrade.action()?.toNumber()).toBeCloseTo(2.25, 8);
    expect(upgrade.getDescription()).toContain('1.50x per level');
  });

  it('configures green generator unlock research as one-time upgrades', () => {
    const unlockConfigs = NuclearConfig.upgrades.filter(config =>
      config.target === 'unlockGreenGenerator4' || config.target === 'unlockGreenGenerator5'
    );

    expect(unlockConfigs.length).toBe(2);
    expect(unlockConfigs[0].baseCost.equals(new Num(1, 12))).toBeTrue();
    expect(unlockConfigs[1].baseCost.equals(new Num(1, 20))).toBeTrue();
    unlockConfigs.forEach(config => {
      const upgrade = new NuclearUpgrade(config);

      expect(upgrade.limit?.equals(Num.ONE)).toBeTrue();
      expect(upgrade.getDescription()).toBe(config.description);
      expect(upgrade.action()).toBeUndefined();
    });
  });

  it('configures Compact Stellar Press as a one-time 100,000 Nuclear Fission upgrade', () => {
    const config = NuclearConfig.upgrades.find(
      upgrade => upgrade.target === 'reduceStarKeyCompressionRequirement'
    );

    expect(config).toBeDefined();
    expect(config!.baseCost.equals(new Num(1, 5))).toBeTrue();

    const upgrade = new NuclearUpgrade(config!);
    expect(upgrade.limit?.equals(Num.ONE)).toBeTrue();
    expect(upgrade.getDescription()).toBe('Star-Key Compression can be started with 1,000 Yellow Keys.');
    expect(upgrade.action()).toBeUndefined();
  });
});
