import { SiriusStarChallenge } from './sirius-star-challenge';
import { Num } from '../../../num';

describe('SiriusStarChallenge', () => {
  it('should create an instance', () => {
    expect(new SiriusStarChallenge()).toBeTruthy();
  });

  it('should have a reward soft cap defined', () => {
    const challenge = new SiriusStarChallenge();
    expect(challenge.rewardSoftCap).toBeDefined();
    expect(challenge.rewardSoftCap.exponent).toBe(50_000);
  });
});
