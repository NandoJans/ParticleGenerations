import { YellowUpgradeDarkStarCharger } from './yellow-upgrade-dark-star-charger';
import { Num } from '../../../num';

describe('YellowUpgradeDarkStarCharger', () => {
  let charger: YellowUpgradeDarkStarCharger;

  beforeEach(() => {
    charger = new YellowUpgradeDarkStarCharger('test-yellow-upgrade-charger');
  });

  it('should create an instance', () => {
    expect(charger).toBeTruthy();
  });

  it('should have correct display name', () => {
    expect(charger.displayName).toBe('Yellow Upgrade Charger');
  });

  it('should have correct nerf description', () => {
    expect(charger.getNerfDescription()).toContain('yellow upgrades are disabled');
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

  describe('applySoftcap', () => {
    it('should not apply softcap when effect is below 1e10000', () => {
      // Access private method using bracket notation
      const smallEffect = new Num(1, 5000); // 1e5000
      const result = (charger as any).applySoftcap(smallEffect);
      expect(result.exponent).toBe(5000);
      expect(result.mantissa).toBeCloseTo(1, 1);
    });

    it('should apply softcap when effect is above 1e10000', () => {
      // Access private method using bracket notation
      const largeEffect = new Num(1, 100000); // 1e100000 (uncapped would be huge)
      const result = (charger as any).applySoftcap(largeEffect);
      // With softcap: cap * (effect / cap)^0.1
      // = 1e10000 * (1e100000 / 1e10000)^0.1
      // = 1e10000 * (1e90000)^0.1
      // = 1e10000 * 1e9000
      // = 1e19000
      expect(result.exponent).toBe(19000);
    });

    it('should slow down growth significantly after softcap', () => {
      // Test that doubling the exponent results in much less than double after softcap
      const effect1 = new Num(1, 100000); // 1e100000
      const effect2 = new Num(1, 200000); // 1e200000 (double the exponent)
      
      const result1 = (charger as any).applySoftcap(effect1);
      const result2 = (charger as any).applySoftcap(effect2);
      
      // Without softcap, effect2 would be 1e100000 times larger than effect1
      // With softcap, the difference should be much smaller
      const exponentDifference = result2.exponent - result1.exponent;
      
      // With ^0.1 softcap, going from 1e100000 to 1e200000 should add
      // about 10000 to the exponent (since (1e200000/1e100000)^0.1 = 1e10000)
      expect(exponentDifference).toBe(10000);
    });
  });
});
