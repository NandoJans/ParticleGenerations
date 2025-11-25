import { ChargerRecord } from './charger-record';
import { Num } from '../../../num';

describe('ChargerRecord', () => {
  it('should create an instance', () => {
    expect(new ChargerRecord()).toBeTruthy();
  });

  describe('sharedTierMultiplier', () => {
    beforeEach(() => {
      // Reset all charger tiers to 1 before each test
      ChargerRecord.list.forEach(charger => {
        charger.tier = new Num(1, 0);
      });
      ChargerRecord.updateSharedTierMultiplier();
    });

    it('should calculate total tiers correctly', () => {
      // With 8 chargers all at tier 1, total should be 8
      const totalTiers = ChargerRecord.getTotalTiers();
      expect(totalTiers.toNumber()).toBe(8);
    });

    it('should have shared tier multiplier of 1 when all chargers are at tier 1', () => {
      // With all chargers at tier 1, the multiplier should be 1
      // (no extra tiers above base)
      ChargerRecord.updateSharedTierMultiplier();
      expect(ChargerRecord.sharedTierMultiplier.toNumber()).toBe(1);
    });

    it('should increase shared tier multiplier when a charger tiers up', () => {
      // Set one charger to tier 2
      ChargerRecord.redGeneratorDarkCharger.tier = new Num(2, 0);
      ChargerRecord.updateSharedTierMultiplier();

      // Extra tiers = 1, so multiplier should be 1 + (1 * 0.1) = 1.1
      expect(ChargerRecord.sharedTierMultiplier.toNumber()).toBeCloseTo(1.1, 5);
    });

    it('should increase shared tier multiplier by 0.1 per extra tier', () => {
      // Set two chargers to tier 3 each (2 extra tiers each = 4 extra total)
      ChargerRecord.redGeneratorDarkCharger.tier = new Num(3, 0);
      ChargerRecord.redAcceleratorDarkCharger.tier = new Num(3, 0);
      ChargerRecord.updateSharedTierMultiplier();

      // Extra tiers = 4, so multiplier should be 1 + (4 * 0.1) = 1.4
      expect(ChargerRecord.sharedTierMultiplier.toNumber()).toBeCloseTo(1.4, 5);
    });

    it('should update shared tier multiplier during run', () => {
      const chargerRecord = new ChargerRecord();
      
      // Set one charger to tier 5
      ChargerRecord.yellowUpgradeDarkCharger.tier = new Num(5, 0);
      
      // Run the charger record (should update the multiplier)
      chargerRecord.run(new Num(1, 0));

      // Extra tiers = 4, so multiplier should be 1 + (4 * 0.1) = 1.4
      expect(ChargerRecord.sharedTierMultiplier.toNumber()).toBeCloseTo(1.4, 5);
    });
  });
});
