import {Record} from "../record";
import {Upgrade} from "../../features/upgrade";
import {RedGeneratorExtensionUpgrade} from "../../features/upgrades/red-generator-extension-upgrade";
import { Injectable } from '@angular/core';
import {RedGeneratorBoosterUpgrade} from "../../features/upgrades/red-generator-booster-upgrade";
import {UnlockRedAcceleratorsUpgrade} from "../../features/upgrades/unlock-red-accelerators-upgrade";
import {MultiplyRedAcceletorGenerationUpgrade} from "../../features/upgrades/multiply-red-acceletor-generation-upgrade";
import {ImproveRedAcceleratorsEffectUpgrade} from "../../features/upgrades/improve-red-accelerators-effect-upgrade";
import {
  ImproveRedParticlesToAcceleratorsUpgrade
} from "../../features/upgrades/improve-red-particles-to-accelerators-upgrade";
import {BoosterAccelerationUpgrade} from "../../features/upgrades/booster-acceleration-upgrade";
import {MultiplyRedAcceleratorEffectUpgrade} from "../../features/upgrades/multiply-red-accelerator-effect-upgrade";
import {MultiplyRedGeneratorsYellowUpgrade} from "../../features/upgrades/multiply-red-generators-yellow-upgrade";
import {MultiplyYellowParticlesYellowUpgrade} from "../../features/upgrades/multiply-yellow-particles-yellow-upgrade";
import {
  MultiplyRedGeneratorExtensionYellowUpgrade
} from "../../features/upgrades/multiply-red-generator-extension-yellow-upgrade";
import {BreakYellowFusionLimitYellowUpgrade} from "../../features/upgrades/break-yellow-fusion-limit-yellow-upgrade";



