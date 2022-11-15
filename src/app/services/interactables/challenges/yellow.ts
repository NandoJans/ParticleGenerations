import {Challenge} from "../../../globals";
import {Num} from "../../../num";
import {Action} from "../../../action";

export const yellowChallenges: Challenge[] = [
  {
    name: 'yellow-challenge-1', displayName: 'Yellow Challenge 1', description: 'without any red generator boosts.', goal: new Num(1, 1100), currency: 'redParticles', completed: false,
    rewardDescription: 'Gain a multiplier to red accelerators based on red generator boosts.', style: 'yellow-challenge', type: 'yellow-challenges', prestige: 'yellow', unlocked: false,
    requirement: ['yellowParticles', new Num(1, 5)], reward: new Action('basedOnUpgrade', 'redAcceleratorGenerators', new Num(1, 0), 'bought', 'red-generator-booster'),
    nerfs: [
      new Action('amplifyUpgrade', 'red-generator-booster', new Num(1, 0), 'buffer'),
    ]
  },
  {
    name: 'yellow-challenge-2', displayName: 'Yellow Challenge 2', description: 'without any red accelerators.', goal: new Num(1, 1350), currency: 'redParticles', completed: false,
    rewardDescription: 'Gain an extra red accelerator generator.', style: 'yellow-challenge', type: 'yellow-challenges', prestige: 'yellow', unlocked: false,
    requirement: ['yellowParticles', new Num(1, 8)], reward: new Action('amplifyGenerator', 'red-accelerator-generator-2', true, 'unlocked'),
    nerfs: [
      new Action('setHolding', 'redAccelerators', new Num(1, 0)),
      new Action('amplifyGenerators', 'red-accelerators', new Num(0, 0), 'multiplier'),
    ]
  },
  {
    name: 'yellow-challenge-3', displayName: 'Yellow Challenge 3', description: 'while only having red and yellow generators.', goal: new Num(1, 1400), currency: 'redParticles', completed: false,
    rewardDescription: 'Yellow generators are multiplied by the amount of fifth red generators.', style: 'yellow-challenge', type: 'yellow-challenges', prestige: 'yellow', unlocked: false,
    requirement: ['yellowParticles', new Num(1, 11)], reward: new Action('basedOnGenerator', 'yellowParticleGenerators', new Num(2, 0), 'amount', 'red-generator-5'),
    nerfs: [
      new Action('setHolding', 'redAccelerators', new Num(1, 0)),
      new Action('amplifyGenerators', 'red-accelerators', new Num(0, 0), 'multiplier'),
      new Action('amplifyUpgrades', 'red-particles', new Num(1, 0), 'buffer'),
      new Action('amplifyUpgrades', 'red-upgrades', new Action('', ''), 'action'),
      new Action('amplifyUpgrades', 'yellow-upgrades', new Action('', ''), 'action'),
    ]
  },
  {
    name: 'yellow-challenge-4', displayName: 'Yellow Challenge 4', description: 'while only having red generators, but red accelerators are insanely powerfull.', goal: new Num(1, 1560), currency: 'redParticles', completed: false,
    rewardDescription: 'Red accelerators gain a multiplier based on yellow power.', style: 'yellow-challenge', type: 'yellow-challenges', prestige: 'yellow', unlocked: false,
    requirement: ['yellowParticles', new Num(1, 15)], reward: new Action('basedOnHolding', 'redAcceleratorGenerators', new Num(1, 0), 'amount', 'yellowPower'),
    nerfs: [
      new Action('amplifyGenerators', 'red-accelerators', ['none'], 'requirement'),
      new Action('amplifyGenerators', 'red-accelerators', false, 'auto'),
      new Action('amplifyGenerator', 'red-accelerator-generator-1', new Num(1, 2), 'baseMultiplier'),
      new Action('amplifyGenerator', 'red-accelerator-generator-2', new Num(1, 2), 'baseMultiplier'),
      new Action('amplifyUpgrade', 'red-accelerator-multiplier-1', ['redParticles', new Num(1, 130)], 'requirement'),
      new Action('amplifyUpgrade', 'red-accelerator-multiplier-2', ['redParticles', new Num(1, 290)], 'requirement'),
      new Action('amplifyUpgrade', 'red-accelerator-multiplier-3', ['redParticles', new Num(1, 755)], 'requirement'),
      new Action('amplifyUpgrade', 'red-accelerator-multiplier-1', new Num(1, 23), 'baseCost'),
      new Action('amplifyUpgrade', 'red-accelerator-multiplier-2', new Num(1, 53), 'baseCost'),
      new Action('amplifyUpgrade', 'red-accelerator-multiplier-3', new Num(1, 143), 'baseCost'),
      new Action('amplifyUpgrade', 'red-accelerator-multiplier-3', new Num(1, 5), 'increase'),
      new Action('amplifyUpgrades', 'red-accelerators', false, 'auto'),
      new Action('increaseBuffer', 'red-accelerator-multiplier-1', new Num(1, 1), 'buffer'),
      new Action('increaseBuffer', 'red-accelerator-multiplier-2', new Num(1, 2), 'buffer'),
      new Action('increaseBuffer', 'red-accelerator-multiplier-3', new Num(1, 3), 'buffer'),
      new Action('amplifyGenerators', 'yellow-particles', ['never'], 'requirement'),
      new Action('setHolding', 'yellowPower', new Num(1, 0)),
      new Action('amplifyUpgrades', 'red-particles', new Num(1, 0), 'buffer'),
      new Action('amplifyUpgrades', 'red-upgrades', new Action('', ''), 'action'),
      new Action('amplifyUpgrades', 'yellow-upgrades', new Action('', ''), 'action'),
    ]
  },
  {
    name: 'yellow-challenge-5', displayName: 'Yellow Challenge 5', description: 'when generators won\'t multiply themselfs.', goal: new Num(1, 5000), currency: 'redParticles', completed: false,
    rewardDescription: 'First red generators boost the other generators.', style: 'yellow-challenge', type: 'yellow-challenges', prestige: 'yellow', unlocked: false,
    requirement: ['yellowParticles', new Num(1, 30)], reward: new Action('basedOnGenerator', 'yellowParticleGenerators', new Num(2, 0), 'amount', 'red-generator-5'),
    nerfs: [
      new Action('amplifyGenerators', 'red-particles', new Num(1, 0), 'baseMultiplier'),
      new Action('amplifyGenerators', 'yellow-particles', new Num(1, 0), 'baseMultiplier'),
    ]
  },
]
