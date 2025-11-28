import { StarChallengeDarkStarCharger } from './star-challenge-dark-star-charger';
import { Num } from '../../../num';

describe('StarChallengeDarkStarCharger', () => {
  let charger: StarChallengeDarkStarCharger;

  beforeEach(() => {
    charger = new StarChallengeDarkStarCharger('test-star-challenge-charger');
  });

  it('should create an instance', () => {
    expect(charger).toBeTruthy();
  });

  it('should have correct display name', () => {
    expect(charger.displayName).toBe('Star Challenge Charger');
  });

  it('should have correct nerf description', () => {
    expect(charger.getNerfDescription()).toContain('Star challenges');
  });

  it('should have correct reward description for new effects', () => {
    const description = charger.getRewardDescription();
    expect(description).toContain('challenge holding generation speed');
    expect(description).toContain('challenge buff');
    expect(description).toContain('Proxima Centauri max buff');
  });

  it('should have correct effect description format', () => {
    const description = charger.getEffectDescription();
    expect(description).toContain('Holding speed');
    expect(description).toContain('Buff boost');
    expect(description).toContain('Proxima max');
  });

  it('should have effect breakdown with correct formulas', () => {
    const breakdown = charger.getEffectBreakdown();
    expect(breakdown.formula).toContain('charge');
    expect(breakdown.formula).toContain('tier');
    expect(breakdown.effects.length).toBeGreaterThan(0);
    expect(breakdown.effects.some(e => e.includes('Holding Speed'))).toBe(true);
    expect(breakdown.effects.some(e => e.includes('Challenge Buff Boost'))).toBe(true);
    expect(breakdown.effects.some(e => e.includes('Proxima Centauri Max Buff'))).toBe(true);
  });

  it('should initialize effect values correctly', () => {
    expect(charger.holdingSpeedEffect).toEqual(new Num(1, 0));
    expect(charger.challengeBuffEffect).toEqual(new Num(1, 0));
    expect(charger.proximaMaxBuffEffect).toEqual(new Num(1, 0));
  });
});
