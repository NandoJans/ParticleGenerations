import { StarChallengeDarkStarCharger } from './star-challenge-dark-star-charger';
import { Num } from '../../../num';
import { ChallengeRecord } from '../../records/challenges/challenge-record';
import { ProximaCentauriStarChallenge } from '../challenges/proxima-centauri-star-challenge';
import { UpgradeRecord } from '../../records/upgrades/upgrade-record';
import { HoldingRecord } from '../../records/holdings/holding-record';
import { MultiplierRecord } from '../../records/multipliers/multiplier-record';

describe('StarChallengeDarkStarCharger', () => {
  let charger: StarChallengeDarkStarCharger;

  beforeEach(() => {
    charger = new StarChallengeDarkStarCharger('test-star-challenge-charger');
  });

  afterEach(() => {
    delete ChallengeRecord.currentChallenges['yellow'];
    MultiplierRecord.redParticleGenerators.reset();
    MultiplierRecord.redAcceleratorGenerators.reset();
    MultiplierRecord.yellowGenerators.reset();
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
    expect(breakdown.formula).toContain('red particles');
    expect(breakdown.effects.length).toBeGreaterThan(0);
    expect(breakdown.effects.some(e => e.includes('Holding Speed'))).toBe(true);
    expect(breakdown.effects.some(e => e.includes('Challenge Buff Boost'))).toBe(true);
    expect(breakdown.effects.some(e => e.includes('Proxima Centauri Max Buff'))).toBe(true);
  });

  it('should initialize effect values correctly', () => {
    expect(charger.holdingSpeedEffect).toEqual(new Num(1, 0));
    expect(charger.challengeBuffEffect).toEqual(new Num(1, 0));
    expect(charger.proximaMaxBuffEffect).toEqual(new Num(1, 0));
    expect(charger.starChallengeGeneratorEffect).toEqual(new Num(1, 0));
  });

  it('should have correct charge description mentioning star challenges and red particles', () => {
    const description = charger.getChargeDescription();
    expect(description).toContain('red particles');
    expect(description).toContain('star challenge');
  });

  it('should not charge when not in a star challenge', () => {
    ChallengeRecord.currentChallenges['yellow'] = undefined as any;
    HoldingRecord.redParticles.amount = new Num(1, 6);

    const chargeAmount = charger.getChargeAmount();
    expect(chargeAmount.toString()).toBe(new Num(0, 0).toString());
  });

  it('should charge based on red particles when in a star challenge with /100 scaling', () => {
    ChallengeRecord.currentChallenges['yellow'] = ChallengeRecord.proximaCentauriStar;
    HoldingRecord.redParticles.amount = new Num(1, 6);

    const chargeAmount = charger.getChargeAmount();
    const expected = HoldingRecord.redParticles.amount.log10().div(new Num(1, 2));
    expect(chargeAmount.toString()).toBe(expected.toString());
  });

  it('should buff red/yellow generation multipliers while inside a star challenge', () => {
    ChallengeRecord.currentChallenges['yellow'] = ChallengeRecord.proximaCentauriStar;
    charger.charge = new Num(2, 0);
    charger.tier = new Num(1, 0);

    charger.action();

    expect(MultiplierRecord.redParticleGenerators.getNum().gt(Num.ONE)).toBe(true);
    expect(MultiplierRecord.redAcceleratorGenerators.getNum().gt(Num.ONE)).toBe(true);
    expect(MultiplierRecord.yellowGenerators.getNum().gt(Num.ONE)).toBe(true);
  });

  it('should not buff red/yellow generation multipliers outside star challenges', () => {
    delete ChallengeRecord.currentChallenges['yellow'];
    charger.charge = new Num(2, 0);
    charger.tier = new Num(1, 0);

    charger.action();

    expect(MultiplierRecord.redParticleGenerators.getNum().toString()).toBe(Num.ONE.toString());
    expect(MultiplierRecord.redAcceleratorGenerators.getNum().toString()).toBe(Num.ONE.toString());
    expect(MultiplierRecord.yellowGenerators.getNum().toString()).toBe(Num.ONE.toString());
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

  describe('applyNerfs idempotency', () => {
    it('should not increase challenge difficulty exponentially when applyNerfs is called multiple times', () => {
      const proxima = ChallengeRecord.proximaCentauriStar;
      const initialDifficulty = proxima.difficultyIncrease;
      const initialDifficultyStr = Array.isArray(initialDifficulty)
        ? initialDifficulty.map(n => n.toString()).join(',')
        : initialDifficulty.toString();

      charger.tier = new Num(1, 0);

      // Call applyNerfs multiple times (simulating multiple ticks)
      charger.applyNerfs();
      const afterFirstCall = proxima.difficultyIncrease;
      const afterFirstCallStr = Array.isArray(afterFirstCall)
        ? afterFirstCall.map(n => n.toString()).join(',')
        : afterFirstCall.toString();

      // Difficulty should have increased from initial
      expect(afterFirstCallStr).not.toBe(initialDifficultyStr);

      charger.applyNerfs();
      const afterSecondCall = proxima.difficultyIncrease;
      const afterSecondCallStr = Array.isArray(afterSecondCall)
        ? afterSecondCall.map(n => n.toString()).join(',')
        : afterSecondCall.toString();

      // Difficulty should be THE SAME as after the first call (idempotent)
      expect(afterSecondCallStr).toBe(afterFirstCallStr);

      charger.applyNerfs();
      const afterThirdCall = proxima.difficultyIncrease;
      const afterThirdCallStr = Array.isArray(afterThirdCall)
        ? afterThirdCall.map(n => n.toString()).join(',')
        : afterThirdCall.toString();

      expect(afterThirdCallStr).toBe(afterFirstCallStr);

      // Cleanup
      charger.revertNerfs();
      const afterRevert = proxima.difficultyIncrease;
      const afterRevertStr = Array.isArray(afterRevert)
        ? afterRevert.map(n => n.toString()).join(',')
        : afterRevert.toString();

      expect(afterRevertStr).toBe(initialDifficultyStr);
    });
  describe('nerf update/revert', () => {
    it('should update and revert upgrade costs correctly', () => {
      const proxima = ChallengeRecord.proximaCentauriStar;
      proxima.completed = new Num(1, 0); // Need some completions to have difficulty increase
      proxima.init();
      const upgrade = proxima.challengeUpgrades['unlockSecondRedGenerator'] as any;
      const initialCost = upgrade.baseCost.copy();

      charger.tier = new Num(1, 0);
      charger.activateNerf();

      // Ensure nerf is applied (difficultyIncrease should have changed)
      const afterNerfDifficulty = (proxima.difficultyIncrease as Num[])[0];
      expect(afterNerfDifficulty.gt(new Num(1, 0))).toBe(true);

      // Check if upgrade cost increased
      const nerfedCost = upgrade.baseCost;
      expect(nerfedCost.gt(initialCost)).toBe(true);

      charger.deactivateNerf();

      // Check if upgrade cost reverted
      expect(upgrade.baseCost.toString()).toBe(initialCost.toString());
    });
  });
});
});
