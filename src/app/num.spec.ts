import {Num} from './num';

describe('Num', () => {
  it('normalizes fractional exponents into the mantissa', () => {
    const value = new Num(1, 6.25);

    expect(value.exponent).toBe(6);
    expect(value.mantissa).toBeCloseTo(Math.pow(10, 0.25), 12);
    expect(value.toString(3)).toBe('1.78e6');
  });
});
