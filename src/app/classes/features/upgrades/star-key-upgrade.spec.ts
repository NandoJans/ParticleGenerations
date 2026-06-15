import { StarKeyUpgrade } from './star-key-upgrade';
import { HoldingRecord } from '../../records/holdings/holding-record';
import { UpgradeRecord } from '../../records/upgrades/upgrade-record';
import { Num } from '../../../num';

describe('StarKeyUpgrade', () => {
  afterEach(() => {
    HoldingRecord.yellowParticles.amount = Num.ZERO.copy();
    UpgradeRecord.reduceStarKeyCompressionRequirementNuclear.bought = Num.ZERO.copy();
  });

  it('should create an instance', () => {
    expect(new StarKeyUpgrade()).toBeTruthy();
  });

  it('should unlock at 1e40 yellow particles after buying Compact Stellar Press', () => {
    const upgrade = UpgradeRecord.multiplyRedGeneratorsStarKey;
    HoldingRecord.yellowParticles.amount = new Num(1, 40);
    UpgradeRecord.reduceStarKeyCompressionRequirementNuclear.bought = Num.ONE.copy();

    expect(upgrade.requirementsMet()).toBeTrue();
  });
});
