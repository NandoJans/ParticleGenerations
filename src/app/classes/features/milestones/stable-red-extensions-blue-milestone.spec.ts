import {Num} from '../../../num';
import {ResetKey} from '../../enums/reset-key';
import {UpgradeRecord} from '../../records/upgrades/upgrade-record';
import {StableRedExtensionsBlueMilestone} from './stable-red-extensions-blue-milestone';

describe('StableRedExtensionsBlueMilestone', () => {
  let milestone: StableRedExtensionsBlueMilestone;

  beforeEach(() => {
    milestone = new StableRedExtensionsBlueMilestone(
      'stableRedExtensionsTest',
      'Stable Red Extensions',
      new Num(1, 4),
      'Red extensions no longer reset anything.'
    );
    UpgradeRecord.redGeneratorExtension.resets = ResetKey.RED_EXTENSION;
    UpgradeRecord.noResetRedExtension.bought = Num.ZERO.copy();
  });

  afterEach(() => {
    UpgradeRecord.redGeneratorExtension.resets = ResetKey.RED_EXTENSION;
  });

  it('stops red extensions from triggering a reset when unlocked', () => {
    milestone.unlock();

    expect(UpgradeRecord.redGeneratorExtension.resets).toBe(ResetKey.NONE);
  });

  it('restores the reset unless the yellow no-reset upgrade is owned', () => {
    milestone.unlock();
    milestone.reset();
    expect(UpgradeRecord.redGeneratorExtension.resets).toBe(ResetKey.RED_EXTENSION);

    UpgradeRecord.noResetRedExtension.bought = Num.ONE.copy();
    milestone.unlock();
    milestone.reset();
    expect(UpgradeRecord.redGeneratorExtension.resets).toBe(ResetKey.NONE);
  });
});
