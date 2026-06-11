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
import {MultiplyGreenParticlesGreenUpgrade} from "../../features/upgrades/multiply-green-particles-green-upgrade";
import {
  UnlockFirstGreenGeneratorGalaxyTreeUpgrade
} from "../../features/upgrades/unlock-first-green-generator-galaxy-tree-upgrade";
import {
  BetterRedGeneratorsMultiplierGalaxyTreeUpgrade
} from "../../features/generators/better-red-generators-multiplier-galaxy-tree-upgrade";
import {RedAcceleratorStartGalaxyTreeUpgrade} from "../../features/upgrades/red-accelerator-start-galaxy-tree-upgrade";
import {BetterYellowKeyGalaxyTreeUpgrade} from "../../features/upgrades/better-yellow-key-galaxy-tree-upgrade";
import {
  StrongerRedExtensionGalaxyTreeUpgrade
} from "../../features/automators/stronger-red-extension-galaxy-tree-upgrade";
import {
  StrongerBoosterAccelerationPowerGalaxyTreeUpgrade
} from "../../features/automators/stronger-booster-acceleration-power-galaxy-tree-upgrade";
import {
  CheaperBoosterAccelerationGalaxyTreeUpgrade
} from "../../features/upgrades/cheaper-booster-acceleration-galaxy-tree-upgrade";
import {
  FasterHydrogenGenerationGalaxyTreeUpgrade
} from "../../features/upgrades/faster-hydrogen-generation-galaxy-tree-upgrade";
import {StrongerYellowPowerGalaxyTreeUpgrade} from "../../features/upgrades/stronger-yellow-power-galaxy-tree-upgrade";
import {GalaxyTreeUpgrade} from "../../features/upgrades/galaxy-tree-upgrade";
import {StrongerHydrogenGalaxyTreeUpgrade} from "../../features/upgrades/stronger-hydrogen-galaxy-tree-upgrade";
import {StrongerYellowFusionGalaxyTreeUpgrade} from "../../features/upgrades/stronger-yellow-fusion-galaxy-tree-upgrade";
import {
  FusedAccelerationGalaxyTreeUpgrade
} from "../../features/upgrades/fused-acceleration-galaxy-tree-upgrade";
import {
  BetterRedBoosterGalaxyTreeUpgrade
} from "../../features/upgrades/better-red-booster-galaxy-tree-upgrade";
import {
  BetterRedSubMultipliersGalaxyTreeUpgrade
} from "../../features/upgrades/better-red-sub-multipliers-galaxy-tree-upgrade";
import {
  BetterYellowGeneratorsGalaxyTreeUpgrade
} from "../../features/upgrades/better-yellow-generators-galaxy-tree-upgrade";
import {
  BetterYellowMultipliersGalaxyTreeUpgrade
} from "../../features/upgrades/better-yellow-multipliers-galaxy-tree-upgrade";
import {
  AmplifiedYellowKeysGalaxyTreeUpgrade
} from "../../features/upgrades/amplified-yellow-keys-galaxy-tree-upgrade";
import {
  SynergizedPowerGalaxyTreeUpgrade
} from "../../features/upgrades/synergized-power-galaxy-tree-upgrade";
import {
  AmplifiedFusionGalaxyTreeUpgrade
} from "../../features/upgrades/amplified-fusion-galaxy-tree-upgrade";
import {
  PowerAccelerationGalaxyTreeUpgrade
} from "../../features/upgrades/power-acceleration-galaxy-tree-upgrade";
import {
  RedExpertiseGalaxyTreeUpgrade
} from "../../features/upgrades/red-expertise-galaxy-tree-upgrade";
import {
  AcceleratorExpertiseGalaxyTreeUpgrade
} from "../../features/upgrades/accelerator-expertise-galaxy-tree-upgrade";
import {
  YellowExpertiseGalaxyTreeUpgrade
} from "../../features/upgrades/yellow-expertise-galaxy-tree-upgrade";
import {FusionExpertiseGalaxyTreeUpgrade} from "../../features/upgrades/fusion-expertise-galaxy-tree-upgrade";
import {EmpoweredBoosterAccelerationUpgrade} from "../../features/upgrades/empowered-booster-acceleration-upgrade";
import {UltraRedExtensionStarKeyUpgrade} from "../../features/upgrades/ultra-red-extension-star-key-upgrade";
import {DelayedBoosterScalingStarKeyUpgrade} from "../../features/upgrades/delayed-booster-scaling-star-key-upgrade";
import {
  UltraBoosterAccelerationStarKeyUpgrade
} from "../../features/upgrades/ultra-booster-acceleration-star-key-upgrade";
import {UltraYellowPowerStarKeyUpgrade} from "../../features/upgrades/ultra-yellow-power-star-key-upgrade";
import {StarKeyUpgrade} from "../../features/upgrades/star-key-upgrade";
import {IncreaseKeyAmountStarKeySubUpgrade} from "../../features/upgrades/increase-key-amount-star-key-sub-upgrade";
import {
  IncreaseCompressionSpeedStarKeySubUpgrade
} from "../../features/upgrades/increase-compression-speed-star-key-sub-upgrade";
import {
  DecreaseMultiplyYellowKeysScalingStarKeySubUpgrade
} from "../../features/upgrades/decrease-multiply-yellow-keys-scaling-star-key-sub-upgrade";
import {UltraMultiplyRedGeneratorsStarKeyUpgrade} from "../../features/upgrades/ultra-multiply-red-generators-star-key-upgrade";
import {
  UltraFusionBoosterAccelerationStarKeyUpgrade
} from "../../features/upgrades/ultra-fusion-booster-acceleration-star-key-upgrade";
import {
  UltraYellowPrestigeBoostStarKeyUpgrade
} from "../../features/upgrades/ultra-yellow-prestige-boost-star-key-upgrade";
import {GreaterProximaCentauriStarKeyUpgrade} from "../../features/upgrades/greater-proxima-centauri-star-key-upgrade";
import {UnlockStarKeyCompressionUpgrade} from "../../features/upgrades/unlock-star-key-compression-upgrade";
import {
  ImproveFusionCompressionGalaxyTreeUpgrade
} from "../../features/upgrades/improve-fusion-compression-galaxy-tree-upgrade";
import {
  UnlockSecondGreenGeneratorGalaxyTreeUpgrade
} from "../../features/upgrades/unlock-second-green-generator-galaxy-tree-upgrade";
import {MoreYellowParticlesGalaxyTreeUpgrade} from "../../features/upgrades/more-yellow-particles-galaxy-tree-upgrade";
import {YellowUpgrade} from "../../features/upgrades/yellow-upgrade";
import {
  SlowerCompressionTimeIncreaseGalaxyTreeUpgrade
} from "../../features/upgrades/slower-compression-time-increase-galaxy-tree-upgrade";
import { BetterRedAcceleratorGenerationGalaxyTreeUpgrade } from "../../features/upgrades/better-red-accelerator-generation-galaxy-tree-upgrade";
import { BetterRedAcceleratorEffectGalaxyTreeUpgrade } from "../../features/upgrades/better-red-accelerator-effect-galaxy-tree-upgrade";
import {HydrogenCompressionGalaxyTreeUpgrade} from "../../features/upgrades/hydrogen-compression-galaxy-tree-upgrade";
import {
  AcceleratedCompressionGalaxyTreeUpgrade
} from "../../features/upgrades/accelerated-compression-galaxy-tree-upgrade";
import {PoweredCompressionGalaxyTreeUpgrade} from "../../features/upgrades/powered-compression-galaxy-tree-upgrade";
import {GeneratedCompressionGalaxyTreeUpgrade} from "../../features/upgrades/generated-compression-galaxy-tree-upgrade";
import {ExpandedYellowKeyScalingGalaxyTreeUpgrade} from "../../features/upgrades/expanded-yellow-key-scaling-galaxy-tree-upgrade";
import {
  CheaperFifthYellowGeneratorGalaxyTreeUpgrade
} from "../../features/upgrades/cheaper-fifth-yellow-generator-galaxy-tree-upgrade";
import {
  CheaperFourthYellowGeneratorGalaxyTreeUpgrade
} from "../../features/upgrades/cheaper-fourth-yellow-generator-galaxy-tree-upgrade";
import {
  HydrogenSynergyGalaxyTreeUpgrade
} from "../../features/upgrades/hydrogen-synergy-galaxy-tree-upgrade";
import {
  MitigatedDarkGalaxyChallengeGalaxyTreeUpgrade
} from "../../features/upgrades/mitigated-dark-galaxy-challenge-galaxy-tree-upgrade";
import {NuclearUpgrade} from "../../features/upgrades/nuclear-upgrade";
import {GreenKeyUpgrade} from "../../features/upgrades/green-key-upgrade";
import {NuclearConfig} from "../../config/nuclear-config";
import {BlueUpgrade} from "../../features/upgrades/blue-upgrade";
import {Num} from "../../../num";

