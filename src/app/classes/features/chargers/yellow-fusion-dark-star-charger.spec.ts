import { YellowFusionDarkStarCharger } from './yellow-fusion-dark-star-charger';
import { HoldingRecord } from '../../records/holdings/holding-record';
import { UpgradeRecord } from '../../records/upgrades/upgrade-record';
import { Num } from '../../../num';

describe('YellowFusionDarkStarCharger', () => {
  let charger: YellowFusionDarkStarCharger;

  beforeEach(() => {
    charger = new YellowFusionDarkStarCharger('test-yellow-fusion-charger');
    charger.init();

    HoldingRecord.yellowFusion.amount = new Num(1, 101000);
    UpgradeRecord.fusionBoosterAcceleration.amount = new Num(2, 0);
  });

  it('should create an instance', () => {
    expect(charger).toBeTruthy();
  });

  it('should have correct unlock requirement', () => {
    expect(charger.requirement[0].requirement.equals(new Num(1, 100000))).toBeTrue();
  });

  it('should calculate charge from yellow fusion and fusion booster accelerations', () => {
    // 101000 / (100 * 2) = 505
    expect(charger.getChargeAmount().toNumber()).toBeCloseTo(505, 6);
  });

  it('should describe the hydrogen generation nerf', () => {
    expect(charger.getNerfDescription()).toContain('Hydrogen generation is slowed');
  });
});
