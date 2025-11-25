import { RedAcceleratorDarkStarCharger } from './red-accelerator-dark-star-charger';
import { Num } from '../../../num';

describe('RedAcceleratorDarkStarCharger', () => {
  let charger: RedAcceleratorDarkStarCharger;

  beforeEach(() => {
    charger = new RedAcceleratorDarkStarCharger('test-red-accelerator-charger');
  });

  it('should create an instance', () => {
    expect(charger).toBeTruthy();
  });

  it('should have correct display name', () => {
    expect(charger.displayName).toBe('Red Accelerator Charger');
  });

  it('should have correct nerf description', () => {
    expect(charger.getNerfDescription()).toContain('square root');
  });

  it('should have base max charge of 100', () => {
    expect(charger.baseMaxCharge.toNumber()).toBe(100);
  });

  it('should have max charge equal to base max charge at tier 1', () => {
    charger.tier = new Num(1, 0);
    expect(charger.maxCharge.toNumber()).toBe(100);
  });

  it('should increase max charge by 10x per tier', () => {
    charger.tier = new Num(2, 0);
    expect(charger.maxCharge.toNumber()).toBe(1000);

    charger.tier = new Num(3, 0);
    expect(charger.maxCharge.toNumber()).toBe(10000);
  });

  it('should have a static multiplier that can be adjusted', () => {
    expect(RedAcceleratorDarkStarCharger.staticMultiplier).toBeDefined();
    expect(RedAcceleratorDarkStarCharger.staticMultiplier.toNumber()).toBe(10);
  });

  it('should have buffer set to 10', () => {
    expect(charger.buffer.toNumber()).toBe(10);
  });

  it('should calculate effect raised to power of tiers', () => {
    charger.tier = new Num(2, 0);
    charger.charge = new Num(2, 0);
    // Effect formula: (buffer^charge × staticMultiplier)^(0.5×tier + 0.5)
    // = (10^2 × 10)^(0.5×2 + 0.5) = (100 × 10)^1.5 = 1000^1.5 = 31622.776...
    const effect = charger.action();
    expect(effect).toBeDefined();
    expect(effect!.gt(new Num(31000, 0))).toBe(true);
    expect(effect!.lt(new Num(32000, 0))).toBe(true);
  });

  it('should provide effect breakdown', () => {
    const breakdown = charger.getEffectBreakdown();
    expect(breakdown.formula).toContain('charge');
    expect(breakdown.formula).toContain('tier');
    expect(breakdown.effects.length).toBe(3);
  });

  it('should provide tier milestone boost description', () => {
    charger.tier = new Num(1, 0);
    const description = charger.getTierMilestoneBoostDescription();
    expect(description).toContain('Tier up');
    expect(description).toContain('10x');
  });

  it('should have calculation order 500 to run after upgrades but before generators', () => {
    // Calculation order 500 ensures:
    // - Runs after upgrades (400)
    // - Runs before generators (1000)
    // - Runs before multiplier reset (1150)
    expect(charger.calculationOrder).toBe(500);
  });
});
