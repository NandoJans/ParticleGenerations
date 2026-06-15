import {Num} from '../../../num';
import {UnlockThirdGreenGeneratorUpgrade} from './unlock-third-green-generator-upgrade';

describe('UnlockThirdGreenGeneratorUpgrade', () => {
  it('costs 1e150 green particles and can only be bought once', () => {
    const upgrade = new UnlockThirdGreenGeneratorUpgrade('testUnlockThirdGreenGenerator');

    expect(upgrade.baseCost.equals(new Num(1, 150))).toBeTrue();
    expect(upgrade.cost.equals(new Num(1, 150))).toBeTrue();
    expect(upgrade.limit?.equals(new Num(1, 0))).toBeTrue();
    expect(upgrade.oneTime).toBeTrue();
  });
});