@Injectable({
  providedIn: 'root'
})
export class UpgradeRecord extends Record {

  static greenKey: GreenKeyUpgrade = new GreenKeyUpgrade('green-key-upgrade');
  static nuclearUpgrades: NuclearUpgrade[] = NuclearConfig.upgrades.map(config => new NuclearUpgrade(config));
  static nuclearFissionGainNuclear: NuclearUpgrade = UpgradeRecord.nuclearUpgrades.find(
    upgrade => upgrade.config.target === 'nuclearFissionGain'
  )!;
  static nuclearPotentialGainNuclear: NuclearUpgrade = UpgradeRecord.nuclearUpgrades.find(
    upgrade => upgrade.config.target === 'nuclearPotentialGain'
  )!;
  static unlockFourthGreenGeneratorNuclear: NuclearUpgrade = UpgradeRecord.nuclearUpgrades.find(
    upgrade => upgrade.config.target === 'unlockGreenGenerator4'
  )!;
  static unlockFifthGreenGeneratorNuclear: NuclearUpgrade = UpgradeRecord.nuclearUpgrades.find(
    upgrade => upgrade.config.target === 'unlockGreenGenerator5'
  )!;
  static blueBeamIntensity: BlueUpgrade = new BlueUpgrade(
    'blueBeamIntensity',
    'blue-beam-intensity',
    'Beam Intensity',
    'Multiply Proton and Electron generation.',
    Num.ONE,
    new Num(1, 1),
    Num.TWO
  );
  static blueColliderEfficiency: BlueUpgrade = new BlueUpgrade(
    'blueColliderEfficiency',
    'blue-collider-efficiency',
    'Collider Efficiency',
    'Multiply Neutrons gained from collisions.',
    new Num(5, 0),
    new Num(2.5, 1),
    new Num(1.5, 0)
  );

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
  static multiplyYellowKeyGain: MultiplyYellowKeyGainUpgrade = new MultiplyYellowKeyGainUpgrade('multiplyYellowKeyGain');
  static redGeneratorMultiplierYellowPrestigeYellow: RedGeneratorMultiplierYellowPrestigeYellowUpgrade = new RedGeneratorMultiplierYellowPrestigeYellowUpgrade('redGeneratorMultiplierYellowPrestigeYellow');
  static multiplyRedGeneratorExtensionYellow: MultiplyRedGeneratorExtensionYellowUpgrade = new MultiplyRedGeneratorExtensionYellowUpgrade('multiplyRedGeneratorExtensionYellow');
  static startWithMoreRedExtensionsUpgrade: StartWithMoreRedExtensionsUpgrade = new StartWithMoreRedExtensionsUpgrade('startWithMoreRedExtensionsUpgrade');
  static noResetRedExtension: NoResetRedExtensionsUpgrade = new NoResetRedExtensionsUpgrade('noResetRedExtension');
  static increaseRedGeneratorSubMultipliers: IncreaseRedGeneratorSubMultipliersUpgrade = new IncreaseRedGeneratorSubMultipliersUpgrade('increaseGeneratorSubMultipliers');
  static increaseRedGeneratorBuyMultipliers: IncreaseRedGeneratorBuyMultipliersUpgrade = new IncreaseRedGeneratorBuyMultipliersUpgrade('increaseGeneratorBuyMultipliers');
  static improveFasterAccelerationYellow: ImproveFasterAccelerationYellowUpgrade = new ImproveFasterAccelerationYellowUpgrade('improveFasterAccelerationYellow');
  static improveMultiplyAcceleratorEffectYellow: ImproveMultiplyAcceleratorEffectYellowUpgrade = new ImproveMultiplyAcceleratorEffectYellowUpgrade('improveMultiplyAcceleratorEffectYellow');
  static improveBetterAccelerationYellow: ImproveBetterAccelerationYellowUpgrade = new ImproveBetterAccelerationYellowUpgrade('improveBetterAccelerationYellow');
  static improveBetterParticleEffectYellow: ImproveBetterParticleEffectYellowUpgrade = new ImproveBetterParticleEffectYellowUpgrade('improveBetterParticleEffectYellow');
  static breakYellowBarrier: BreakYellowBarrierUpgrade = new BreakYellowBarrierUpgrade('breakYellowBarrier');

