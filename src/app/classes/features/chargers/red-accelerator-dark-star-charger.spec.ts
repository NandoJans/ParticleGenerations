import { RedAcceleratorDarkStarCharger } from './red-accelerator-dark-star-charger';

describe('RedAcceleratorDarkStarCharger', () => {
  it('should create an instance', () => {
    expect(new RedAcceleratorDarkStarCharger('test-red-accelerator-charger')).toBeTruthy();
  });

  it('should have correct display name', () => {
    const charger = new RedAcceleratorDarkStarCharger('test-red-accelerator-charger');
    expect(charger.displayName).toBe('Red Accelerator Charger');
  });

  it('should have correct nerf description', () => {
    const charger = new RedAcceleratorDarkStarCharger('test-red-accelerator-charger');
    expect(charger.getNerfDescription()).toContain('square root');
  });
});