import { RedGeneratorMultiplierYellowPrestigeYellowUpgrade } from "../../features/upgrades/red-generator-multiplier-yellow-prestige-yellow-upgrade";
import {StartWithMoreRedExtensionsUpgrade} from "../../features/upgrades/start-with-more-red-extensions-upgrade";
import {NoResetRedExtensionsUpgrade} from "../../features/upgrades/no-reset-red-extensions-upgrade";
import {
  IncreaseRedGeneratorSubMultipliersUpgrade
} from "../../features/upgrades/increase-red-generator-sub-multipliers-upgrade";
import {
  IncreaseRedGeneratorBuyMultipliersUpgrade
} from "../../features/upgrades/increase-red-generator-buy-multipliers-upgrade";
import {MultiplyYellowKeyGainUpgrade} from "../../features/upgrades/multiply-yellow-key-gain-upgrade";
import {ImproveFasterAccelerationYellowUpgrade} from "../../features/upgrades/improve-faster-acceleration-yellow-upgrade";
import {ImproveMultiplyAcceleratorEffectYellowUpgrade} from "../../features/upgrades/improve-multiply-accelerator-effect-yellow-upgrade";
import {ImproveBetterAccelerationYellowUpgrade} from "../../features/upgrades/improve-better-acceleration-yellow-upgrade";
import {ImproveBetterParticleEffectYellowUpgrade} from "../../features/upgrades/improve-better-particle-effect-yellow-upgrade";
import {BreakYellowBarrierUpgrade} from "../../features/upgrades/break-yellow-barrier-upgrade";
import {YellowPowerUpgrade} from "../../features/upgrades/yellow-power-upgrade";
import {IncreaseHydrogenHoldingUpgrade} from "../../features/upgrades/increase-hydrogen-holding-upgrade";
import {IncreaseHydrogenEffectUpgrade} from "../../features/upgrades/increase-hydrogen-effect-upgrade";
import {IncreaseProximaCentauriGoalUpgrade} from "../../features/upgrades/increase-proxima-centauri-goal-upgrade";
import {IncreaseLalandeGoalUpgrade} from "../../features/upgrades/increase-lalande-goal-upgrade";
import {IncreaseSunGoalUpgrade} from "../../features/upgrades/increase-sun-goal-upgrade";
import {IncreaseSiriusGoalUpgrade} from "../../features/upgrades/increase-sirius-goal-upgrade";
import {FusionBoosterAccelerationUpgrade} from "../../features/upgrades/fusion-booster-acceleration-upgrade";
import {
  IncreaseMaxFusionBoosterAccelerationUpgrade
} from "../../features/upgrades/increase-max-fusion-booster-acceleration-upgrade";
import {UnlockFourthYellowGeneratorUpgrade} from "../../features/upgrades/unlock-fourth-yellow-generator-upgrade";
import {UnlockFifthYellowGeneratorUpgrade} from "../../features/upgrades/unlock-fifth-yellow-generator-upgrade";
import {DecreaseRedGeneratorScalingUpgrade} from "../../features/upgrades/decrease-red-generator-scaling-upgrade";
import {DecreaseRedGeneratorBoosterScalingUpgrade} from "../../features/upgrades/decrease-red-generator-booster-scaling-upgrade";
import {
  StopRedBoosterAccelerationResetUpgrade
} from "../../features/upgrades/stop-red-booster-acceleration-reset-upgrade";
import {RedParticleSacrificeUpgrade} from "../../features/upgrades/red-particle-sacrifice-upgrade";
import {YellowParticleSacrificeUpgrade} from "../../features/upgrades/yellow-particle-sacrifice-upgrade";
import {GreenParticleSacrificeUpgrade} from "../../features/upgrades/green-particle-sacrifice-upgrade";
import {
  UnlockFirstGreenGeneratorGalaxyTreeUpgrade
} from "../../features/upgrades/unlock-first-green-generator-galaxy-tree-upgrade";
import {
  HalfRedGeneratorIncreaseGalaxyTreeUpgrade
} from "../../features/generators/half-red-generator-increase-galaxy-tree-upgrade";
import {RedAcceleratorStartGalaxyTreeUpgrade} from "../../features/upgrades/red-accelerator-start-galaxy-tree-upgrade";
import {MoreYellowKeysGalaxyTreeUpgrade} from "../../features/upgrades/more-yellow-keys-galaxy-tree-upgrade";
import {
  StrongerRedExtensionGalaxyTreeUpgrade
} from "../../features/automators/stronger-red-extension-galaxy-tree-upgrade";
import {
  DecreaseBoosterAccelerationScalingGalaxyTreeUpgrade
} from "../../features/automators/decrease-booster-acceleration-scaling-galaxy-tree-upgrade";
import { EnhancedDarkEnergyGalaxyTreeUpgrade } from "../../features/upgrades/enhanced-dark-energy-galaxy-tree-upgrade";
import { GreaterDarkEnergyGalaxyTreeUpgrade } from "../../features/upgrades/greater-dark-energy-galaxy-tree-upgrade";
import { SuperiorDarkEnergyGalaxyTreeUpgrade } from "../../features/upgrades/superior-dark-energy-galaxy-tree-upgrade";
import { CosmicDarkEnergyGalaxyTreeUpgrade } from "../../features/upgrades/cosmic-dark-energy-galaxy-tree-upgrade";
import { UltimateDarkEnergyGalaxyTreeUpgrade } from "../../features/upgrades/ultimate-dark-energy-galaxy-tree-upgrade";
import { BoosterEfficiencyGalaxyTreeUpgrade } from "../../features/upgrades/booster-efficiency-galaxy-tree-upgrade";
import { BoosterMasteryGalaxyTreeUpgrade } from "../../features/upgrades/booster-mastery-galaxy-tree-upgrade";
import { BoosterOverdriveGalaxyTreeUpgrade } from "../../features/upgrades/booster-overdrive-galaxy-tree-upgrade";
import { RedExtensionMasteryGalaxyTreeUpgrade } from "../../features/upgrades/red-extension-mastery-galaxy-tree-upgrade";
import { RedExtensionSupremacyGalaxyTreeUpgrade } from "../../features/upgrades/red-extension-supremacy-galaxy-tree-upgrade";