  // Break upgrades
  static empoweredBoosterAcceleration: EmpoweredBoosterAccelerationUpgrade = new EmpoweredBoosterAccelerationUpgrade('empoweredBoosterAcceleration');
  static decreaseRedGeneratorScaling: DecreaseRedGeneratorScalingUpgrade = new DecreaseRedGeneratorScalingUpgrade('decreaseRedGeneratorScaling');
  static decreaseRedGeneratorBoosterScaling: DecreaseRedGeneratorBoosterScalingUpgrade = new DecreaseRedGeneratorBoosterScalingUpgrade('decreaseRedGeneratorBoosterScaling');
  static unlockFourthYellowGenerator: UnlockFourthYellowGeneratorUpgrade = new UnlockFourthYellowGeneratorUpgrade('unlockFourthYellowGenerator');
  static unlockFifthYellowGenerator: UnlockFifthYellowGeneratorUpgrade = new UnlockFifthYellowGeneratorUpgrade('unlockFifthYellowGenerator');
  static stopRedBoosterAccelerationReset: StopRedBoosterAccelerationResetUpgrade = new StopRedBoosterAccelerationResetUpgrade('stopRedBoosterAccelerationReset');
  static breakYellowFusionLimitYellow: BreakYellowFusionLimitYellowUpgrade = new BreakYellowFusionLimitYellowUpgrade('breakYellowFusionLimitYellow');

