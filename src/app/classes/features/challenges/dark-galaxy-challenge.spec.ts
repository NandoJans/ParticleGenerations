import { DarkGalaxyChallenge } from './dark-galaxy-challenge';
import { HoldingRecord } from '../../records/holdings/holding-record';
import { Num } from '../../../num';

describe('DarkGalaxyChallenge', () => {
  let challenge: DarkGalaxyChallenge;

  beforeEach(() => {
    challenge = new DarkGalaxyChallenge();
    challenge.init();
    // Reset dark stars before each test
    HoldingRecord.darkStarHolding.amount = new Num(0, 0);
  });

  it('should create an instance', () => {
    expect(challenge).toBeTruthy();
  });

  it('should have correct goal of 1e1000 yellow particles', () => {
    expect(challenge.goal.exponent).toBe(1000);
    expect(challenge.goal.mantissa).toBe(1);
  });

  it('should award 1 dark star for 1e1000 yellow particles', () => {
    // Set yellow particles to 1e1000
    HoldingRecord.yellowParticles.amount = new Num(1, 1000);
    
    // Call updateDarkStars (private method, accessed through tick)
    challenge.tick();
    
    // Should have 1 dark star
    expect(HoldingRecord.darkStarHolding.amount.toNumber()).toBe(1);
  });

  it('should award 2 dark stars for 2e1000 yellow particles', () => {
    // Set yellow particles to 2e1000
    HoldingRecord.yellowParticles.amount = new Num(2, 1000);
    
    challenge.tick();
    
    // Should have 2 dark stars
    expect(HoldingRecord.darkStarHolding.amount.toNumber()).toBe(2);
  });

  it('should not decrease dark stars if yellow particles decrease', () => {
    // Set yellow particles to 2e1000
    HoldingRecord.yellowParticles.amount = new Num(2, 1000);
    challenge.tick();
    
    // Should have 2 dark stars
    expect(HoldingRecord.darkStarHolding.amount.toNumber()).toBe(2);
    
    // Decrease yellow particles to 1e1000
    HoldingRecord.yellowParticles.amount = new Num(1, 1000);
    challenge.tick();
    
    // Should still have 2 dark stars (not decreased)
    expect(HoldingRecord.darkStarHolding.amount.toNumber()).toBe(2);
  });

  it('should return dark star amount as reward', () => {
    HoldingRecord.darkStarHolding.amount = new Num(5, 0);
    const reward = challenge.reward();
    expect(reward?.toNumber()).toBe(5);
  });
});
