import {RedGeneratorExtensionUpgrade} from "../../features/upgrades/red-generator-extension-upgrade";
import {RedGeneratorBoosterUpgrade} from "../../features/upgrades/red-generator-booster-upgrade";
import {FirstRedAcceleratorMultiplierUpgrade} from "../../features/upgrades/first-red-accelerator-multiplier-upgrade";
import {SecondRedAcceleratorMultiplierUpgrade} from "../../features/upgrades/second-red-accelerator-multiplier-upgrade";
import {ThirdRedAcceleratorMultiplierUpgrade} from "../../features/upgrades/third-red-accelerator-multiplier-upgrade";
import {ImproveRedGeneratorExtensionUpgrade} from "../../features/upgrades/improve-red-generator-extension-upgrade";
import {UnlockRedGeneratorBoosterUpgrade} from "../../features/upgrades/unlock-red-generator-booster-upgrade";
import {RedAcceleratorParticleBasedUpgrade} from "../../features/upgrades/red-accelerator-particle-based-upgrade";
import {RedBoosterMultiplierUpgrade} from "../../features/upgrades/red-booster-multiplier-upgrade";
import {RedBoosterScalingUpgrade} from "../../features/upgrades/red-booster-scaling-upgrade";
import {FirstRedAcceleratorBoosterUpgrade} from "../../features/upgrades/first-red-accelerator-booster-upgrade";
import {SecondRedAcceleratorBoosterUpgrade} from "../../features/upgrades/second-red-accelerator-booster-upgrade";
import {ThirdRedAcceleratorBoosterUpgrade} from "../../features/upgrades/third-red-accelerator-booster-upgrade";

export class UpgradeRecord {
  // Red Upgrades
  static redGeneratorExtension: RedGeneratorExtensionUpgrade = new RedGeneratorExtensionUpgrade();
  static redGeneratorBooster: RedGeneratorBoosterUpgrade = new RedGeneratorBoosterUpgrade();

  static firstRedAcceleratorMultiplier: FirstRedAcceleratorMultiplierUpgrade = new FirstRedAcceleratorMultiplierUpgrade();
  static secondRedAcceleratorMultiplier: SecondRedAcceleratorMultiplierUpgrade = new SecondRedAcceleratorMultiplierUpgrade();
  static thirdRedAcceleratorMultiplier: ThirdRedAcceleratorMultiplierUpgrade = new ThirdRedAcceleratorMultiplierUpgrade();

  static improveRedGeneratorExtension: ImproveRedGeneratorExtensionUpgrade = new ImproveRedGeneratorExtensionUpgrade();
  static unlockRedGeneratorBooster: UnlockRedGeneratorBoosterUpgrade = new UnlockRedGeneratorBoosterUpgrade();
  static redAcceleratorParticleBased: RedAcceleratorParticleBasedUpgrade = new RedAcceleratorParticleBasedUpgrade();
  static redBoosterMultiplier: RedBoosterMultiplierUpgrade = new RedBoosterMultiplierUpgrade();
  static redBoosterScaling: RedBoosterScalingUpgrade = new RedBoosterScalingUpgrade();
  static firstRedAcceleratorBooster: FirstRedAcceleratorBoosterUpgrade = new FirstRedAcceleratorBoosterUpgrade();
  static secondRedAcceleratorBooster: SecondRedAcceleratorBoosterUpgrade = new SecondRedAcceleratorBoosterUpgrade();
  static thirdRedAcceleratorBooster: ThirdRedAcceleratorBoosterUpgrade = new ThirdRedAcceleratorBoosterUpgrade();

  getRedGeneratorExtension(): RedGeneratorExtensionUpgrade {
    return UpgradeRecord.redGeneratorExtension;
  }

  getRedGeneratorBooster(): RedGeneratorBoosterUpgrade {
    return UpgradeRecord.redGeneratorBooster;
  }
}
