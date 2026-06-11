import { YellowPowerUpgrade } from './yellow-power-upgrade';
import {Num} from '../../../num';

describe('YellowPowerUpgrade', () => {
  it('should create an instance', () => {
    expect(new YellowPowerUpgrade()).toBeTruthy();
  });

  it('is maxed when its applied amount has reached the limit', () => {
    const upgrade = new YellowPowerUpgrade('yellowPowerUpgrade');
    upgrade.amount = upgrade.limit.copy();
    upgrade.bought = upgrade.limit.sub(Num.ONE);

    expect(upgrade.isMaxed()).toBeTrue();
    expect(upgrade.isBuyable()).toBeFalse();
  });
});
