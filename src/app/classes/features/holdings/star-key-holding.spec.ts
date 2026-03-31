import { StarKeyHolding } from './star-key-holding';
import { Num } from '../../../num';
import { BuffSoftCapHelper } from '../../helpers/buff-soft-cap-helper';

describe('StarKeyHolding', () => {
  it('should create an instance', () => {
    expect(new StarKeyHolding()).toBeTruthy();
  });

  it('should apply a strong soft cap when the effect power exceeds 2.5', () => {
    const starKeyHolding = new StarKeyHolding();
    starKeyHolding.amount = new Num(100, 0);
    starKeyHolding.starKeyUpgradesBought = new Num(8, 0);

    const effect = starKeyHolding.action();
    const rawEffect = starKeyHolding.buffer.mul(new Num(100, 0)).add(Num.ONE);
    const expectedEffect = BuffSoftCapHelper.applyPowerSoftCap(rawEffect, new Num(2.5, 0), new Num(0.1, 0));

    expect(effect?.equals(expectedEffect)).toBeTrue();
    expect(effect?.lt(rawEffect)).toBeTrue();
  });

  it('should keep the original effect when the power is at or below 2.5', () => {
    const starKeyHolding = new StarKeyHolding();
    starKeyHolding.amount = new Num(50, 0);
    starKeyHolding.starKeyUpgradesBought = new Num(8, 0);

    const effect = starKeyHolding.action();
    const rawEffect = starKeyHolding.buffer.mul(new Num(50, 0)).add(Num.ONE);

    expect(effect?.equals(rawEffect)).toBeTrue();
  });
});