  // Yellow generator upgrades
  static yellowPower: YellowPowerUpgrade = new YellowPowerUpgrade('yellowPowerUpgrade');

  // Green generator upgrades
  static multiplyGreenParticlesGreen: MultiplyGreenParticlesGreenUpgrade = new MultiplyGreenParticlesGreenUpgrade('multiplyGreenParticlesGreen');

  // yellow fusion upgrades
  static increaseHydrogen: IncreaseHydrogenHoldingUpgrade = new IncreaseHydrogenHoldingUpgrade('increaseHydrogen');
  static increaseHydrogenEffect: IncreaseHydrogenEffectUpgrade = new IncreaseHydrogenEffectUpgrade('increaseHydrogenEffect');
  static increaseProximaCentauriGoal: IncreaseProximaCentauriGoalUpgrade = new IncreaseProximaCentauriGoalUpgrade('increaseProximaCentauriGoal');
  static increaseLalandeGoal: IncreaseLalandeGoalUpgrade = new IncreaseLalandeGoalUpgrade('increaseLalandeGoal');
  static increaseSunGoal: IncreaseSunGoalUpgrade = new IncreaseSunGoalUpgrade('increaseSunGoal');
  static increaseSiriusGoal: IncreaseSiriusGoalUpgrade = new IncreaseSiriusGoalUpgrade('increaseSiriusGoal');
  static fusionBoosterAcceleration: FusionBoosterAccelerationUpgrade = new FusionBoosterAccelerationUpgrade('fusionBoosterAcceleration');
  static increaseMaxFusionBoosterAcceleration: IncreaseMaxFusionBoosterAccelerationUpgrade = new IncreaseMaxFusionBoosterAccelerationUpgrade('increaseMaxFusionBoosterAcceleration');

  // Star key upgrades
  static increaseKeyAmountStarKeySub: IncreaseKeyAmountStarKeySubUpgrade = new IncreaseKeyAmountStarKeySubUpgrade('increaseKeyAmountStarKeySub');
  static compressionSpeedStarKeySub: IncreaseCompressionSpeedStarKeySubUpgrade = new IncreaseCompressionSpeedStarKeySubUpgrade('compressionSpeedStarKeySub');
  static decreaseMultiplyYellowKeysScalingStarKeySub: DecreaseMultiplyYellowKeysScalingStarKeySubUpgrade = new DecreaseMultiplyYellowKeysScalingStarKeySubUpgrade('decreaseMultiplyYellowKeysScalingStarKeySub');

  static ultraRedExtensionStarKey: UltraRedExtensionStarKeyUpgrade = new UltraRedExtensionStarKeyUpgrade('ultraRedExtensionStarKey');
  static delayedBoosterScalingStarKey: DelayedBoosterScalingStarKeyUpgrade = new DelayedBoosterScalingStarKeyUpgrade('delayedBoosterScalingStarKey');
  static ultraBoosterAccelerationStarKey: UltraBoosterAccelerationStarKeyUpgrade = new UltraBoosterAccelerationStarKeyUpgrade('ultraBoosterAccelerationStarKey');
  static ultraYellowPowerStarKey: UltraYellowPowerStarKeyUpgrade = new UltraYellowPowerStarKeyUpgrade('ultraYellowPowerStarKey');
  static multiplyRedGeneratorsStarKey: UltraMultiplyRedGeneratorsStarKeyUpgrade = new UltraMultiplyRedGeneratorsStarKeyUpgrade('multiplyRedGeneratorsStarKey');
  static ultraFusionBoosterAccelerationStarKey: UltraFusionBoosterAccelerationStarKeyUpgrade = new UltraFusionBoosterAccelerationStarKeyUpgrade('ultraFusionBoosterAccelerationStarKey');
  static ultraYellowPrestigeBoostStarKey: UltraYellowPrestigeBoostStarKeyUpgrade = new UltraYellowPrestigeBoostStarKeyUpgrade('ultraYellowPrestigeBoostStarKey');
  static greaterProximaCentauriStarKey: GreaterProximaCentauriStarKeyUpgrade = new GreaterProximaCentauriStarKeyUpgrade('greaterProximaCentauriStarKey');
  static unlockStarKeyCompression: UnlockStarKeyCompressionUpgrade = new UnlockStarKeyCompressionUpgrade('unlockStarKeyCompression');

