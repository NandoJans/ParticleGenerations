import { CombineDarkStarCharger } from './combine-dark-star-charger';

describe('CombineDarkStarCharger', () => {
  it('should create an instance', () => {
    expect(new CombineDarkStarCharger('test-combine-charger')).toBeTruthy();
  });

  it('should have correct display name', () => {
    const charger = new CombineDarkStarCharger('test-combine-charger');
    expect(charger.displayName).toBe('Combine Charger');
  });

  it('should have correct nerf description', () => {
    const charger = new CombineDarkStarCharger('test-combine-charger');
    expect(charger.getNerfDescription()).toContain('chargers');
  });
});
