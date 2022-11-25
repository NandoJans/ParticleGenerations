import {Challenge} from "../../../globals";
import {Num} from "../../../num";
import {Action} from "../../../action";

export const yellowChallenges: Challenge[] = [
  {
    name: 'yellow-challenge-1', displayName: 'Yellow Challenge 1', description: 'without any red generator boosts.', goal: new Num(1, 1100), currency: 'redParticles', completed: false, disabled: false,
    rewardDescription: 'Gain a multiplier to red accelerators based on red generator boosts.', style: 'yellow-challenge', resetId: 'yellow-challenges', type: 'yellow-challenges', prestige: 'yellow', unlocked: false, instantComplete: false,
    requirement: ['yellowParticles', new Num(1, 5)],
    reward: new Action('basedOnUpgrade', 'redAcceleratorGenerators', new Num(1, 0), 'amount', 'red-generator-booster'),
    nerfs: [
      new Action('amplifyUpgrade', 'red-generator-booster', new Num(1, 0), 'buffer'),
    ]
  },
  {
    name: 'yellow-challenge-2', displayName: 'Yellow Challenge 2', description: 'without any red accelerators.', goal: new Num(1, 1350), currency: 'redParticles', completed: false, disabled: false,
    rewardDescription: 'Gain an extra red accelerator generator.', style: 'yellow-challenge', resetId: 'yellow-challenges', type: 'yellow-challenges', prestige: 'yellow', unlocked: false, instantComplete: false,
    requirement: ['yellowParticles', new Num(1, 8)],
    reward: new Action('amplifyGenerator', 'red-accelerator-generator-2', true, 'unlocked'),
    nerfs: [
      new Action('setHolding', 'redAccelerators', new Num(1, 0)),
      new Action('amplifyGenerators', 'red-accelerators', new Num(0, 0), 'multiplier'),
    ]
  },
  {
    name: 'yellow-challenge-3', displayName: 'Yellow Challenge 3', description: 'while only having red and yellow generators.', goal: new Num(1, 1350), currency: 'redParticles', completed: false, disabled: false,
    rewardDescription: 'Yellow generators are multiplied by the amount of fifth red generators.', style: 'yellow-challenge', resetId: 'yellow-challenges', type: 'yellow-challenges', prestige: 'yellow', unlocked: false, instantComplete: false,
    requirement: ['yellowParticles', new Num(1, 11)],
    reward: new Action('basedOnGenerator', 'yellowParticleGenerators', new Num(2, 0), 'amount', 'red-generator-5'),
    nerfs: [
      new Action('setHolding', 'redAccelerators', new Num(1, 0)),
      new Action('amplifyGenerators', 'red-accelerators', new Num(0, 0), 'multiplier'),
      new Action('amplifyUpgrades', 'red-particles', new Num(1, 0), 'buffer'),
      new Action('amplifyUpgrades', 'red-upgrades', new Action('', ''), 'action'),
      new Action('amplifyUpgrades', 'yellow-upgrades', new Action('', ''), 'action'),
    ]
  },
  {
    name: 'yellow-challenge-4', displayName: 'Yellow Challenge 4', description: 'while only having red generators, but red accelerators are insanely powerfull.', goal: new Num(1, 1865), currency: 'redParticles', completed: false, disabled: false,
    rewardDescription: 'Red accelerators gain a multiplier based on yellow power.', style: 'yellow-challenge', resetId: 'yellow-challenges', type: 'yellow-challenges', prestige: 'yellow', unlocked: false, instantComplete: false,
    requirement: ['yellowParticles', new Num(1, 15)],
    reward: new Action('basedOnHolding', 'redAcceleratorGenerators', new Num(1, 0), 'amount', 'yellowPower'),
    nerfs: [
      new Action('amplifyGenerators', 'red-accelerators', ['none'], 'requirement'),
      new Action('amplifyGenerators', 'red-accelerators', false, 'auto'),
      new Action('amplifyGenerator', 'red-accelerator-generator-1', new Num(1, 3), 'baseMultiplier'),
      new Action('amplifyGenerator', 'red-accelerator-generator-2', new Num(1, 3), 'baseMultiplier'),
      new Action('amplifyUpgrade', 'red-accelerator-multiplier-1', ['redParticles', new Num(1, 130)], 'requirement'),
      new Action('amplifyUpgrade', 'red-accelerator-multiplier-2', ['redParticles', new Num(1, 250)], 'requirement'),
      new Action('amplifyUpgrade', 'red-accelerator-multiplier-3', ['redParticles', new Num(1, 830)], 'requirement'),
      new Action('amplifyUpgrade', 'red-accelerator-multiplier-1', new Num(1, 23), 'baseCost'),
      new Action('amplifyUpgrade', 'red-accelerator-multiplier-1', new Num(1, 3), 'increase'),
      new Action('amplifyUpgrade', 'red-accelerator-multiplier-2', new Num(1, 49), 'baseCost'),
      new Action('amplifyUpgrade', 'red-accelerator-multiplier-2', new Num(1, 4), 'increase'),
      new Action('amplifyUpgrade', 'red-accelerator-multiplier-3', new Num(1, 142), 'baseCost'),
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
    name: 'yellow-challenge-5', displayName: 'Yellow Challenge 5', description: 'when generators won\'t multiply themselfs.', goal: new Num(1, 2900), currency: 'redParticles', completed: false, disabled: false,
    rewardDescription: 'First red generators boost the other generators.', style: 'yellow-challenge', resetId: 'yellow-challenges', type: 'yellow-challenges', prestige: 'yellow', unlocked: false, instantComplete: false,
    requirement: ['yellowParticles', new Num(1, 23)],
    reward: new Action('basedOnGenerator', 'redParticleGenerators', new Num(2, -2), 'amount', 'red-generator-1'),
    nerfs: [
      new Action('amplifyGenerators', 'red-particles', new Num(1, 0), 'baseMultiplier'),
      new Action('amplifyGenerators', 'yellow-particles', new Num(1, 0), 'baseMultiplier'),
    ]
  },
  {
    name: 'yellow-challenge-6', displayName: 'Yellow Challenge 6', description: 'without red generators 2-5.', goal: new Num(1, 985), currency: 'redParticles', completed: false, disabled: false,
    rewardDescription: 'The Accelerator Particles upgrade is a lot more powerfull.', style: 'yellow-challenge', resetId: 'yellow-challenges', type: 'yellow-challenges', prestige: 'yellow', unlocked: false, instantComplete: false,
    requirement: ['yellowParticles', new Num(1, 29)],
    reward: new Action('amplifyUpgrade', 'red-accelerators-particles-based', new Action('basedOnHolding', 'redAcceleratorGenerators', new Num(10, 0), 'exponent', 'redParticles'), 'action'),
    nerfs: [
      new Action('amplifyGenerator', 'red-generator-2', ['never'], 'requirement'),
      new Action('amplifyGenerator', 'red-generator-3', ['never'], 'requirement'),
      new Action('amplifyGenerator', 'red-generator-4', ['never'], 'requirement'),
      new Action('amplifyGenerator', 'red-generator-5', ['never'], 'requirement'),
    ]
  },
  {
    name: 'yellow-challenge-7', displayName: 'Yellow Challenge 7', description: 'with only generators, accelerators and reduced fusion', goal: new Num(1, 14200), currency: 'redParticles', completed: false, disabled: false,
    rewardDescription: 'Gain a multiplier on red generators based on yellow fusion.', style: 'yellow-challenge', resetId: 'yellow-challenges', type: 'yellow-challenges', prestige: 'yellow', unlocked: false, instantComplete: false,
    requirement: ['yellowParticles', new Num(1, 70)],
    reward: new Action('basedOnHolding', 'redParticleGenerators', new Num(1, 0), '', 'yellowFusion'),
    nerfs: [
      new Action('amplifyUpgrades', 'red-particles', new Num(1, 0), 'buffer'),
      new Action('amplifyUpgrades', 'red-upgrades', new Action('', ''), 'action'),
      new Action('amplifyUpgrades', 'yellow-upgrades', new Action('', ''), 'action'),
      new Action('amplifyUpgrade', 'accelerate-yellow-fusion', new Num(1.05, 0), 'buffer'),
      new Action('amplifyUpgrade', 'increase-yellow-fusion', new Num(1.075, 0), 'buffer'),
    ]
  },
  {
    name: 'yellow-challenge-8', displayName: 'Yellow Challenge 8', description: 'when yellow generators generate second red accelerator generators.', goal: new Num(1, 5500), currency: 'redParticles', completed: false, disabled: false,
    rewardDescription: 'Make yellow fusion much more powerfull.', style: 'yellow-challenge', resetId: 'yellow-challenges', type: 'yellow-challenges', prestige: 'yellow', unlocked: false, instantComplete: false,
    requirement: ['yellowParticles', new Num(1, 75)],
    reward: new Action('setHolding', 'yellowFusionPower', new Num(4, -1)),
    nerfs: [
      new Action('amplifyGenerator', 'yellow-generator-1', 'red-accelerator-generator-2', 'generates'),
      new Action('amplifyUpgrade', 'accelerate-yellow-fusion', new Num(1.05, 0), 'buffer'),
      new Action('amplifyUpgrade', 'increase-yellow-fusion', new Num(1.075, 0), 'buffer'),
    ]
  },
]
