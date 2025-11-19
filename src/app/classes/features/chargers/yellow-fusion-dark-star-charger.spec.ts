import { YellowFusionDarkStarCharger } from './yellow-fusion-dark-star-charger';

describe('YellowFusionDarkStarCharger', () => {
  it('should create an instance', () => {
    expect(new YellowFusionDarkStarCharger('test-yellow-fusion-charger')).toBeTruthy();
  });

  it('should have correct display name', () => {
    const charger = new YellowFusionDarkStarCharger('test-yellow-fusion-charger');
    expect(charger.displayName).toBe('Yellow Fusion Charger');
  });

  it('should have correct nerf description', () => {
    const charger = new YellowFusionDarkStarCharger('test-yellow-fusion-charger');
    expect(charger.getNerfDescription()).toContain('fusion limit');
  });
});
