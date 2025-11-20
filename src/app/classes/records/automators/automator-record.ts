import {RedGeneratorAutomator} from "../../features/automators/red-generator-automator";
import {Record} from "../record";
import {Automator} from "../../features/automator";
import {GeneratorRecord} from "../generators/generator-record";
import {Injectable} from '@angular/core';
import {RedGeneratorBoosterAutomator} from "../../features/automators/red-generator-booster-automator";
import {MultiplyRedAccelerationGenerationAutomator} from "../../features/automators/multiply-red-acceleration-generation-automator";
import {ImproveRedAcceleratorsEffectAutomator} from "../../features/automators/improve-red-accelerators-effect-automator";
import {ImproveRedParticlesToAcceleratorsAutomator} from "../../features/automators/improve-red-particles-to-accelerators-automator";
import {BoosterAccelerationAutomator} from "../../features/automators/booster-acceleration-automator";
import {RedGeneratorExtensionAutomator} from "../../features/automators/red-generator-extension-automator";
import {
  MultiplyRedAcceleratorEffectAutomator
} from "../../features/automators/multiply-red-accelerator-effect-automator";
import {YellowPrestigeAutomator} from "../../features/automators/yellow-prestige-automator";
import {MultiplyRedGeneratorsYellowAutomator} from "../../features/automators/multiply-red-generators-yellow-automator";
import {MultiplyYellowParticlesYellowUpgrade} from "../../features/upgrades/multiply-yellow-particles-yellow-upgrade";
import {
  MultiplyYellowParticlesYellowAutomator
} from "../../features/automators/multiply-yellow-particles-yellow-automator";
import {MultiplyYellowKeysYellowAutomator} from "../../features/automators/multiply-yellow-keys-yellow-automator";
import {YellowGeneratorAutomator} from "../../features/automators/yellow-generator-automator";
import {FusionBoosterAccelerationAutomator} from "../../features/automators/fusion-booster-acceleration-automator";
import {StarChallengeAutomator} from "../../features/automators/star-challenge-automator";
import {ChallengeRecord} from "../challenges/challenge-record";
import {StarKeyCompressionAutomator} from "../../features/automators/star-key-compression-automator";
import {YellowFusionUpgradesAutomator} from "../../features/automators/yellow-fusion-upgrades-automator";
import {StarKeyUpgradesAutomator} from "../../features/automators/star-key-upgrades-automator";
import {IncreaseYellowPowerUpgradeAutomator} from "../../features/automators/increase-yellow-power-upgrade-automator";
import {IncreaseChallengeGoalUpgradesAutomator} from "../../features/automators/increase-challenge-goal-upgrades-automator";
import {GreenPrestigeAutomator} from "../../features/automators/green-prestige-automator";

@Injectable({
  providedIn: 'root'
})
export class AutomatorRecord extends Record {
  // Red Phase
  static firstRedGenerator: RedGeneratorAutomator = new RedGeneratorAutomator('firstRedGenerator', GeneratorRecord.firstRedGenerator);
  static secondRedGenerator: RedGeneratorAutomator = new RedGeneratorAutomator('secondRedGenerator', GeneratorRecord.secondRedGenerator);
  static thirdRedGenerator: RedGeneratorAutomator = new RedGeneratorAutomator('thirdRedGenerator', GeneratorRecord.thirdRedGenerator);
  static fourthRedGenerator: RedGeneratorAutomator = new RedGeneratorAutomator('fourthRedGenerator', GeneratorRecord.fourthRedGenerator);
  static fifthRedGenerator: RedGeneratorAutomator = new RedGeneratorAutomator('fifthRedGenerator', GeneratorRecord.fifthRedGenerator);

  static redGeneratorExtension: RedGeneratorExtensionAutomator = new RedGeneratorExtensionAutomator('redGeneratorExtension');
  static redGeneratorBooster: RedGeneratorBoosterAutomator = new RedGeneratorBoosterAutomator('redGeneratorBooster');

