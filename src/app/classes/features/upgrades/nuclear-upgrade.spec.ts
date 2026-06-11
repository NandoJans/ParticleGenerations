import {NuclearConfig} from '../../config/nuclear-config';
import {NuclearUpgrade} from './nuclear-upgrade';
import {Num} from '../../../num';


describe('NuclearUpgrade', () => {
  it('configures green generator unlock research as one-time upgrades', () => {
    const unlockConfigs = NuclearConfig.upgrades.filter(config =>
      config.target === 'unlockGreenGenerator4' || config.target === 'unlockGreenGenerator5'
    );

    expect(unlockConfigs.length).toBe(2);
    unlockConfigs.forEach(config => {
      const upgrade = new NuclearUpgrade(config);

      expect(upgrade.limit?.equals(Num.ONE)).toBeTrue();
      expect(upgrade.getDescription()).toBe(config.description);
      expect(upgrade.action()).toBeUndefined();
    });
  });
});
