import { RedGeneratorDarkStarCharger } from './red-generator-dark-star-charger';
import { Num } from '../../../num';

describe('RedGeneratorDarkCharger', () => {
  let charger: RedGeneratorDarkStarCharger;

  beforeEach(() => {
    charger = new RedGeneratorDarkStarCharger('test-red-generator-charger');
  });

  it('should create an instance', () => {
    expect(charger).toBeTruthy();
  });

  it('should have base max charge of 100', () => {
    expect(charger.baseMaxCharge.toNumber()).toBe(100);
  });

  it('should have max charge equal to base max charge at tier 1', () => {
    charger.tier = new Num(1, 0);
    expect(charger.maxCharge.toNumber()).toBe(100);
  });

  it('should increase max charge by 10x per tier', () => {
    charger.tier = new Num(2, 0);
    expect(charger.maxCharge.toNumber()).toBe(1000);

    charger.tier = new Num(3, 0);
    expect(charger.maxCharge.toNumber()).toBe(10000);
  });

  it('should be able to tier up when charge reaches max charge', () => {
    charger.tier = new Num(1, 0);
    charger.charge = new Num(100, 0);
    expect(charger.canTierUp()).toBe(true);
  });

  it('should not automatically tier up', () => {
    charger.tier = new Num(1, 0);
    charger.charge = new Num(100, 0);
    charger['isNerfActive'] = true;
    charger.run(new Num(1, 0));
    // Tier should NOT automatically increase
    expect(charger.tier.toNumber()).toBe(1);
  });

  it('should tier up manually and subtract previous max charge', () => {
    charger.tier = new Num(1, 0);
    charger.charge = new Num(150, 0);
    charger.tierUp();
    expect(charger.tier.toNumber()).toBe(2);
    // Charge should be 150 - 100 = 50
    expect(charger.charge.toNumber()).toBe(50);
  });

  it('should return tier milestone boost description', () => {
    charger.tier = new Num(1, 0);
    const description = charger.getTierMilestoneBoostDescription();
    expect(description).toContain('Tier up');
  });

  it('should calculate effect raised to power of tiers', () => {
    charger.tier = new Num(2, 0);
    charger.charge = new Num(2, 0);
    // Effect formula: (10^charge)^tier = (10^2)^2 = 100^2 = 10000
    const effect = charger.action();
    expect(effect).toBeDefined();
    expect(effect!.toNumber()).toBe(10000);
  });
});
