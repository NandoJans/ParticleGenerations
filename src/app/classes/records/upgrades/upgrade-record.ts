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
import {YellowRepeatableMultiplierUpgrade} from "../../features/upgrades/yellow-repeatable-multiplier-upgrade";
import {YellowParticleMultiplierUpgrade} from "../../features/upgrades/yellow-particle-multiplier-upgrade";
import {YellowBasedMultiplierUpgrade} from "../../features/upgrades/yellow-based-multiplier-upgrade";
import {
  YellowBasedAcceleratorMultiplierUpgrade
} from "../../features/upgrades/yellow-based-accelerator-multiplier-upgrade";
import {IncreaseRedGeneratorMultiplierUpgrade} from "../../features/upgrades/increase-red-generator-multiplier-upgrade";
import {FirstIncreaseRedAcceleratorUpgrade} from "../../features/upgrades/first-increase-red-accelerator-upgrade";
import {SecondIncreaseRedAcceleratorUpgrade} from "../../features/upgrades/second-increase-red-accelerator-upgrade";
import {ThirdIncreaseRedAcceleratorUpgrade} from "../../features/upgrades/third-increase-red-accelerator-upgrade";
import {IncreaseRedGeneratorExtensionUpgrade} from "../../features/upgrades/increase-red-generator-extension-upgrade";
import {IncreaseRedGeneratorBoosterUpgrade} from "../../features/upgrades/increase-red-generator-booster-upgrade";
import {StartWithRedAcceleratorsUpgrade} from "../../features/upgrades/start-with-red-accelerators-upgrade";
import {UnlockYellowFusionUpgrade} from "../../features/upgrades/unlock-yellow-fusion-upgrade";
import {IncreaseYellowFusionUpgrade} from "../../features/upgrades/increase-yellow-fusion-upgrade";
import {AccelerateYellowFusionUpgrade} from "../../features/upgrades/accelerate-yellow-fusion-upgrade";
import {Record} from "../record";
import {Upgrade} from "../../features/upgrade";

export class UpgradeRecord extends Record {
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

  // Yellow Phase
  static yellowRepeatableMultiplier: YellowRepeatableMultiplierUpgrade = new YellowRepeatableMultiplierUpgrade()
  static yellowParticleMultiplier: YellowParticleMultiplierUpgrade = new YellowParticleMultiplierUpgrade();

  static yellowBasedMultiplier: YellowBasedMultiplierUpgrade = new YellowBasedMultiplierUpgrade();
  static yellowBasedAcceleratorMultiplier: YellowBasedAcceleratorMultiplierUpgrade = new YellowBasedAcceleratorMultiplierUpgrade();
  static increaseRedGeneratorMultiplier: IncreaseRedGeneratorMultiplierUpgrade = new IncreaseRedGeneratorMultiplierUpgrade();
  static firstIncreaseRedAcceleratorUpgrade: FirstIncreaseRedAcceleratorUpgrade = new FirstIncreaseRedAcceleratorUpgrade();
  static secondIncreaseRedAcceleratorUpgrade: SecondIncreaseRedAcceleratorUpgrade = new SecondIncreaseRedAcceleratorUpgrade();
  static thirdIncreaseRedAcceleratorUpgrade: ThirdIncreaseRedAcceleratorUpgrade = new ThirdIncreaseRedAcceleratorUpgrade();
  static increaseRedGeneratorExtension: IncreaseRedGeneratorExtensionUpgrade = new IncreaseRedGeneratorExtensionUpgrade();
  static increaseRedGeneratorBooster: IncreaseRedGeneratorBoosterUpgrade = new IncreaseRedGeneratorBoosterUpgrade();
  static startWithRedAccelerators: StartWithRedAcceleratorsUpgrade = new StartWithRedAcceleratorsUpgrade();

  static unlockYellowFusion: UnlockYellowFusionUpgrade = new UnlockYellowFusionUpgrade();
  static accelerateYellowFusion: AccelerateYellowFusionUpgrade = new AccelerateYellowFusionUpgrade();
  static increaseYellowFusion: IncreaseYellowFusionUpgrade = new IncreaseYellowFusionUpgrade();


  getRedGeneratorExtension(): RedGeneratorExtensionUpgrade {
    return UpgradeRecord.redGeneratorExtension;
  }

  getRedGeneratorBooster(): RedGeneratorBoosterUpgrade {
    return UpgradeRecord.redGeneratorBooster;
  }

  static override list: Upgrade[] = [
    UpgradeRecord.redGeneratorExtension,
    UpgradeRecord.redGeneratorBooster,

    UpgradeRecord.firstRedAcceleratorMultiplier,
    UpgradeRecord.secondRedAcceleratorMultiplier,
    UpgradeRecord.thirdRedAcceleratorMultiplier,

    UpgradeRecord.improveRedGeneratorExtension,
    UpgradeRecord.unlockRedGeneratorBooster,
    UpgradeRecord.redAcceleratorParticleBased,
    UpgradeRecord.redBoosterMultiplier,
    UpgradeRecord.redBoosterScaling,
    UpgradeRecord.firstRedAcceleratorBooster,
    UpgradeRecord.secondRedAcceleratorBooster,
    UpgradeRecord.thirdRedAcceleratorBooster,

    UpgradeRecord.yellowRepeatableMultiplier,
    UpgradeRecord.yellowParticleMultiplier,
    UpgradeRecord.yellowBasedMultiplier,
    UpgradeRecord.yellowBasedAcceleratorMultiplier,
    UpgradeRecord.increaseRedGeneratorMultiplier,
    UpgradeRecord.firstIncreaseRedAcceleratorUpgrade,
    UpgradeRecord.secondIncreaseRedAcceleratorUpgrade,
    UpgradeRecord.thirdIncreaseRedAcceleratorUpgrade,
    UpgradeRecord.increaseRedGeneratorExtension,
    UpgradeRecord.increaseRedGeneratorBooster,
    UpgradeRecord.startWithRedAccelerators,

    UpgradeRecord.unlockYellowFusion,
    UpgradeRecord.accelerateYellowFusion,
    UpgradeRecord.increaseYellowFusion
  ]

  getList(): Upgrade[] {
    return UpgradeRecord.list;
  }
}
