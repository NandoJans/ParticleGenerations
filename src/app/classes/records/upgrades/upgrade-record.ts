import {RedGeneratorExtensionUpgrade} from "../../features/upgrades/red-generator-extension-upgrade";
import {RedGeneratorBoosterUpgrade} from "../../features/upgrades/red-generator-booster-upgrade";
import {FirstRedAcceleratorMultiplierUpgrade} from "../../features/upgrades/first-red-accelerator-multiplier-upgrade";
import {SecondRedAcceleratorMultiplierUpgrade} from "../../features/upgrades/second-red-accelerator-multiplier-upgrade";
import {ThirdRedAcceleratorMultiplierUpgrade} from "../../features/upgrades/third-red-accelerator-multiplier-upgrade";

export class UpgradeRecord {
  // Red Upgrades
  static redGeneratorExtension: RedGeneratorExtensionUpgrade = new RedGeneratorExtensionUpgrade();
  static redGeneratorBooster: RedGeneratorBoosterUpgrade = new RedGeneratorBoosterUpgrade();

  static firstRedAcceleratorMultiplier: FirstRedAcceleratorMultiplierUpgrade = new FirstRedAcceleratorMultiplierUpgrade();
  static secondRedAcceleratorMultiplier: SecondRedAcceleratorMultiplierUpgrade = new SecondRedAcceleratorMultiplierUpgrade();
  static thirdRedAcceleratorMultiplier: ThirdRedAcceleratorMultiplierUpgrade = new ThirdRedAcceleratorMultiplierUpgrade();

  static

  getRedGeneratorExtension(): RedGeneratorExtensionUpgrade {
    return UpgradeRecord.redGeneratorExtension;
  }

  getRedGeneratorBooster(): RedGeneratorBoosterUpgrade {
    return UpgradeRecord.redGeneratorBooster;
  }
}
