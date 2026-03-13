import { StarChallengeDarkStarCharger } from './star-challenge-dark-star-charger';
import { Num } from '../../../num';
import { ChallengeRecord } from '../../records/challenges/challenge-record';
import { ProximaCentauriStarChallenge } from '../challenges/proxima-centauri-star-challenge';
import { UpgradeRecord } from '../../records/upgrades/upgrade-record';

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

  it('should have correct nerf description mentioning reduced generation', () => {
    const description = charger.getNerfDescription();
    expect(description).toContain('Star challenges');
    expect(description).toContain('^0.5');
  });

  it('should have nerf description mentioning Sirius extra difficulty', () => {
    const description = charger.getNerfDescription();
    expect(description).toContain('Sirius');
    expect(description).toContain('100x');
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

  it('should have correct charge description mentioning all challenges', () => {
    const description = charger.getChargeDescription();
    expect(description).toContain('all challenge completions');
    expect(description).toContain('10 per completion');
  });

  describe('Proxima Centauri maxEffect calculation', () => {
    beforeEach(() => {
      // Reset the challenge maxEffect to BASE_MAX_EFFECT before each sub-test
      ChallengeRecord.proximaCentauriStar.maxEffect = ProximaCentauriStarChallenge.BASE_MAX_EFFECT.copy();
    });

    afterEach(() => {
      // Reset the star key upgrade bought state after each sub-test
      UpgradeRecord.greaterProximaCentauriStarKey.bought = new Num(0, 0);
    });

    it('should set maxEffect to BASE_MAX_EFFECT * proximaMaxBuffEffect when star key upgrade is not bought', () => {
      UpgradeRecord.greaterProximaCentauriStarKey.bought = new Num(0, 0);
      charger.charge = new Num(0, 0);
      charger.tier = new Num(1, 0);

      charger.action();

      // Without the star key upgrade, maxEffect should equal BASE_MAX_EFFECT * proximaMaxBuffEffect
      const expectedMaxEffect = ProximaCentauriStarChallenge.BASE_MAX_EFFECT.mul(charger.proximaMaxBuffEffect);
      expect(ChallengeRecord.proximaCentauriStar.maxEffect?.toString()).toBe(expectedMaxEffect.toString());
    });

    it('should include the star key upgrade buffer in maxEffect when it has been bought', () => {
      UpgradeRecord.greaterProximaCentauriStarKey.bought = new Num(1, 0);
      charger.charge = new Num(0, 0);
      charger.tier = new Num(1, 0);

      charger.action();

      const starKeyBuff = UpgradeRecord.greaterProximaCentauriStarKey.buffer;
      const expectedMaxEffect = ProximaCentauriStarChallenge.BASE_MAX_EFFECT
        .mul(charger.proximaMaxBuffEffect)
        .mul(starKeyBuff);
      expect(ChallengeRecord.proximaCentauriStar.maxEffect?.toString()).toBe(expectedMaxEffect.toString());
    });

    it('should result in a higher maxEffect when star key upgrade is bought compared to not bought', () => {
      charger.charge = new Num(0, 0);
      charger.tier = new Num(1, 0);

      UpgradeRecord.greaterProximaCentauriStarKey.bought = new Num(0, 0);
      charger.action();
      const maxEffectWithoutUpgrade = ChallengeRecord.proximaCentauriStar.maxEffect!.copy();

      UpgradeRecord.greaterProximaCentauriStarKey.bought = new Num(1, 0);
      charger.action();
      const maxEffectWithUpgrade = ChallengeRecord.proximaCentauriStar.maxEffect!.copy();

      expect(maxEffectWithUpgrade.gt(maxEffectWithoutUpgrade)).toBe(true);
    });

    it('should not grow maxEffect unboundedly across multiple action() calls when upgrade is bought', () => {
      UpgradeRecord.greaterProximaCentauriStarKey.bought = new Num(1, 0);
      charger.charge = new Num(0, 0);
      charger.tier = new Num(1, 0);

      // Call action multiple times (simulating multiple ticks)
      charger.action();
      const afterFirstTick = ChallengeRecord.proximaCentauriStar.maxEffect!.toString();
      charger.action();
      const afterSecondTick = ChallengeRecord.proximaCentauriStar.maxEffect!.toString();
      charger.action();
      const afterThirdTick = ChallengeRecord.proximaCentauriStar.maxEffect!.toString();

      // maxEffect should be the same after each tick (not growing unboundedly)
      expect(afterFirstTick).toBe(afterSecondTick);
      expect(afterSecondTick).toBe(afterThirdTick);
    });
  });
});
