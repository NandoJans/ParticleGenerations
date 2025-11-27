import { YellowUpgradeDarkStarCharger } from './yellow-upgrade-dark-star-charger';
import { Num } from '../../../num';

describe('YellowUpgradeDarkStarCharger', () => {
  let charger: YellowUpgradeDarkStarCharger;

  beforeEach(() => {
    charger = new YellowUpgradeDarkStarCharger('test-yellow-upgrade-charger');
  });

  it('should create an instance', () => {
    expect(charger).toBeTruthy();
  });

  it('should have correct display name', () => {
    expect(charger.displayName).toBe('Yellow Upgrade Charger');
  });

  it('should have correct nerf description', () => {
    expect(charger.getNerfDescription()).toContain('yellow upgrades are disabled');
  });

  it('should have base max charge of 100', () => {
    expect(charger.baseMaxCharge.toNumber()).toBe(100);
  });

  it('should have max charge equal to base max charge at tier 1', () => {
    charger.tier = new Num(1, 0);
    expect(charger.maxCharge.toNumber()).toBe(100);
  });

  it('should increase max charge by 10x per tier', () => {
    charger.tier = new Num(2, 0);
    expect(charger.maxCharge.toNumber()).toBe(1000);

    charger.tier = new Num(3, 0);
    expect(charger.maxCharge.toNumber()).toBe(10000);
  });
});
