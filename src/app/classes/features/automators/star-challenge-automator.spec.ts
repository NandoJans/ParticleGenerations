import { StarChallengeAutomator } from './star-challenge-automator';
import { ChallengeRecord } from '../../records/challenges/challenge-record';

describe('StarChallengeAutomator', () => {
  it('resolves its challenge lazily', () => {
    let challengeWasRead = false;
    const automator = new StarChallengeAutomator(
      'test',
      () => {
        challengeWasRead = true;
        return ChallengeRecord.proximaCentauriStar;
      },
      'proxima-centauri-star-challenge',
      'Proxima Centauri',
    );

    expect(challengeWasRead).toBeFalse();
    expect(automator.name).toBe('proxima-centauri-star-challenge-automator');
    expect(automator.displayName).toBe('Proxima Centauri-Automator');
    expect(automator.challenge).toBe(ChallengeRecord.proximaCentauriStar);
    expect(challengeWasRead).toBeTrue();
  });
});
