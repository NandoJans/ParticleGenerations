import {Num} from "../../../../num";
import {Action} from "../../../../action";

export const blueUpgrades = [
  {
    name: 'blue-particle-multiplier', displayName: 'Multiply particles by 2', description: 'Multiply blue particles by 2', auto: false,
    baseCost: new Num(3,0), cost: new Num(3, 0), increase: new Num(1,1), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'blueParticles',
    baseBuffer: new Num(2, 0), buffer: new Num(2, 0), amount: new Num(0, 0), type: 'blue-upgrades', resetId: 'blue-upgrade', style: 'blue-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['greens', new Num(1, 1)],
    action: new Action('basedOnUpgrade', 'blueParticlesGain', new Num(1, 0), 'bought', 'blue-particle-multiplier')
  },
  {
    name: 'blue-light-multiplier-repeatable', displayName: 'Multiply light by 2', description: 'Multiply blue light by 2', auto: false,
    baseCost: new Num(5,0), cost: new Num(5, 0), increase: new Num(1,1), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'blueParticles',
    baseBuffer: new Num(2, 0), buffer: new Num(2, 0), amount: new Num(0, 0), type: 'blue-upgrades', resetId: 'blue-upgrade', style: 'blue-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['greens', new Num(1, 1)],
    action: new Action('basedOnUpgrade', 'blueLightGenerators', new Num(1, 0), 'bought', 'blue-light-multiplier-repeatable'), nav: 'blue', subNav: 'blueUpgrades'
  },
  {
    name: 'more-powerfull-dark-age', displayName: 'Dark age to 10', description: 'Dark power multiplies dark energy to the power of 10.', auto: false,
    baseCost: new Num(1,1), cost: new Num(1, 1), increase: new Num(1,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'blueParticles',
    baseBuffer: new Num(1, 1), buffer: new Num(1, 1), amount: new Num(0, 0), type: 'blue-upgrades', resetId: 'blue-upgrade', style: 'blue-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['blueParticles', new Num(1, 1)],
    action: new Action('globalMultiplier', 'darkPowerPower', new Num(1, 1)), nav: 'blue', subNav: 'blueUpgrades'
  },
  {
    name: 'light-boosts-neutrons', displayName: 'Neutron Light', description: 'Blue light slightly boosts blue neutrons.', auto: false,
    baseCost: new Num(1,3), cost: new Num(1, 3), increase: new Num(1,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'blueParticles',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'blue-upgrades', resetId: 'blue-upgrade', style: 'blue-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['blueParticles', new Num(1, 1)],
    action: new Action('basedOnHolding', 'blueNeutronGenerators', new Num(5, -1), 'power', 'blueLight'), nav: 'blue', subNav: 'blueUpgrades'
  },
  {
    name: 'increased-yellow-power', displayName: 'Increased Yellow Power', description: 'Increase the effect of yellow power.', auto: false,
    baseCost: new Num(1,8), cost: new Num(1, 8), increase: new Num(1,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'blueParticles',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'blue-upgrades', resetId: 'blue-upgrade', style: 'blue-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['blueParticles', new Num(1, 1)],
    action: new Action('globalMultiplier', 'yellowPowerPower', new Num(1.5, 0)), nav: 'blue', subNav: 'blueUpgrades'
  },
  {
    name: 'yellow-fusion-boosts-green', displayName: 'Green Yellow Fusion', description: 'Yellow fusion boosts green generators.', auto: false,
    baseCost: new Num(1,11), cost: new Num(1, 11), increase: new Num(1,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'blueParticles',
    baseBuffer: new Num(1, -5), buffer: new Num(1, -5), amount: new Num(0, 0), type: 'blue-upgrades', resetId: 'blue-upgrade', style: 'blue-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['blueParticles', new Num(1, 1)],
    action: new Action('basedOnHolding', 'greenParticleGenerators', new Num(2.5, -3), 'power', 'yellowFusion'), nav: 'blue', subNav: 'blueUpgrades'
  },
  {
    name: 'green-idle-gain', displayName: 'Green particles generation', description: 'Generate 1% of green particles gained on going green per second.', auto: false,
    baseCost: new Num(1,30), cost: new Num(1, 30), increase: new Num(1,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'blueParticles',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'blue-upgrades', resetId: 'blue-upgrade', style: 'blue-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['blueParticles', new Num(1, 1)],
    action: new Action('', ''), nav: 'blue', subNav: 'blueUpgrades'
  }
]
