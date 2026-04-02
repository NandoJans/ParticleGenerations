import { ProximaCentauriStarChallenge } from './proxima-centauri-star-challenge';
import { Num } from '../../../num';

describe('ProximaCentauriStarChallenge', () => {
  it('should create an instance', () => {
    expect(new ProximaCentauriStarChallenge()).toBeTruthy();
  });

  it('should re-initialize challenge upgrades and max completions on reset', () => {
    const challenge = new ProximaCentauriStarChallenge();
    challenge.completed = new Num(3, 0);
    challenge.init();

    const upgradeCostBeforeReset = challenge.challengeUpgrades['unlockSecondRedGenerator'].baseCost.copy();

    challenge.maxCompletions = new Num(5, 0);
    challenge.reset();

    expect(challenge.maxCompletions).toBeUndefined();

    const upgradeCostAfterReset = challenge.challengeUpgrades['unlockSecondRedGenerator'].baseCost;
    expect(upgradeCostAfterReset.lt(upgradeCostBeforeReset)).toBeTrue();
  });
});
