import {RedGeneratorAutomator} from "../../features/automators/red-generator-automator";
import {Record} from "../record";
import {Automator} from "../../features/automator";
import type {GeneratorRecord} from "../generators/generator-record";
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
import {YellowEnhancementAutomator} from "../../features/automators/yellow-enhancement-automator";
import {DarkStarChargerAutomator} from "../../features/automators/dark-star-charger-automator";

@Injectable({
  providedIn: 'root'
})
export class AutomatorRecord extends Record {
  // Red Phase
  static firstRedGenerator = new RedGeneratorAutomator('firstRedGenerator', 1, 'First');
  static secondRedGenerator = new RedGeneratorAutomator('secondRedGenerator', 2, 'Second');
  static thirdRedGenerator = new RedGeneratorAutomator('thirdRedGenerator', 3, 'Third');
  static fourthRedGenerator = new RedGeneratorAutomator('fourthRedGenerator', 4, 'Fourth');
  static fifthRedGenerator = new RedGeneratorAutomator('fifthRedGenerator', 5, 'Fifth');

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
  static yellowEnhancementAutomator: YellowEnhancementAutomator = new YellowEnhancementAutomator('yellowEnhancementAutomator');

  static firstYellowGenerator = new YellowGeneratorAutomator('firstYellowGenerator', 1, '1');
  static secondYellowGenerator = new YellowGeneratorAutomator('secondYellowGenerator', 2, '2');
  static thirdYellowGenerator = new YellowGeneratorAutomator('thirdYellowGenerator', 3, '3');
  static fourthYellowGenerator = new YellowGeneratorAutomator('fourthYellowGenerator', 4, '4');
  static fifthYellowGenerator = new YellowGeneratorAutomator('fifthYellowGenerator', 5, '5');

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
  static darkStarCharger: DarkStarChargerAutomator = new DarkStarChargerAutomator('darkStarCharger');

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
    AutomatorRecord.yellowEnhancementAutomator,
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
    AutomatorRecord.yellowEnhancementAutomator,

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
    AutomatorRecord.darkStarCharger,
  ]

  getList(): Automator[] {
    return AutomatorRecord.list;
  }

  bindGenerators(generatorRecord: GeneratorRecord): void {
    const byRank = <T extends {rank: number}>(items: T[], rank: number): T => {
      const generator = items.find(item => item.rank === rank);
      if (!generator) throw new Error(`Missing rank ${rank} generator`);
      return generator;
    };

    const redGenerators = generatorRecord.getRedGenerators();
    const yellowGenerators = generatorRecord.getYellowGenerators();

    AutomatorRecord.firstRedGenerator.bindGenerator(byRank(redGenerators, 1));
    AutomatorRecord.secondRedGenerator.bindGenerator(byRank(redGenerators, 2));
    AutomatorRecord.thirdRedGenerator.bindGenerator(byRank(redGenerators, 3));
    AutomatorRecord.fourthRedGenerator.bindGenerator(byRank(redGenerators, 4));
    AutomatorRecord.fifthRedGenerator.bindGenerator(byRank(redGenerators, 5));
    AutomatorRecord.firstYellowGenerator.bindGenerator(byRank(yellowGenerators, 1));
    AutomatorRecord.secondYellowGenerator.bindGenerator(byRank(yellowGenerators, 2));
    AutomatorRecord.thirdYellowGenerator.bindGenerator(byRank(yellowGenerators, 3));
    AutomatorRecord.fourthYellowGenerator.bindGenerator(byRank(yellowGenerators, 4));
    AutomatorRecord.fifthYellowGenerator.bindGenerator(byRank(yellowGenerators, 5));
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