  // Red Accelerator Phase
  static multiplyRedAccelerationGeneration: MultiplyRedAccelerationGenerationAutomator = new MultiplyRedAccelerationGenerationAutomator('multiplyRedAccelerationGeneration');
  static multiplyRedAcceleratorEffect: MultiplyRedAcceleratorEffectAutomator = new MultiplyRedAcceleratorEffectAutomator('multiplyRedAcceleratorEffect');
  static improveRedAcceleratorsEffect: ImproveRedAcceleratorsEffectAutomator = new ImproveRedAcceleratorsEffectAutomator('improveRedAcceleratorsEffect');
  static improveRedParticlesToAccelerators: ImproveRedParticlesToAcceleratorsAutomator = new ImproveRedParticlesToAcceleratorsAutomator('improveRedParticlesToAccelerators');
  static boosterAcceleration: BoosterAccelerationAutomator = new BoosterAccelerationAutomator('boosterAcceleration');

  // Yellow prestige automators
  static yellowPrestige: YellowPrestigeAutomator = new YellowPrestigeAutomator('yellowPrestige');
  static multiplyRedGeneratorsYellow: MultiplyRedGeneratorsYellowAutomator = new MultiplyRedGeneratorsYellowAutomator('multiplyRedGeneratorsYellow');
  static multiplyYellowParticlesYellow: MultiplyYellowParticlesYellowAutomator = new MultiplyYellowParticlesYellowAutomator('multiplyYellowParticlesYellow');
  static multiplyYellowKeysYellow: MultiplyYellowKeysYellowAutomator = new MultiplyYellowKeysYellowAutomator('multiplyYellowKeysYellow');

  static firstYellowGenerator: YellowGeneratorAutomator = new YellowGeneratorAutomator('firstYellowGenerator', GeneratorRecord.firstYellowGenerator);
  static secondYellowGenerator: YellowGeneratorAutomator = new YellowGeneratorAutomator('secondYellowGenerator', GeneratorRecord.secondYellowGenerator);
  static thirdYellowGenerator: YellowGeneratorAutomator = new YellowGeneratorAutomator('thirdYellowGenerator', GeneratorRecord.thirdYellowGenerator);
  static fourthYellowGenerator: YellowGeneratorAutomator = new YellowGeneratorAutomator('fourthYellowGenerator', GeneratorRecord.fourthYellowGenerator);
  static fifthYellowGenerator: YellowGeneratorAutomator = new YellowGeneratorAutomator('fifthYellowGenerator', GeneratorRecord.fifthYellowGenerator);

  static increaseYellowPowerUpgrade: IncreaseYellowPowerUpgradeAutomator = new IncreaseYellowPowerUpgradeAutomator('increaseYellowPowerUpgrade');

  static increaseChallengeGoalUpgrades: IncreaseChallengeGoalUpgradesAutomator = new IncreaseChallengeGoalUpgradesAutomator('increaseChallengeGoalUpgrades');

  static proximaCentauriStarChallenge: StarChallengeAutomator = new StarChallengeAutomator('proximaCentauriStarChallenge', ChallengeRecord.proximaCentauriStar);
  static lalandeStarChallenge: StarChallengeAutomator = new StarChallengeAutomator('lalandeStarChallenge', ChallengeRecord.lalandeStar);
  static sunStarChallenge: StarChallengeAutomator = new StarChallengeAutomator('sunStarChallenge', ChallengeRecord.sunStar);
  static siriusStarChallenge: StarChallengeAutomator = new StarChallengeAutomator('siriusStarChallenge', ChallengeRecord.siriusStar);

  static yellowFusionUpgrades: YellowFusionUpgradesAutomator = new YellowFusionUpgradesAutomator('yellowFusionUpgrades');

  static fusionBoosterAcceleration: FusionBoosterAccelerationAutomator = new FusionBoosterAccelerationAutomator('fusionBoosterAcceleration');

  static starKeyUpgrades: StarKeyUpgradesAutomator = new StarKeyUpgradesAutomator('starKeyUpgrades');

  static starKeyCompression: StarKeyCompressionAutomator = new StarKeyCompressionAutomator('starKeyCompression');

