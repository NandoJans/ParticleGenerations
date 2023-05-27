import {Challenge, Generator} from "../../../globals";
import {Num} from "../../../num";
import {UpgradeService} from "../upgrade.service";
import {GeneratorService} from "../generator.service";
import {HoldingsService} from "../../holdings.service";
import {GlobalMultipliersService} from "../../globals/global-multipliers.service";
import {ChallengeService} from "../challenge.service";

export const blueChallenges:Challenge[] = [
  {
    name: 'blue-challenge-1', displayName: 'Blue Challenge 1', description: 'Green Particles without the red phase', baseGoal: new Num(1, 10), goal: new Num(1, 10), currency: 'greenParticles', disabled: false,
    dynamic: true , completed: new Num(0, 0), maxCompletions: new Num(5, 0), goalIncrease: new Num(1, 10),
    rewardDescription: 'Gain a multiplier to red particle generators based on Red Particles.', style: 'blue-challenge', resetId: 'blue', type: 'blue-challenges', prestige: 'blue', unlocked: false, instantComplete: false,
    requirement: ['blueParticles', new Num(1, 4)],
    reward: (self: Challenge) => {
      if (self.completed instanceof Num) {
        const buff: Num | undefined = HoldingsService.get('redParticles').pow(new Num(1, -2).mul(self.completed, false), false)
        GlobalMultipliersService.correct('redParticleGenerators', buff);
        return buff;
      } else {
        return new Num(0, 0);
      }
    },
    nerfs: (self: Challenge) => {
      HoldingsService.set('redAccelerators', new Num(1, 0));
      UpgradeService.disableUpgrades('red-upgrades');
      UpgradeService.disableUpgrades('red-accelerators');
      UpgradeService.disableUpgrades('red-particles');
      GeneratorService.disableGenerators('red-accelerators');
      GeneratorService.disableGenerator('red-generator-2');
      GeneratorService.disableGenerator('red-generator-3');
      GeneratorService.disableGenerator('red-generator-4');
      GeneratorService.disableGenerator('red-generator-5');
    }
  },
  {
    name: 'blue-challenge-2', displayName: 'Blue Challenge 2', description: 'Green Particles when all generators generate eachother.', baseGoal: new Num(1, 100), goal: new Num(1, 100), currency: 'greenParticles', disabled: false,
    dynamic: true , completed: new Num(0, 0), maxCompletions: new Num(5, 0), goalIncrease: new Num(1, 100),
    rewardDescription: 'Green generators slightly generate 5th Yellow Generators.', style: 'blue-challenge', resetId: 'blue', type: 'blue-challenges', prestige: 'blue', unlocked: false, instantComplete: false,
    requirement: ['blueParticles', new Num(1, 7)],
    reward: (self: Challenge) => {
    if (self.completed instanceof Num) {
      const generator: Generator = GeneratorService.getGenerator('green-generator-1')
      // @ts-ignore
      const buff: Num | undefined = generator.amount.mul(generator.multiplier, false).pow(new Num(1, 1).mul(self.completed, false), false)
      // @ts-ignore
      GeneratorService.addValue('yellow-generator-5', 'amount', buff);
      return buff;
    } else {
      return new Num(0, 0);
    }
  },
    nerfs: (self: Challenge) => {
      HoldingsService.set('greenEnergy', new Num(1, 0))
      HoldingsService.set('yellowPower', new Num(1, 0))
      ChallengeService.disableChallenge('yellow-challenge-3');
      UpgradeService.disableUpgrade('accelerators-yellow-power-based');
      GeneratorService.setValue('green-generator-1', 'generates', 'yellow-generator-5')
      GeneratorService.setValue('yellow-generator-1', 'generates', 'red-generator-5')
    }
  },
  {
    name: 'blue-challenge-3', displayName: 'Blue Challenge 3', description: 'Green Particles with only the upgrades and generators boosted by Dark Energy. Dark energy is also significantly more powerfull.', baseGoal: new Num(1, 380), goal: new Num(1, 380), currency: 'greenParticles', disabled: false,
    dynamic: true , completed: new Num(0, 0), maxCompletions: new Num(5, 0), goalIncrease: new Num(1, 380),
    rewardDescription: 'Increase the power of dark power.', style: 'blue-challenge', resetId: 'blue', type: 'blue-challenges', prestige: 'blue', unlocked: false, instantComplete: false,
    requirement: ['blueParticles', new Num(1, 9)],
    reward: (self: Challenge) => {
      if (self.completed instanceof Num) {
        // @ts-ignore
        const buff: Num | undefined = new Num(1.5, 0).pow(self.completed, false);
        GlobalMultipliersService.correct('darkPowerPower', buff);
        // @ts-ignore
        return buff;
      } else {
        return new Num(0, 0);
      }
    },
    nerfs: (self: Challenge) => {
      ChallengeService.disableChallenges('yellow-challenges');
      UpgradeService.disableUpgrades('red-accelerators');
      UpgradeService.disableUpgrades('yellow-upgrades');
      UpgradeService.disableUpgrades('red-upgrades');
      UpgradeService.disableUpgrades('nuclear-decay');
      UpgradeService.disableUpgrades('green-limited-upgrades');
      GeneratorService.disableGenerators('nuclear-decay');
      UpgradeService.disableUpgrade('red-generator-extension');

      UpgradeService.setValue('dark-yellow-fusion', 'buffer', new Num(1, 10))
      UpgradeService.setValue('dark-green-generators', 'buffer', new Num(6, 0))
      UpgradeService.setValue('dark-yellow-generators', 'buffer', new Num(1, 30))
      UpgradeService.setValue('dark-red-generators', 'buffer', new Num(1, 300))
      UpgradeService.setValue('dark-red-accelerators', 'buffer', new Num(1, 80))
    }
  },
  {
    name: 'blue-challenge-4', displayName: 'Blue Challenge 4', description: 'Green Particles when all generator multipliers are raised to the power of 0.5.', baseGoal: new Num(1, 250), goal: new Num(1, 250), currency: 'greenParticles', disabled: false,
    dynamic: true , completed: new Num(0, 0), maxCompletions: new Num(5, 0), goalIncrease: new Num(1, 250),
    rewardDescription: 'Increase the power of the Multiply light by 2 upgrade.', style: 'blue-challenge', resetId: 'blue', type: 'blue-challenges', prestige: 'blue', unlocked: false, instantComplete: false,
    requirement: ['blueParticles', new Num(1, 14)],
    reward: (self: Challenge) => {
      if (self.completed instanceof Num) {
        // @ts-ignore
        const buff: Num | undefined = new Num(1.1, 0).pow(self.completed, false);
        UpgradeService.increaseBuffer('blue-light-multiplier-repeatable', buff);
        // @ts-ignore
        return buff;
      } else {
        return new Num(0, 0);
      }
    },
    nerfs: (self: Challenge) => {
      GlobalMultipliersService.get('redParticleGenerators').pow(new Num(5, -1))
      GlobalMultipliersService.get('redPurpleGenerators').pow(new Num(5, -1))
      GlobalMultipliersService.get('yellowParticleGenerators').pow(new Num(5, -1))
      GlobalMultipliersService.get('yellowPurpleGenerators').pow(new Num(5, -1))
      GlobalMultipliersService.get('greenParticleGenerators').pow(new Num(5, -1))
      GlobalMultipliersService.get('greenPurpleGenerators').pow(new Num(5, -1))
      GlobalMultipliersService.get('blueParticleGenerators').pow(new Num(5, -1))
      GlobalMultipliersService.get('bluePurpleGenerators').pow(new Num(5, -1))

      GlobalMultipliersService.get('redAcceleratorGenerators').pow(new Num(5, -1))
      GlobalMultipliersService.get('yellowFusion').pow(new Num(5, -1))
      GlobalMultipliersService.get('nuclearDecayGenerators').pow(new Num(5, -1))
      GlobalMultipliersService.get('blueNeutronGenerators').pow(new Num(5, -1))
      GlobalMultipliersService.get('blueLightGenerators').pow(new Num(5, -1))
    }
  },
]
