import { GreaterProximaCentauriStarKeyUpgrade } from './greater-proxima-centauri-star-key-upgrade';
import { ChallengeRecord } from '../../records/challenges/challenge-record';
import { ProximaCentauriStarChallenge } from '../challenges/proxima-centauri-star-challenge';
import { Num } from '../../../num';

describe('GreaterProximaCentauriStarKeyUpgrade', () => {
  it('should create an instance', () => {
    expect(new GreaterProximaCentauriStarKeyUpgrade('test')).toBeTruthy();
  });

  it('should have buffer of 1e150', () => {
    const upgrade = new GreaterProximaCentauriStarKeyUpgrade('test');
    expect(upgrade.buffer).toEqual(new Num(1, 150));
  });

  it('action() should not modify maxEffect on the challenge (handled by charger)', () => {
    const upgrade = new GreaterProximaCentauriStarKeyUpgrade('test');
    upgrade.bought = new Num(1, 0);

    const initialMaxEffect = ChallengeRecord.proximaCentauriStar.maxEffect?.copy();
    upgrade.action();
    const afterMaxEffect = ChallengeRecord.proximaCentauriStar.maxEffect;

    // maxEffect should be unchanged after calling action() since the charger handles it
    expect(afterMaxEffect?.toString()).toBe(initialMaxEffect?.toString());
  });
});
