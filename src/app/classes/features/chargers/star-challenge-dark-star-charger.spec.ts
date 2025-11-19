import { StarChallengeDarkStarCharger } from './star-challenge-dark-star-charger';

describe('StarChallengeDarkStarCharger', () => {
  it('should create an instance', () => {
    expect(new StarChallengeDarkStarCharger('test-star-challenge-charger')).toBeTruthy();
  });

  it('should have correct display name', () => {
    const charger = new StarChallengeDarkStarCharger('test-star-challenge-charger');
    expect(charger.displayName).toBe('Star Challenge Charger');
  });

  it('should have correct nerf description', () => {
    const charger = new StarChallengeDarkStarCharger('test-star-challenge-charger');
    expect(charger.getNerfDescription()).toContain('Star challenges');
  });
});