@Injectable({
  providedIn: 'root'
})
export class UpgradeRecord extends Record {

  // Red Generators
  static redGeneratorExtension: RedGeneratorExtensionUpgrade = new RedGeneratorExtensionUpgrade('redGeneratorExtension');
  static redGeneratorBooster: RedGeneratorBoosterUpgrade = new RedGeneratorBoosterUpgrade('redGeneratorBooster');

  // Red Accelerators
  static unlockRedAccelerators: UnlockRedAcceleratorsUpgrade = new UnlockRedAcceleratorsUpgrade('unlockRedAccelerators');
  static multiplyRedAcceleratorGeneration: MultiplyRedAcceletorGenerationUpgrade = new MultiplyRedAcceletorGenerationUpgrade('multiplyRedAcceleratorGeneration');
  static multiplyRedAcceleratorEffectUpgrade: MultiplyRedAcceleratorEffectUpgrade = new MultiplyRedAcceleratorEffectUpgrade('multiplyRedAcceleratorEffectUpgrade');
  static improveRedAcceleratorsEffect: ImproveRedAcceleratorsEffectUpgrade = new ImproveRedAcceleratorsEffectUpgrade('improveRedAcceleratorsEffect');
  static improveRedParticlesToAcceleratorsUpgrade: ImproveRedParticlesToAcceleratorsUpgrade = new ImproveRedParticlesToAcceleratorsUpgrade('improveRedParticlesToAcceleratorsUpgrade');
  static boosterAccelerationUpgrade: BoosterAccelerationUpgrade = new BoosterAccelerationUpgrade('boosterAccelerationUpgrade');

  // Yellow Upgrades
  static multiplyRedGeneratorsYellow: MultiplyRedGeneratorsYellowUpgrade = new MultiplyRedGeneratorsYellowUpgrade('multiplyRedGeneratorsYellow');
  static multiplyYellowParticlesYellow: MultiplyYellowParticlesYellowUpgrade = new MultiplyYellowParticlesYellowUpgrade('multiplyYellowParticlesYellow');
  static redGeneratorMultiplierYellowPrestigeYellow: RedGeneratorMultiplierYellowPrestigeYellowUpgrade = new RedGeneratorMultiplierYellowPrestigeYellowUpgrade('redGeneratorMultiplierYellowPrestigeYellow');
  static multiplyRedGeneratorExtensionYellow: MultiplyRedGeneratorExtensionYellowUpgrade = new MultiplyRedGeneratorExtensionYellowUpgrade('multiplyRedGeneratorExtensionYellow');
  static startWithMoreRedExtensionsUpgrade: StartWithMoreRedExtensionsUpgrade = new StartWithMoreRedExtensionsUpgrade('startWithMoreRedExtensionsUpgrade');
  static noResetRedExtension: NoResetRedExtensionsUpgrade = new NoResetRedExtensionsUpgrade('noResetRedExtension');
  static increaseRedGeneratorSubMultipliers: IncreaseRedGeneratorSubMultipliersUpgrade = new IncreaseRedGeneratorSubMultipliersUpgrade('increaseGeneratorSubMultipliers');
  static increaseRedGeneratorBuyMultipliers: IncreaseRedGeneratorBuyMultipliersUpgrade = new IncreaseRedGeneratorBuyMultipliersUpgrade('increaseGeneratorBuyMultipliers');
  static multiplyYellowKeyGain: MultiplyYellowKeyGainUpgrade = new MultiplyYellowKeyGainUpgrade('multiplyYellowKeyGain');
  static improveFasterAccelerationYellow: ImproveFasterAccelerationYellowUpgrade = new ImproveFasterAccelerationYellowUpgrade('improveFasterAccelerationYellow');
  static improveMultiplyAcceleratorEffectYellow: ImproveMultiplyAcceleratorEffectYellowUpgrade = new ImproveMultiplyAcceleratorEffectYellowUpgrade('improveMultiplyAcceleratorEffectYellow');
  static improveBetterAccelerationYellow: ImproveBetterAccelerationYellowUpgrade = new ImproveBetterAccelerationYellowUpgrade('improveBetterAccelerationYellow');
  static improveBetterParticleEffectYellow: ImproveBetterParticleEffectYellowUpgrade = new ImproveBetterParticleEffectYellowUpgrade('improveBetterParticleEffectYellow');
  static breakYellowBarrier: BreakYellowBarrierUpgrade = new BreakYellowBarrierUpgrade('breakYellowBarrier');

