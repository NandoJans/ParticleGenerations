import { StarKeyUpgrade } from './star-key-upgrade';
import { HoldingRecord } from '../../records/holdings/holding-record';
import { UpgradeRecord } from '../../records/upgrades/upgrade-record';
import { Num } from '../../../num';

describe('StarKeyUpgrade', () => {
  afterEach(() => {
    HoldingRecord.yellowParticles.amount = Num.ZERO.copy();
    HoldingRecord.starKeys.amount = Num.ZERO.copy();
    UpgradeRecord.reduceStarKeyCompressionRequirementNuclear.bought = Num.ZERO.copy();
    UpgradeRecord.multiplyRedGeneratorsStarKey.bought = Num.ZERO.copy();
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

  it('should make Star Key upgrades free after buying Compact Stellar Press', () => {
    const upgrade = UpgradeRecord.multiplyRedGeneratorsStarKey;
    UpgradeRecord.reduceStarKeyCompressionRequirementNuclear.bought = Num.ONE.copy();

    upgrade.correctCost();

    expect(upgrade.cost.equals(Num.ZERO)).toBeTrue();
  });

  it('should buy Star Key upgrades without spending Star Keys after buying Compact Stellar Press', () => {
    const upgrade = UpgradeRecord.multiplyRedGeneratorsStarKey;
    UpgradeRecord.reduceStarKeyCompressionRequirementNuclear.bought = Num.ONE.copy();

    const transaction = upgrade.buy();

    expect(transaction.amount.equals(Num.ONE)).toBeTrue();
    expect(transaction.cost.equals(Num.ZERO)).toBeTrue();
    expect(upgrade.hasBought()).toBeTrue();
  });
});
