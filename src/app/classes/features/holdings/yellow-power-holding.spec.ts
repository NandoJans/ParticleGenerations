import { Num } from 'src/app/num';
import { YellowPowerHolding } from './yellow-power-holding';

describe('YellowPowerHolding', () => {
  it('should create an instance', () => {
    expect(new YellowPowerHolding()).toBeTruthy();
  });

  it('should leave the effect unchanged at the softcap', () => {
    const holding = new YellowPowerHolding();
    holding.amount = new Num(1, 5_000_000);

    const effect = holding.action();

    expect(effect.equals(new Num(1, 5_000_000))).toBeTrue();
  });

  it('should square-root scale the effect above the softcap', () => {
    const holding = new YellowPowerHolding();
    holding.amount = new Num(1, 5_000_002);

    const effect = holding.action();

    expect(effect.equals(new Num(1, 5_000_001))).toBeTrue();
  });
});