  // Break upgrades
  static unlockFourthYellowGenerator: UnlockFourthYellowGeneratorUpgrade = new UnlockFourthYellowGeneratorUpgrade('unlockFourthYellowGenerator');
  static unlockFifthYellowGenerator: UnlockFifthYellowGeneratorUpgrade = new UnlockFifthYellowGeneratorUpgrade('unlockFifthYellowGenerator');
  static decreaseRedGeneratorScaling: DecreaseRedGeneratorScalingUpgrade = new DecreaseRedGeneratorScalingUpgrade('decreaseRedGeneratorScaling');
  static decreaseRedGeneratorBoosterScaling: DecreaseRedGeneratorBoosterScalingUpgrade = new DecreaseRedGeneratorBoosterScalingUpgrade('decreaseRedGeneratorBoosterScaling');
  static stopRedBoosterAccelerationReset: StopRedBoosterAccelerationResetUpgrade = new StopRedBoosterAccelerationResetUpgrade('stopRedBoosterAccelerationReset');
static breakYellowFusionLimitYellow: BreakYellowFusionLimitYellowUpgrade = new BreakYellowFusionLimitYellowUpgrade('breakYellowFusionLimitYellow');

  // Yellow generator upgrades
  static yellowPower: YellowPowerUpgrade = new YellowPowerUpgrade('yellowPowerUpgrade');

  // yellow fusion upgrades
  static increaseHydrogen: IncreaseHydrogenHoldingUpgrade = new IncreaseHydrogenHoldingUpgrade('increaseHydrogen');
  static increaseHydrogenEffect: IncreaseHydrogenEffectUpgrade = new IncreaseHydrogenEffectUpgrade('increaseHydrogenEffect');
  static increaseProximaCentauriGoal: IncreaseProximaCentauriGoalUpgrade = new IncreaseProximaCentauriGoalUpgrade('increaseProximaCentauriGoal');
  static increaseLalandeGoal: IncreaseLalandeGoalUpgrade = new IncreaseLalandeGoalUpgrade('increaseLalandeGoal');
  static increaseSunGoal: IncreaseSunGoalUpgrade = new IncreaseSunGoalUpgrade('increaseSunGoal');
  static increaseSiriusGoal: IncreaseSiriusGoalUpgrade = new IncreaseSiriusGoalUpgrade('increaseSiriusGoal');
  static fusionBoosterAcceleration: FusionBoosterAccelerationUpgrade = new FusionBoosterAccelerationUpgrade('fusionBoosterAcceleration');
  static increaseMaxFusionBoosterAcceleration: IncreaseMaxFusionBoosterAccelerationUpgrade = new IncreaseMaxFusionBoosterAccelerationUpgrade('increaseMaxFusionBoosterAcceleration');

  // green galaxy tree upgrades
  static redParticleSacrifice: RedParticleSacrificeUpgrade = new RedParticleSacrificeUpgrade('redParticleSacrifice');
  static yellowParticleSacrifice: YellowParticleSacrificeUpgrade = new YellowParticleSacrificeUpgrade('yellowParticleSacrifice');
  static greenParticleSacrifice: GreenParticleSacrificeUpgrade = new GreenParticleSacrificeUpgrade('greenParticleSacrifice');

