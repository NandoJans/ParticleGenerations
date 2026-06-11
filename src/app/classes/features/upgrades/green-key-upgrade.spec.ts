import {GreenKeyUpgrade} from './green-key-upgrade';
import {HoldingRecord} from '../../records/holdings/holding-record';
import {Num} from '../../../num';

describe('GreenKeyUpgrade', () => {
  let upgrade: GreenKeyUpgrade;

  beforeEach(() => {
    upgrade = new GreenKeyUpgrade('green-key-upgrade-test');
    HoldingRecord.nuclearPotential.amount = new Num(111, 0);
    HoldingRecord.greenKeys.amount = Num.ZERO;
  });

  it('buys green keys with nuclear potential and multiplies each next cost by ten', () => {
    expect(upgrade.cost.toNumber()).toBe(1);

    upgrade.buy();
    expect(HoldingRecord.nuclearPotential.amount.toNumber()).toBe(110);
    expect(HoldingRecord.greenKeys.amount.toNumber()).toBe(1);
    expect(upgrade.cost.toNumber()).toBe(10);

    upgrade.buy();
    expect(HoldingRecord.nuclearPotential.amount.toNumber()).toBe(100);
    expect(HoldingRecord.greenKeys.amount.toNumber()).toBe(2);
    expect(upgrade.cost.toNumber()).toBe(100);
  });

  it('does not use nuclear fission as its currency', () => {
    expect(upgrade.currency).toBe(HoldingRecord.nuclearPotential);
  });
});
