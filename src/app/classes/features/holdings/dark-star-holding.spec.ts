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

  it('should have separate buffers for each generator type', () => {
    expect(holding.redBuffer.toNumber()).toBe(10);
    expect(holding.yellowBuffer.toNumber()).toBe(3);
    expect(holding.greenBuffer.toNumber()).toBe(2);
  });

  it('should multiply red generators by 10^amount', () => {
    holding.amount = new Num(2, 0);
    const effect = holding.action();
    
    // Red effect should be 10^2 = 100
    expect(effect.toNumber()).toBe(100);
  });

  it('should boost red generators more than yellow generators', () => {
    holding.amount = new Num(2, 0);
    holding.action();
    
    // Red: 10^2 = 100x
    // Yellow: 3^2 = 9x
    // Green: 2^2 = 4x
    const redBoost = holding.redBuffer.pow(holding.amount);
    const yellowBoost = holding.yellowBuffer.pow(holding.amount);
    
    expect(redBoost.toNumber()).toBeGreaterThan(yellowBoost.toNumber());
  });

  it('should boost yellow generators more than green generators', () => {
    holding.amount = new Num(2, 0);
    holding.action();
    
    const yellowBoost = holding.yellowBuffer.pow(holding.amount);
    const greenBoost = holding.greenBuffer.pow(holding.amount);
    
    expect(yellowBoost.toNumber()).toBeGreaterThan(greenBoost.toNumber());
  });

  it('should boost all three generator types', () => {
    holding.amount = new Num(2, 0);
    holding.action();
    
    expect(MultiplierRecord.redParticleGenerators.getNum().toNumber()).toBeGreaterThan(1);
    expect(MultiplierRecord.yellowGenerators.getNum().toNumber()).toBeGreaterThan(1);
    expect(MultiplierRecord.greenGenerators.getNum().toNumber()).toBeGreaterThan(1);
  });
});