  static unlockFirstGreenGenerator: UnlockFirstGreenGeneratorGalaxyTreeUpgrade = new UnlockFirstGreenGeneratorGalaxyTreeUpgrade('unlockFirstGreenGenerator');
  static halfRedGeneratorIncrease: HalfRedGeneratorIncreaseGalaxyTreeUpgrade = new HalfRedGeneratorIncreaseGalaxyTreeUpgrade('halfRedGeneratorIncrease');
  static redAcceleratorStart: RedAcceleratorStartGalaxyTreeUpgrade = new RedAcceleratorStartGalaxyTreeUpgrade('redAcceleratorStart');
  static moreYellowKeys: MoreYellowKeysGalaxyTreeUpgrade = new MoreYellowKeysGalaxyTreeUpgrade('moreYellowKeys');
  static strongerRedExtensionGalaxyTree: StrongerRedExtensionGalaxyTreeUpgrade = new StrongerRedExtensionGalaxyTreeUpgrade('strongerRedExtensionGalaxyTree');
  static decreaseBoosterAccelerationScaling: DecreaseBoosterAccelerationScalingGalaxyTreeUpgrade = new DecreaseBoosterAccelerationScalingGalaxyTreeUpgrade('decreaseBoosterAccelerationScalingGalaxyTree');
  static enhancedDarkEnergyGalaxyTree: EnhancedDarkEnergyGalaxyTreeUpgrade = new EnhancedDarkEnergyGalaxyTreeUpgrade('enhancedDarkEnergyGalaxyTree');
  static greaterDarkEnergyGalaxyTree: GreaterDarkEnergyGalaxyTreeUpgrade = new GreaterDarkEnergyGalaxyTreeUpgrade('greaterDarkEnergyGalaxyTree');
  static superiorDarkEnergyGalaxyTree: SuperiorDarkEnergyGalaxyTreeUpgrade = new SuperiorDarkEnergyGalaxyTreeUpgrade('superiorDarkEnergyGalaxyTree');
  static cosmicDarkEnergyGalaxyTree: CosmicDarkEnergyGalaxyTreeUpgrade = new CosmicDarkEnergyGalaxyTreeUpgrade('cosmicDarkEnergyGalaxyTree');
  static ultimateDarkEnergyGalaxyTree: UltimateDarkEnergyGalaxyTreeUpgrade = new UltimateDarkEnergyGalaxyTreeUpgrade('ultimateDarkEnergyGalaxyTree');
  static boosterEfficiencyGalaxyTree: BoosterEfficiencyGalaxyTreeUpgrade = new BoosterEfficiencyGalaxyTreeUpgrade('boosterEfficiencyGalaxyTree');
  static boosterMasteryGalaxyTree: BoosterMasteryGalaxyTreeUpgrade = new BoosterMasteryGalaxyTreeUpgrade('boosterMasteryGalaxyTree');
  static boosterOverdriveGalaxyTree: BoosterOverdriveGalaxyTreeUpgrade = new BoosterOverdriveGalaxyTreeUpgrade('boosterOverdriveGalaxyTree');
  static redExtensionMasteryGalaxyTree: RedExtensionMasteryGalaxyTreeUpgrade = new RedExtensionMasteryGalaxyTreeUpgrade('redExtensionMasteryGalaxyTree');
  static redExtensionSupremacyGalaxyTree: RedExtensionSupremacyGalaxyTreeUpgrade = new RedExtensionSupremacyGalaxyTreeUpgrade('redExtensionSupremacyGalaxyTree');


