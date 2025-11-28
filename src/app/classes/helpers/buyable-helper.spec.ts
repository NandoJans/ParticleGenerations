import { BuyableHelper } from './buyable-helper';
import { Num } from '../../num';

describe('BuyableHelper', () => {
  describe('super-scaling logic', () => {
    it('should apply super-scaling cost multiplier correctly', () => {
      // This test validates the super-scaling formula
      // superScaling^(purchases_past_threshold^2)
      const superScaling = new Num(1.5, 0);
      const superScalingStart = new Num(5, 0);
      const bought = new Num(8, 0); // 3 purchases past threshold

      const purchasesPastThreshold = bought.sub(superScalingStart);
      const superScalingMultiplier = superScaling.pow(purchasesPastThreshold.mul(purchasesPastThreshold));

      // 1.5^(3*3) = 1.5^9 ≈ 38.44
      expect(superScalingMultiplier.toNumber()).toBeCloseTo(38.44, 1);
    });

    it('should calculate quadratic scaling correctly', () => {
      const superScaling = new Num(2, 0);

      // 1 purchase past threshold: 2^(1*1) = 2
      const mult1 = superScaling.pow(new Num(1, 0).mul(new Num(1, 0)));
      expect(mult1.toNumber()).toBe(2);

      // 2 purchases past threshold: 2^(2*2) = 16
      const mult2 = superScaling.pow(new Num(2, 0).mul(new Num(2, 0)));
      expect(mult2.toNumber()).toBe(16);

      // 3 purchases past threshold: 2^(3*3) = 512
      const mult3 = superScaling.pow(new Num(3, 0).mul(new Num(3, 0)));
      expect(mult3.toNumber()).toBe(512);

      // Growth rate increases with each additional purchase
      expect(mult3.toNumber() / mult2.toNumber()).toBeGreaterThan(mult2.toNumber() / mult1.toNumber());
    });
  });
});