  // green galaxy tree upgrades
  static redParticleSacrifice: RedParticleSacrificeUpgrade = new RedParticleSacrificeUpgrade('redParticleSacrifice');
  static yellowParticleSacrifice: YellowParticleSacrificeUpgrade = new YellowParticleSacrificeUpgrade('yellowParticleSacrifice');
  static greenParticleSacrifice: GreenParticleSacrificeUpgrade = new GreenParticleSacrificeUpgrade('greenParticleSacrifice');

  static unlockFirstGreenGeneratorGalaxyTree: UnlockFirstGreenGeneratorGalaxyTreeUpgrade = new UnlockFirstGreenGeneratorGalaxyTreeUpgrade('unlockFirstGreenGenerator');
  // Children: increaseRedGeneratorMultiplier, cheaperBoosterAcceleration, fasterHydrogenGeneration, strongerYellowPower

  static betterRedGeneratorsMultiplierGalaxyTree: BetterRedGeneratorsMultiplierGalaxyTreeUpgrade = new BetterRedGeneratorsMultiplierGalaxyTreeUpgrade('halfRedGeneratorIncrease');
  // Children: redAcceleratorStart, increaseBoosterAccelerationPower
  static betterYellowKeyGainGalaxyTree: BetterYellowKeyGalaxyTreeUpgrade = new BetterYellowKeyGalaxyTreeUpgrade('moreYellowKeys');
  static strongerBoosterAccelerationGalaxyTree: StrongerBoosterAccelerationPowerGalaxyTreeUpgrade = new StrongerBoosterAccelerationPowerGalaxyTreeUpgrade('decreaseBoosterAccelerationScalingGalaxyTree');

  static cheaperBoosterAccelerationGalaxyTree: CheaperBoosterAccelerationGalaxyTreeUpgrade = new CheaperBoosterAccelerationGalaxyTreeUpgrade('cheaperBoosterAcceleration');
  // Children: redAcceleratorStart, strongerRedExtensionGalaxyTree
  static redAcceleratorStartGalaxyTree: RedAcceleratorStartGalaxyTreeUpgrade = new RedAcceleratorStartGalaxyTreeUpgrade('redAcceleratorStart');
  // Children: yellowFusionBoostRedAccelerators
  static strongerRedExtensionGalaxyTree: StrongerRedExtensionGalaxyTreeUpgrade = new StrongerRedExtensionGalaxyTreeUpgrade('strongerRedExtensionGalaxyTree');

  static fasterHydrogenGenerationGalaxyTree: FasterHydrogenGenerationGalaxyTreeUpgrade = new FasterHydrogenGenerationGalaxyTreeUpgrade('fasterHydrogenGeneration');
  // Children: strongerHydrogenGalaxyTree, improveYellowFusion
  static strongerHydrogenGalaxyTree: StrongerHydrogenGalaxyTreeUpgrade = new StrongerHydrogenGalaxyTreeUpgrade('strongerHydrogenGalaxyTree');
  static strongerYellowFusionGalaxyTree: StrongerYellowFusionGalaxyTreeUpgrade = new StrongerYellowFusionGalaxyTreeUpgrade('improveYellowFusion');
  // Children: yellowFusionBoostRedAccelerators
  static fusedAccelerationGalaxyTree: FusedAccelerationGalaxyTreeUpgrade = new FusedAccelerationGalaxyTreeUpgrade('yellowFusionBoostRedAccelerators');

  static strongerYellowPowerGalaxyTree: StrongerYellowPowerGalaxyTreeUpgrade = new StrongerYellowPowerGalaxyTreeUpgrade('strongerYellowPower');

