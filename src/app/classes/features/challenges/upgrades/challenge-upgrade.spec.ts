import { ChallengeUpgrade } from './challenge-upgrade';

describe('ChallengeUpgrade', () => {
  class TestChallengeUpgrade extends ChallengeUpgrade {
    // Implement any abstract methods or properties here if required
  }
  it('should create an instance', () => {
    expect(new TestChallengeUpgrade()).toBeTruthy();
  });
});
