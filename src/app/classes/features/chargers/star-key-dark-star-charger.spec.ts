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

  it('calculates charge from the logarithm of Star Keys', () => {
    HoldingRecord.starKeys.amount = new Num(100, 0);
    expect(charger.getChargeAmount().toNumber()).toBe(2);
  });
});
