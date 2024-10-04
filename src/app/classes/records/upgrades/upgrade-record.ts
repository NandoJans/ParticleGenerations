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
import {RedParticleSacrificeUpgrade} from "../../features/upgrades/red-particle-sacrifice-upgrade";
import {YellowParticleSacrificeUpgrade} from "../../features/upgrades/yellow-particle-sacrifice-upgrade";
import {GreenParticleSacrificeUpgrade} from "../../features/upgrades/green-particle-sacrifice-upgrade";
import {RedAcceleratorBufferUpgrade} from "../../features/upgrades/red-accelerator-buffer-upgrade";
import {GreenGeneratorsEnergyBasedUpgrade} from "../../features/upgrades/green-generators-energy-based-upgrade";
import {AcceleratorYellowPowerBasedUpgrade} from "../../features/upgrades/accelerator-yellow-power-based-upgrade";
import {GreenGeneratorsGreenBasedUpgrade} from "../../features/upgrades/green-generators-green-based-upgrade";
import {RedGeneratorsBoosterIncreaseUpgrade} from "../../features/upgrades/red-generators-booster-increase-upgrade";
import {GreenBuffsYellowGeneratorsUpgrade} from "../../features/upgrades/green-buffs-yellow-generators-upgrade";
import {FusionBoostRedGeneratorsUpgrade} from "../../features/upgrades/fusion-boost-red-generators-upgrade";
import {RemoveFusionLimitUpgrade} from "../../features/upgrades/remove-fusion-limit-upgrade";
import {SuperIncreaseFusionUpgrade} from "../../features/upgrades/super-increase-fusion-upgrade";
import {NerfDarkAgeUpgrade} from "../../features/upgrades/nerf-dark-age-upgrade";
import {YellowIdleGainUpgrade} from "../../features/upgrades/yellow-idle-gain-upgrade";
import {DarkCompressorUpgrade} from "../../features/upgrades/dark-compressor-upgrade";
import {DarkYellowFusionUpgrade} from "../../features/upgrades/dark-yellow-fusion-upgrade";
import {DarkGreenGeneratorsUpgrade} from "../../features/upgrades/dark-green-generators-upgrade";
import {DarkYellowGeneratorsUpgrade} from "../../features/upgrades/dark-yellow-generators-upgrade";
import {DarkRedGeneratorsUpgrade} from "../../features/upgrades/dark-red-generators-upgrade";
import {DarkRedAcceleratorsUpgrade} from "../../features/upgrades/dark-red-accelerators-upgrade";
import {NuclearDecayBoosterUpgrade} from "../../features/upgrades/nuclear-decay-booster-upgrade";
import {NuclearDecayIncreaserUpgrade} from "../../features/upgrades/nuclear-decay-increaser-upgrade";
import {BetterNuclearDecayUpgrade} from "../../features/upgrades/better-nuclear-decay-upgrade";

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

  // Green Phase
  static redParticleSacrifice: RedParticleSacrificeUpgrade = new RedParticleSacrificeUpgrade();
  static yellowParticleSacrifice: YellowParticleSacrificeUpgrade = new YellowParticleSacrificeUpgrade();
  static greenParticleSacrifice: GreenParticleSacrificeUpgrade = new GreenParticleSacrificeUpgrade();

  static redAcceleratorBuffer: RedAcceleratorBufferUpgrade = new RedAcceleratorBufferUpgrade();
  static greenGeneratorsEnergyBased: GreenGeneratorsEnergyBasedUpgrade = new GreenGeneratorsEnergyBasedUpgrade();
  static acceleratorYellowPowerBased: AcceleratorYellowPowerBasedUpgrade = new AcceleratorYellowPowerBasedUpgrade();
  static greenGeneratorsBased: GreenGeneratorsGreenBasedUpgrade = new GreenGeneratorsGreenBasedUpgrade();
  static redGeneratorsBoosterIncrease: RedGeneratorsBoosterIncreaseUpgrade = new RedGeneratorsBoosterIncreaseUpgrade();
  static greenBuffsYellowGenerators: GreenBuffsYellowGeneratorsUpgrade = new GreenBuffsYellowGeneratorsUpgrade();
  static fusionBoostRedGenerators: FusionBoostRedGeneratorsUpgrade = new FusionBoostRedGeneratorsUpgrade();
  static removeFusionLimit: RemoveFusionLimitUpgrade = new RemoveFusionLimitUpgrade();
  static superIncreaseFusion: SuperIncreaseFusionUpgrade = new SuperIncreaseFusionUpgrade();
  static nerfDarkAge: NerfDarkAgeUpgrade = new NerfDarkAgeUpgrade();
  static yellowIdleGain: YellowIdleGainUpgrade = new YellowIdleGainUpgrade();

  static darkCompressor: DarkCompressorUpgrade = new DarkCompressorUpgrade();

  static darkYellowFusion: DarkYellowFusionUpgrade = new DarkYellowFusionUpgrade();
  static darkGreenGenerators: DarkGreenGeneratorsUpgrade = new DarkGreenGeneratorsUpgrade();
  static darkYellowGenerators: DarkYellowGeneratorsUpgrade = new DarkYellowGeneratorsUpgrade();
  static darkRedGenerators: DarkRedGeneratorsUpgrade = new DarkRedGeneratorsUpgrade();
  static darkRedAccelerators: DarkRedAcceleratorsUpgrade = new DarkRedAcceleratorsUpgrade();

  static nuclearDecayBooster: NuclearDecayBoosterUpgrade = new NuclearDecayBoosterUpgrade();
  static nuclearDecayIncreaser: NuclearDecayIncreaserUpgrade = new NuclearDecayIncreaserUpgrade();
  static betterNuclearDecay: BetterNuclearDecayUpgrade = new BetterNuclearDecayUpgrade();

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
    UpgradeRecord.increaseYellowFusion,

    UpgradeRecord.redParticleSacrifice,
    UpgradeRecord.yellowParticleSacrifice,
    UpgradeRecord.greenParticleSacrifice,

    UpgradeRecord.redAcceleratorBuffer,
    UpgradeRecord.greenGeneratorsEnergyBased,
    UpgradeRecord.acceleratorYellowPowerBased,
    UpgradeRecord.greenGeneratorsBased,
    UpgradeRecord.redGeneratorsBoosterIncrease,
    UpgradeRecord.greenBuffsYellowGenerators,
    UpgradeRecord.fusionBoostRedGenerators,
    UpgradeRecord.removeFusionLimit,
    UpgradeRecord.superIncreaseFusion,
    UpgradeRecord.nerfDarkAge,
    UpgradeRecord.yellowIdleGain,

    UpgradeRecord.darkCompressor,

    UpgradeRecord.darkYellowFusion,
    UpgradeRecord.darkGreenGenerators,
    UpgradeRecord.darkYellowGenerators,
    UpgradeRecord.darkRedGenerators,
    UpgradeRecord.darkRedAccelerators,

    UpgradeRecord.nuclearDecayBooster,
    UpgradeRecord.nuclearDecayIncreaser,
    UpgradeRecord.betterNuclearDecay,
  ]

  getRedGeneratorExtension(): RedGeneratorExtensionUpgrade {
    return UpgradeRecord.redGeneratorExtension;
  }

  getRedGeneratorBooster(): RedGeneratorBoosterUpgrade {
    return UpgradeRecord.redGeneratorBooster;
  }

  getList(): Upgrade[] {
    return UpgradeRecord.list;
  }
}
