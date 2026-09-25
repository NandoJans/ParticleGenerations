import {BlueMilestone} from './blue-milestone';
import {UpgradeRecord} from '../../records/upgrades/upgrade-record';
import {ResetKey} from '../../enums/reset-key';

/** Prevents red extensions from triggering their normal purchase reset. */
export class StableRedExtensionsBlueMilestone extends BlueMilestone {
  override init(): void {
    if (this.unlocked) this.applyEffect();
    super.init();
  }

  override run(): void {
    if (this.unlocked) this.applyEffect();
  }

  override action(): void {
    this.applyEffect();
  }

  override reset(): void {
    super.reset();
    UpgradeRecord.redGeneratorExtension.resets = UpgradeRecord.noResetRedExtension.hasBought()
      ? ResetKey.NONE
      : ResetKey.RED_EXTENSION;
  }

  private applyEffect(): void {
    UpgradeRecord.redGeneratorExtension.resets = ResetKey.NONE;
  }
}
