import { YellowUpgradeDarkStarCharger } from './yellow-upgrade-dark-star-charger';

describe('YellowUpgradeDarkStarCharger', () => {
  it('should create an instance', () => {
    expect(new YellowUpgradeDarkStarCharger('test-yellow-upgrade-charger')).toBeTruthy();
  });

  it('should have correct display name', () => {
    const charger = new YellowUpgradeDarkStarCharger('test-yellow-upgrade-charger');
    expect(charger.displayName).toBe('Yellow Upgrade Charger');
  });

  it('should have correct nerf description', () => {
    const charger = new YellowUpgradeDarkStarCharger('test-yellow-upgrade-charger');
    expect(charger.getNerfDescription()).toContain('yellow upgrades are disabled');
  });
});
