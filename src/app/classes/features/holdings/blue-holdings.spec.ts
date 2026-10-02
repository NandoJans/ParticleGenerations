import {Num} from '../../../num';
import {ElectronHolding} from './blue-holdings';

describe('ElectronHolding', () => {
  let electrons: ElectronHolding;

  beforeEach(() => {
    electrons = new ElectronHolding();
  });

  it('preserves the early red buy-multiplier effect through 1e10 electrons', () => {
    electrons.amount = new Num(1, 10);

    expect(electrons.getRedEffect().toNumber()).toBeCloseTo(1.5, 10);
  });

  it('applies square-root diminishing returns above 1e10 electrons', () => {
    electrons.amount = new Num(1, 100);

    // 10 effective orders before the softcap + sqrt(90) afterwards.
    const expected = 1 + (10 + Math.sqrt(90)) * 0.05;
    expect(electrons.getRedEffect().toNumber()).toBeCloseTo(expected, 10);
    expect(electrons.getRedEffect().toNumber()).toBeLessThan(2);
  });
});