  // New red accelerator galaxy tree upgrades
  static betterRedAcceleratorGenerationGalaxyTree: BetterRedAcceleratorGenerationGalaxyTreeUpgrade = new BetterRedAcceleratorGenerationGalaxyTreeUpgrade('betterRedAcceleratorGenerationGalaxyTree');
  static betterRedAcceleratorEffectGalaxyTree: BetterRedAcceleratorEffectGalaxyTreeUpgrade = new BetterRedAcceleratorEffectGalaxyTreeUpgrade('betterRedAcceleratorEffectGalaxyTree');

  // New red generator upgrades
  static betterRedBoosterGalaxyTree: BetterRedBoosterGalaxyTreeUpgrade = new BetterRedBoosterGalaxyTreeUpgrade('redGeneratorEfficiency');
  static betterRedSubMultipliersGalaxyTree: BetterRedSubMultipliersGalaxyTreeUpgrade = new BetterRedSubMultipliersGalaxyTreeUpgrade('cheaperRedGenerators');

  // New yellow upgrades/generators upgrades
  static betterYellowGeneratorsGalaxyTree: BetterYellowGeneratorsGalaxyTreeUpgrade = new BetterYellowGeneratorsGalaxyTreeUpgrade('betterYellowParticles');
  static betterYellowMultipliersGalaxyTree: BetterYellowMultipliersGalaxyTreeUpgrade = new BetterYellowMultipliersGalaxyTreeUpgrade('strongerYellowGenerators');
  static amplifiedYellowKeysGalaxyTree: AmplifiedYellowKeysGalaxyTreeUpgrade = new AmplifiedYellowKeysGalaxyTreeUpgrade('moreYellowKeysGain');
  static expandedYellowKeyScalingGalaxyTree: ExpandedYellowKeyScalingGalaxyTreeUpgrade = new ExpandedYellowKeyScalingGalaxyTreeUpgrade('expandedYellowKeyScaling');

  // Mix-upgrades between sections (10-25 Dark Energy)
  static synergizedPowerGalaxyTree: SynergizedPowerGalaxyTreeUpgrade = new SynergizedPowerGalaxyTreeUpgrade('redGeneratorsBoostYellowUpgrades');
  static amplifiedFusionGalaxyTree: AmplifiedFusionGalaxyTreeUpgrade = new AmplifiedFusionGalaxyTreeUpgrade('redGeneratorsBoostYellowFusion');
  static powerAccelerationGalaxyTree: PowerAccelerationGalaxyTreeUpgrade = new PowerAccelerationGalaxyTreeUpgrade('redAcceleratorsBoostYellowUpgrades');

  // Cross-section boost upgrades (25-100 Dark Energy)
  static redExpertiseGalaxyTree: RedExpertiseGalaxyTreeUpgrade = new RedExpertiseGalaxyTreeUpgrade('redGeneratorsBoostAccelerators');
  static acceleratorExpertiseGalaxyTree: AcceleratorExpertiseGalaxyTreeUpgrade = new AcceleratorExpertiseGalaxyTreeUpgrade('redAcceleratorsBoostGenerators');
  static yellowExpertiseGalaxyTree: YellowExpertiseGalaxyTreeUpgrade = new YellowExpertiseGalaxyTreeUpgrade('yellowUpgradesBoostFusion');
  static fusionExpertiseGalaxyTree: FusionExpertiseGalaxyTreeUpgrade = new FusionExpertiseGalaxyTreeUpgrade('yellowFusionBoostUpgrades');

  static improveFusionCompressionGalaxyTree: ImproveFusionCompressionGalaxyTreeUpgrade = new ImproveFusionCompressionGalaxyTreeUpgrade('improveFusionCompression');
  static hydrogenSynergyGalaxyTree: HydrogenSynergyGalaxyTreeUpgrade = new HydrogenSynergyGalaxyTreeUpgrade('hydrogenSynergyGalaxyTree');
  static mitigatedDarkGalaxyChallengeGalaxyTree: MitigatedDarkGalaxyChallengeGalaxyTreeUpgrade = new MitigatedDarkGalaxyChallengeGalaxyTreeUpgrade('mitigatedDarkGalaxyChallengeGalaxyTree');
  static unlockSecondGreenGeneratorGalaxyTree: UnlockSecondGreenGeneratorGalaxyTreeUpgrade = new UnlockSecondGreenGeneratorGalaxyTreeUpgrade('unlockSecondGreenGenerator');

