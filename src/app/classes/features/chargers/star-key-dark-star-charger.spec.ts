import {StarKeyDarkStarCharger} from './star-key-dark-star-charger';
import {HoldingRecord} from '../../records/holdings/holding-record';
import {Num} from '../../../num';

describe('StarKeyDarkStarCharger', () => {
  let charger: StarKeyDarkStarCharger;

  beforeEach(() => {
    charger = new StarKeyDarkStarCharger('star-key-dark-star-charger-test');
    charger.init();
    HoldingRecord.starKeys.amount = Num.ZERO.copy();
  });

  it('creates the Star Key Charger', () => {
    expect(charger).toBeTruthy();
    expect(charger.displayName).toBe('Star Key Charger');
  });

  it('unlocks at 100 Star Keys', () => {
    HoldingRecord.starKeys.amount = new Num(99, 0);
    expect(charger.requirementsMet()).toBeFalse();

    HoldingRecord.starKeys.amount = new Num(100, 0);
    expect(charger.requirementsMet()).toBeTrue();
  });

  it('calculates charge from Star Keys squared', () => {
    HoldingRecord.starKeys.amount = new Num(100, 0);
    expect(charger.getChargeAmount().toNumber()).toBe(10_000);
  });

  it('makes Yellow Key compression cheaper and reduces its cost scaling', () => {
    charger.charge = new Num(2, 0);
    charger.tier = new Num(1, 0);

    charger.action();

    expect(charger.getCompressionCostDivisor().toNumber()).toBe(4);
    expect(charger.getCompressionScalingPower().toNumber()).toBeCloseTo(1 / 1.1, 10);
    expect(charger.getRewardDescription()).toContain('compression cheaper');
  });
});
