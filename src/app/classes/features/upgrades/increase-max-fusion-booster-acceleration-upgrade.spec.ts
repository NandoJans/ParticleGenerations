import { IncreaseMaxFusionBoosterAccelerationUpgrade } from './increase-max-fusion-booster-acceleration-upgrade';
import { Num } from '../../../num';

describe('IncreaseMaxFusionBoosterAccelerationUpgrade', () => {
  let upgrade: IncreaseMaxFusionBoosterAccelerationUpgrade;

  beforeEach(() => {
    upgrade = new IncreaseMaxFusionBoosterAccelerationUpgrade();
  });

  it('should create an instance', () => {
    expect(upgrade).toBeTruthy();
  });

  it('should have super-scaling properties configured', () => {
    expect(upgrade.superScalingStart).toBeTruthy();
    expect(upgrade.superScaling).toBeTruthy();
    expect(upgrade.superScalingStart?.toNumber()).toBe(100);
    expect(upgrade.superScaling?.toNumber()).toBe(1.5);
  });

  it('should have standard scaling configured', () => {
    expect(upgrade.scaling.toNumber()).toBe(10);
    expect(upgrade.increase.toNumber()).toBe(10);
  });

  it('should have base cost of 1e15', () => {
    expect(upgrade.baseCost.exponent).toBe(15);
  });

  it('should use yellow particles as currency', () => {
    expect(upgrade.currency.name).toBe('yellow-particle-holding');
  });
});
