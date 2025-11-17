import { DarkStarHolding } from './dark-star-holding';
import { MultiplierRecord } from '../../records/multipliers/multiplier-record';
import { Num } from '../../../num';

describe('DarkStarHolding', () => {
  let holding: DarkStarHolding;

  beforeEach(() => {
    holding = new DarkStarHolding();
    holding.amount = new Num(0, 0);
    // Reset multipliers
    MultiplierRecord.redParticleGenerators.reset();
    MultiplierRecord.yellowGenerators.reset();
    MultiplierRecord.greenGenerators.reset();
  });

  it('should create an instance', () => {
    expect(holding).toBeTruthy();
  });

  it('should have buffer of 2', () => {
    expect(holding.buffer.toNumber()).toBe(2);
  });

  it('should multiply all generators by 2^amount', () => {
    holding.amount = new Num(3, 0);
    const effect = holding.action();
    
    // Effect should be 2^3 = 8
    expect(effect.toNumber()).toBe(8);
  });

  it('should boost red generators', () => {
    holding.amount = new Num(2, 0);
    holding.action();
    
    // Should have corrected red particle generators multiplier
    // The actual value depends on how multipliers accumulate
    expect(MultiplierRecord.redParticleGenerators.getNum().toNumber()).toBeGreaterThan(1);
  });

  it('should boost yellow generators', () => {
    holding.amount = new Num(2, 0);
    holding.action();
    
    expect(MultiplierRecord.yellowGenerators.getNum().toNumber()).toBeGreaterThan(1);
  });

  it('should boost green generators', () => {
    holding.amount = new Num(2, 0);
    holding.action();
    
    expect(MultiplierRecord.greenGenerators.getNum().toNumber()).toBeGreaterThan(1);
  });
});