  static moreYellowParticlesGalaxyTree: MoreYellowParticlesGalaxyTreeUpgrade = new MoreYellowParticlesGalaxyTreeUpgrade('moreYellowParticlesGalaxyTree');
  static slowerCompressionTimeIncreaseGalaxyTree: SlowerCompressionTimeIncreaseGalaxyTreeUpgrade = new SlowerCompressionTimeIncreaseGalaxyTreeUpgrade('slowerCompressionTimeIncrease');
  static hydrogenCompressionGalaxyTree: HydrogenCompressionGalaxyTreeUpgrade = new HydrogenCompressionGalaxyTreeUpgrade('hydrogenCompressionGalaxyTree');
  static acceleratedCompressionGalaxyTree: AcceleratedCompressionGalaxyTreeUpgrade = new AcceleratedCompressionGalaxyTreeUpgrade('acceleratedCompressionGalaxyTree');
  static poweredCompressionGalaxyTree: PoweredCompressionGalaxyTreeUpgrade = new PoweredCompressionGalaxyTreeUpgrade('poweredCompressionGalaxyTree');
  static generatedCompressionGalaxyTree: GeneratedCompressionGalaxyTreeUpgrade = new GeneratedCompressionGalaxyTreeUpgrade('generatedCompressionGalaxyTree');
  static cheaperFourthYellowGeneratorGalaxyTreeUpgrade: CheaperFourthYellowGeneratorGalaxyTreeUpgrade = new CheaperFourthYellowGeneratorGalaxyTreeUpgrade('cheaperFourthYellowGeneratorGalaxyTreeUpgrade');
  static cheaperFifthYellowGeneratorGalaxyTreeUpgrade: CheaperFifthYellowGeneratorGalaxyTreeUpgrade = new CheaperFifthYellowGeneratorGalaxyTreeUpgrade('cheaperFifthYellowGeneratorGalaxyTreeUpgrade');


  static yellowUpgradeList: YellowUpgrade[] = [
    UpgradeRecord.redGeneratorMultiplierYellowPrestigeYellow,
    UpgradeRecord.multiplyRedGeneratorExtensionYellow,
    UpgradeRecord.startWithMoreRedExtensionsUpgrade,
    UpgradeRecord.increaseRedGeneratorSubMultipliers,
    UpgradeRecord.increaseRedGeneratorBuyMultipliers,
    UpgradeRecord.noResetRedExtension,
    UpgradeRecord.improveFasterAccelerationYellow,
    UpgradeRecord.improveMultiplyAcceleratorEffectYellow,
    UpgradeRecord.improveBetterAccelerationYellow,
    UpgradeRecord.improveBetterParticleEffectYellow,
  ]

  static postBreakYellowUpgradeList: YellowUpgrade[] = [
    UpgradeRecord.empoweredBoosterAcceleration,
    UpgradeRecord.unlockFourthYellowGenerator,
    UpgradeRecord.unlockFifthYellowGenerator,
    UpgradeRecord.stopRedBoosterAccelerationReset,
    UpgradeRecord.decreaseRedGeneratorScaling,
    UpgradeRecord.decreaseRedGeneratorBoosterScaling,
    UpgradeRecord.breakYellowFusionLimitYellow,
  ]

  static starKeyUpgradeList: StarKeyUpgrade[] = [
    UpgradeRecord.ultraRedExtensionStarKey,
    UpgradeRecord.delayedBoosterScalingStarKey,
    UpgradeRecord.ultraBoosterAccelerationStarKey,
    UpgradeRecord.ultraYellowPowerStarKey,
    UpgradeRecord.multiplyRedGeneratorsStarKey,
    UpgradeRecord.ultraFusionBoosterAccelerationStarKey,
    UpgradeRecord.ultraYellowPrestigeBoostStarKey,
    UpgradeRecord.greaterProximaCentauriStarKey,
  ]

