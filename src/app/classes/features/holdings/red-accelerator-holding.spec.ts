import { RedAcceleratorHolding } from './red-accelerator-holding';
import {ElementCardEffects} from '../elements/blue-element';
import {Num} from '../../../num';

describe('RedAcceleratorHolding', () => {
  beforeEach(() => ElementCardEffects.reset());

  it('should create an instance', () => {
    expect(new RedAcceleratorHolding()).toBeTruthy();
  });

  it('raises red accelerators to the Nitrogen-improved exponent', () => {
    const holding = new RedAcceleratorHolding();
    holding.amount = new Num(1, 4);

    expect(holding.action().toNumber()).toBeCloseTo(100, 10);

    ElementCardEffects.nitrogenAcceleratorEffect = new Num(2, 0);
    expect(holding.action().toNumber()).toBeCloseTo(10_000, 10);
  });
});