  static override list: Upgrade[] = [
    UpgradeRecord.redGeneratorExtension,
    UpgradeRecord.redGeneratorBooster,

    UpgradeRecord.unlockRedAccelerators,
    UpgradeRecord.multiplyRedAcceleratorGeneration,
    UpgradeRecord.multiplyRedAcceleratorEffectUpgrade,
    UpgradeRecord.improveRedAcceleratorsEffect,
    UpgradeRecord.improveRedParticlesToAcceleratorsUpgrade,
    UpgradeRecord.boosterAccelerationUpgrade,

    // Yellow Upgrades
    UpgradeRecord.multiplyRedGeneratorsYellow,
    UpgradeRecord.multiplyYellowParticlesYellow,
    UpgradeRecord.redGeneratorMultiplierYellowPrestigeYellow,
    UpgradeRecord.multiplyRedGeneratorExtensionYellow,
    UpgradeRecord.startWithMoreRedExtensionsUpgrade,
    UpgradeRecord.increaseRedGeneratorSubMultipliers,
    UpgradeRecord.increaseRedGeneratorBuyMultipliers,
    UpgradeRecord.noResetRedExtension,
    UpgradeRecord.multiplyYellowKeyGain,
    UpgradeRecord.improveFasterAccelerationYellow,
    UpgradeRecord.improveMultiplyAcceleratorEffectYellow,
    UpgradeRecord.improveBetterAccelerationYellow,
    UpgradeRecord.improveBetterParticleEffectYellow,
    UpgradeRecord.breakYellowBarrier,

    // Yellow break upgrades
    UpgradeRecord.unlockFourthYellowGenerator,
    UpgradeRecord.unlockFifthYellowGenerator,
    UpgradeRecord.stopRedBoosterAccelerationReset,
    UpgradeRecord.decreaseRedGeneratorScaling,
    UpgradeRecord.decreaseRedGeneratorBoosterScaling,
UpgradeRecord.breakYellowFusionLimitYellow, // <-- add here

    // Yellow generator upgrades
    UpgradeRecord.yellowPower,

    // Yellow fusion upgrades
    UpgradeRecord.increaseHydrogen,
    UpgradeRecord.increaseHydrogenEffect,
    UpgradeRecord.increaseProximaCentauriGoal,
    UpgradeRecord.increaseLalandeGoal,
    UpgradeRecord.increaseSunGoal,
    UpgradeRecord.increaseSiriusGoal,
    UpgradeRecord.increaseMaxFusionBoosterAcceleration,
    UpgradeRecord.fusionBoosterAcceleration,

    // Green galaxy tree upgrades
    UpgradeRecord.redParticleSacrifice,
    UpgradeRecord.yellowParticleSacrifice,
    UpgradeRecord.greenParticleSacrifice,

    UpgradeRecord.unlockFirstGreenGenerator,
    UpgradeRecord.halfRedGeneratorIncrease,
    UpgradeRecord.redAcceleratorStart,
    UpgradeRecord.moreYellowKeys,
    UpgradeRecord.strongerRedExtensionGalaxyTree,
    UpgradeRecord.decreaseBoosterAccelerationScaling,
    UpgradeRecord.enhancedDarkEnergyGalaxyTree,
    UpgradeRecord.greaterDarkEnergyGalaxyTree,
    UpgradeRecord.superiorDarkEnergyGalaxyTree,
    UpgradeRecord.cosmicDarkEnergyGalaxyTree,
    UpgradeRecord.ultimateDarkEnergyGalaxyTree,
    UpgradeRecord.boosterEfficiencyGalaxyTree,
    UpgradeRecord.boosterMasteryGalaxyTree,
    UpgradeRecord.boosterOverdriveGalaxyTree,
    UpgradeRecord.redExtensionMasteryGalaxyTree,
    UpgradeRecord.redExtensionSupremacyGalaxyTree,

  ]

  getList(): Upgrade[] {
    return UpgradeRecord.list;
  }

  save() {
    this.getList().forEach(upgrade => {
      upgrade.save();
    });
  }

  load() {
    this.getList().forEach(upgrade => {
      upgrade.tryLoad();
    });
  }

  init() {
    this.getList().forEach(upgrade => {
      upgrade.init();
    });
  }
}
