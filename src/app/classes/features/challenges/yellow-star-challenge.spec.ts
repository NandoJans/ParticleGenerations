import { YellowStarChallenge } from './yellow-star-challenge';
import { ProximaCentauriStarChallenge } from './proxima-centauri-star-challenge';
import { HoldingRecord } from '../../records/holdings/holding-record';
import { Num } from '../../../num';
import { ChallengeRecord } from '../../records/challenges/challenge-record';

describe('YellowStarChallenge', () => {
  it('should create an instance', () => {
    expect(new YellowStarChallenge()).toBeTruthy();
  });

  it('prices Blue-phase completions at the early-yellow 1e3 progression landmark', () => {
    expect(YellowStarChallenge.BLUE_COMPLETION_COST.equals(new Num(1, 3))).toBeTrue();
  });

  it('buys a completion with yellow particles without entering the challenge', () => {
    const challenge = new ProximaCentauriStarChallenge('test-blue-completion');
    challenge.maxCompletions = new Num(5, 0);
    challenge.completed = Num.ZERO.copy();
    HoldingRecord.yellowParticles.amount = new Num(2, 3);
    spyOn(challenge, 'save');
    const rewardRun = spyOn(challenge, 'run').and.callThrough();

    expect(challenge.buyCompletion()).toBeTrue();
    expect(challenge.getCompletions().equals(Num.ONE)).toBeTrue();
    expect(HoldingRecord.yellowParticles.amount.equals(new Num(1, 3))).toBeTrue();
    expect(ChallengeRecord.currentChallenges['yellow']).toBeUndefined();
    expect(rewardRun).not.toHaveBeenCalled();
  });

  it('does not buy a completion when the player cannot afford it', () => {
    const challenge = new ProximaCentauriStarChallenge('test-unaffordable-blue-completion');
    challenge.maxCompletions = new Num(5, 0);
    challenge.completed = Num.ZERO.copy();
    HoldingRecord.yellowParticles.amount = new Num(9, 2);

    expect(challenge.buyCompletion()).toBeFalse();
    expect(challenge.getCompletions().equals(Num.ZERO)).toBeTrue();
    expect(HoldingRecord.yellowParticles.amount.equals(new Num(9, 2))).toBeTrue();
  });
});