  static galaxyTreeUpgradeList: GalaxyTreeUpgrade[] = [
    UpgradeRecord.unlockFirstGreenGeneratorGalaxyTree,
    UpgradeRecord.betterRedGeneratorsMultiplierGalaxyTree,
    UpgradeRecord.cheaperBoosterAccelerationGalaxyTree,
    UpgradeRecord.redAcceleratorStartGalaxyTree,
    UpgradeRecord.betterYellowKeyGainGalaxyTree,
    UpgradeRecord.strongerRedExtensionGalaxyTree,
    UpgradeRecord.strongerBoosterAccelerationGalaxyTree,
    UpgradeRecord.betterRedAcceleratorGenerationGalaxyTree,
    UpgradeRecord.betterRedAcceleratorEffectGalaxyTree,
    UpgradeRecord.fasterHydrogenGenerationGalaxyTree,
    UpgradeRecord.strongerYellowPowerGalaxyTree,
    UpgradeRecord.strongerHydrogenGalaxyTree,
    UpgradeRecord.strongerYellowFusionGalaxyTree,
    UpgradeRecord.fusedAccelerationGalaxyTree,
    UpgradeRecord.betterRedBoosterGalaxyTree,
    UpgradeRecord.betterRedSubMultipliersGalaxyTree,
    UpgradeRecord.betterYellowGeneratorsGalaxyTree,
    UpgradeRecord.betterYellowMultipliersGalaxyTree,
    UpgradeRecord.amplifiedYellowKeysGalaxyTree,
    UpgradeRecord.expandedYellowKeyScalingGalaxyTree,
    // Mix-upgrades between sections
    UpgradeRecord.synergizedPowerGalaxyTree,
    UpgradeRecord.amplifiedFusionGalaxyTree,
    UpgradeRecord.powerAccelerationGalaxyTree,
    // Cross-section boost upgrades
    UpgradeRecord.redExpertiseGalaxyTree,
    UpgradeRecord.acceleratorExpertiseGalaxyTree,
    UpgradeRecord.yellowExpertiseGalaxyTree,
    UpgradeRecord.fusionExpertiseGalaxyTree,

    UpgradeRecord.improveFusionCompressionGalaxyTree,
    UpgradeRecord.hydrogenSynergyGalaxyTree,
    UpgradeRecord.mitigatedDarkGalaxyChallengeGalaxyTree,
    UpgradeRecord.unlockSecondGreenGeneratorGalaxyTree,
    UpgradeRecord.moreYellowParticlesGalaxyTree,
    UpgradeRecord.slowerCompressionTimeIncreaseGalaxyTree,

    UpgradeRecord.hydrogenCompressionGalaxyTree,
    UpgradeRecord.acceleratedCompressionGalaxyTree,
    UpgradeRecord.poweredCompressionGalaxyTree,
    UpgradeRecord.generatedCompressionGalaxyTree,

    UpgradeRecord.cheaperFourthYellowGeneratorGalaxyTreeUpgrade,
    UpgradeRecord.cheaperFifthYellowGeneratorGalaxyTreeUpgrade,
  ]

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
    UpgradeRecord.multiplyYellowKeyGain,
    ...UpgradeRecord.yellowUpgradeList,
    UpgradeRecord.breakYellowBarrier,

    // Yellow break upgrades
    UpgradeRecord.empoweredBoosterAcceleration,
    UpgradeRecord.unlockFourthYellowGenerator,
    UpgradeRecord.unlockFifthYellowGenerator,
    UpgradeRecord.stopRedBoosterAccelerationReset,
    UpgradeRecord.decreaseRedGeneratorScaling,
    UpgradeRecord.decreaseRedGeneratorBoosterScaling,
    UpgradeRecord.breakYellowFusionLimitYellow, // <-- add here

    // Yellow generator upgrades
    UpgradeRecord.yellowPower,

    // Green generator upgrades
    UpgradeRecord.multiplyGreenParticlesGreen,

    // Yellow fusion upgrades
    UpgradeRecord.increaseHydrogen,
    UpgradeRecord.increaseHydrogenEffect,
    UpgradeRecord.increaseProximaCentauriGoal,
    UpgradeRecord.increaseLalandeGoal,
    UpgradeRecord.increaseSunGoal,
    UpgradeRecord.increaseSiriusGoal,
    UpgradeRecord.increaseMaxFusionBoosterAcceleration,
    UpgradeRecord.fusionBoosterAcceleration,

    // Star key upgrades
    UpgradeRecord.increaseKeyAmountStarKeySub,
    UpgradeRecord.compressionSpeedStarKeySub,
    UpgradeRecord.decreaseMultiplyYellowKeysScalingStarKeySub,
    UpgradeRecord.unlockStarKeyCompression,
    ...UpgradeRecord.starKeyUpgradeList,

    // Green galaxy tree upgrades
    UpgradeRecord.redParticleSacrifice,
    UpgradeRecord.yellowParticleSacrifice,
    UpgradeRecord.greenParticleSacrifice,

    ...UpgradeRecord.galaxyTreeUpgradeList,

    // Nuclear reactor upgrades
    UpgradeRecord.greenKey,
    ...UpgradeRecord.nuclearUpgrades,

    // Blue particle upgrades
    UpgradeRecord.blueBeamIntensity,
    UpgradeRecord.blueColliderEfficiency,

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
