import { YellowGeneratorDarkStarCharger } from './yellow-generator-dark-star-charger';

describe('YellowGeneratorDarkStarCharger', () => {
  it('should create an instance', () => {
    expect(new YellowGeneratorDarkStarCharger('test-yellow-generator-charger')).toBeTruthy();
  });

  it('should have correct display name', () => {
    const charger = new YellowGeneratorDarkStarCharger('test-yellow-generator-charger');
    expect(charger.displayName).toBe('Yellow Generator Charger');
  });

  it('should have correct nerf description', () => {
    const charger = new YellowGeneratorDarkStarCharger('test-yellow-generator-charger');
    expect(charger.getNerfDescription()).toContain('Yellow generator multipliers');
  });
});