  // Green prestige automators
  static greenPrestige: GreenPrestigeAutomator = new GreenPrestigeAutomator('greenPrestige');

  static redAutomators: Automator[] = [
    AutomatorRecord.firstRedGenerator,
    AutomatorRecord.secondRedGenerator,
    AutomatorRecord.thirdRedGenerator,
    AutomatorRecord.fourthRedGenerator,
    AutomatorRecord.fifthRedGenerator,
    AutomatorRecord.redGeneratorExtension,
    AutomatorRecord.redGeneratorBooster,
    AutomatorRecord.multiplyRedAccelerationGeneration,
    AutomatorRecord.multiplyRedAcceleratorEffect,
    AutomatorRecord.improveRedAcceleratorsEffect,
    AutomatorRecord.improveRedParticlesToAccelerators,
    AutomatorRecord.boosterAcceleration,
  ];

  static yellowAutomators: Automator[] = [
    AutomatorRecord.yellowPrestige,
    AutomatorRecord.multiplyRedGeneratorsYellow,
    AutomatorRecord.multiplyYellowParticlesYellow,
    AutomatorRecord.multiplyYellowKeysYellow,
    AutomatorRecord.firstYellowGenerator,
    AutomatorRecord.secondYellowGenerator,
    AutomatorRecord.thirdYellowGenerator,
    AutomatorRecord.fourthYellowGenerator,
    AutomatorRecord.fifthYellowGenerator,
    AutomatorRecord.increaseChallengeGoalUpgrades,
    AutomatorRecord.proximaCentauriStarChallenge,
    AutomatorRecord.lalandeStarChallenge,
    AutomatorRecord.sunStarChallenge,
    AutomatorRecord.siriusStarChallenge,
    AutomatorRecord.yellowFusionUpgrades,
    AutomatorRecord.fusionBoosterAcceleration,
    AutomatorRecord.starKeyCompression,
    AutomatorRecord.starKeyUpgrades,
  ]

  static override list: Automator[] = [
    AutomatorRecord.firstRedGenerator,
    AutomatorRecord.secondRedGenerator,
    AutomatorRecord.thirdRedGenerator,
    AutomatorRecord.fourthRedGenerator,
    AutomatorRecord.fifthRedGenerator,

    AutomatorRecord.redGeneratorExtension,
    AutomatorRecord.redGeneratorBooster,

    AutomatorRecord.multiplyRedAccelerationGeneration,
    AutomatorRecord.multiplyRedAcceleratorEffect,
    AutomatorRecord.improveRedAcceleratorsEffect,
    AutomatorRecord.improveRedParticlesToAccelerators,
    AutomatorRecord.boosterAcceleration,

    AutomatorRecord.yellowPrestige,
    AutomatorRecord.multiplyRedGeneratorsYellow,
    AutomatorRecord.multiplyYellowParticlesYellow,
    AutomatorRecord.multiplyYellowKeysYellow,

    AutomatorRecord.firstYellowGenerator,
    AutomatorRecord.secondYellowGenerator,
    AutomatorRecord.thirdYellowGenerator,
    AutomatorRecord.fourthYellowGenerator,
    AutomatorRecord.fifthYellowGenerator,
    AutomatorRecord.increaseYellowPowerUpgrade,

    AutomatorRecord.increaseChallengeGoalUpgrades,
    AutomatorRecord.proximaCentauriStarChallenge,
    AutomatorRecord.lalandeStarChallenge,
    AutomatorRecord.sunStarChallenge,
    AutomatorRecord.siriusStarChallenge,

    AutomatorRecord.fusionBoosterAcceleration,
    AutomatorRecord.starKeyCompression,
    AutomatorRecord.yellowFusionUpgrades,
    AutomatorRecord.starKeyUpgrades,

    AutomatorRecord.greenPrestige,
  ]

  getList(): Automator[] {
    return AutomatorRecord.list;
  }

  runAutomators(): Automator[] {
    const completedAutomators: Automator[] = [];
    AutomatorRecord.list.forEach(automator => {
      if (automator.run()) {
        completedAutomators.push(automator);
      }
    });
    return completedAutomators;
  }
}
