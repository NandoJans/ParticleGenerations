import { FusionBoosterAccelerationUpgrade } from './fusion-booster-acceleration-upgrade';
import { Num } from '../../../num';
import { HoldingRecord } from '../../records/holdings/holding-record';
import { ResetKey } from '../../enums/reset-key';

describe('FusionBoosterAccelerationUpgrade', () => {
  let yellowFusionAmount: Num;
  let hydrogenAmount: Num;

  beforeEach(() => {
    yellowFusionAmount = HoldingRecord.yellowFusion.amount.copy();
    hydrogenAmount = HoldingRecord.hydrogen.amount.copy();
  });

  afterEach(() => {
    HoldingRecord.yellowFusion.amount = yellowFusionAmount;
    HoldingRecord.hydrogen.amount = hydrogenAmount;
  });

  it('should create an instance', () => {
    expect(new FusionBoosterAccelerationUpgrade()).toBeTruthy();
  });

  it('buys the final level when 30 of 31 levels are owned', () => {
    const upgrade = new FusionBoosterAccelerationUpgrade('test-fusion-booster-acceleration');
    upgrade.amount = new Num(30, 0);
    upgrade.bought = new Num(30, 0);
    upgrade.limit = new Num(31, 0);
    upgrade.resets = ResetKey.NONE;
    HoldingRecord.yellowFusion.amount = new Num(1, 1000);

    const transaction = upgrade.buy();

    expect(transaction.amount.toNumber()).toBe(1);
    expect(upgrade.amount.toNumber()).toBe(31);
    expect(upgrade.bought.toNumber()).toBe(31);
  });

  it('does not reset fusion when no level is purchased', () => {
    const upgrade = new FusionBoosterAccelerationUpgrade('test-maxed-fusion-booster-acceleration');
    upgrade.amount = new Num(31, 0);
    upgrade.bought = new Num(31, 0);
    upgrade.limit = new Num(31, 0);
    upgrade.resets = ResetKey.NONE;
    HoldingRecord.yellowFusion.amount = new Num(1, 1000);
    HoldingRecord.hydrogen.amount = new Num(5, 3);

    const transaction = upgrade.buy();

    expect(transaction.amount.toNumber()).toBe(0);
    expect(HoldingRecord.yellowFusion.amount.equals(new Num(1, 1000))).toBeTrue();
    expect(HoldingRecord.hydrogen.amount.equals(new Num(5, 3))).toBeTrue();
  });
});
