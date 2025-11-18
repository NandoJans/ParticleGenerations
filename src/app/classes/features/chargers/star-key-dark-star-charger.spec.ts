import { StarKeyDarkStarCharger } from './star-key-dark-star-charger';

describe('StarKeyDarkStarCharger', () => {
  it('should create an instance', () => {
    expect(new StarKeyDarkStarCharger('test-star-key-charger')).toBeTruthy();
  });

  it('should have correct display name', () => {
    const charger = new StarKeyDarkStarCharger('test-star-key-charger');
    expect(charger.displayName).toBe('Star Key Charger');
  });

  it('should have correct nerf description', () => {
    const charger = new StarKeyDarkStarCharger('test-star-key-charger');
    expect(charger.getNerfDescription()).toContain('Star key power');
  });
});
