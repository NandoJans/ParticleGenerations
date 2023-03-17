import {Num} from "../../../../num";
import {Action} from "../../../../action";
import {NewAction} from "../../../../NewAction";

export const blueUpgrades = [
  {
    name: 'blue-particle-multiplier', displayName: 'Multiply particles by 2', description: 'Multiply blue particles by 2', auto: false,
    baseCost: new Num(3,0), cost: new Num(3, 0), increase: new Num(1,1), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'blueParticles',
    baseBuffer: new Num(2, 0), buffer: new Num(2, 0), amount: new Num(0, 0), type: 'blue-upgrades', resetId: 'blue-upgrade', style: 'blue-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['blues', new Num(3, 0)],
    action: new NewAction('multiply multiplier blueParticlesGain basedon upgrade this pow', new Num(1, 0)), nav: 'blue', subNav: 'blueUpgrades'
  },
  {
    name: 'blue-light-multiplier-repeatable', displayName: 'Multiply light by 2', description: 'Multiply blue light by 2', auto: false, scalingStart: new Num(1, 110),
    baseCost: new Num(5,0), cost: new Num(5, 0), increase: new Num(1,1), scaling: new Num(1, 1), bought: new Num(0, 0), currency: 'blueParticles',
    baseBuffer: new Num(2, 0), buffer: new Num(2, 0), amount: new Num(0, 0), type: 'blue-upgrades', resetId: 'blue-upgrade', style: 'blue-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['blues', new Num(3, 0)],
    action: new NewAction('multiply multiplier blueLightGenerators basedon upgrade this pow', new Num(1, 0)), nav: 'blue', subNav: 'blueUpgrades'
  },
  {
    name: 'more-powerfull-dark-age', displayName: 'Dark age to 5', description: 'Dark power multiplies dark energy to the power of 5.', auto: false,
    baseCost: new Num(1,1), cost: new Num(1, 1), increase: new Num(1,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'blueParticles',
    baseBuffer: new Num(1, 1), buffer: new Num(1, 1), amount: new Num(0, 0), type: 'blue-upgrades', resetId: 'blue-upgrade', style: 'blue-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['blues', new Num(3, 0)],
    action: new NewAction('set multiplier darkPowerPower to', new Num(5, 0)), nav: 'blue', subNav: 'blueUpgrades'
  },
  {
    name: 'light-boosts-neutrons', displayName: 'Neutron Light', description: 'Blue light slightly boosts blue neutrons.', auto: false,
    baseCost: new Num(1,2), cost: new Num(1, 2), increase: new Num(1,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'blueParticles',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'blue-upgrades', resetId: 'blue-upgrade', style: 'blue-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['blues', new Num(3, 0)],
    action: new NewAction('multiply multiplier blueNeutronGenerators basedon holding blueLight pow', new Num(1, -1)), nav: 'blue', subNav: 'blueUpgrades'
  },
  {
    name: 'increased-yellow-power', displayName: 'Increased Yellow Power', description: 'Increase the effect of yellow power.', auto: false,
    baseCost: new Num(1,8), cost: new Num(1, 8), increase: new Num(1,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'blueParticles',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'blue-upgrades', resetId: 'blue-upgrade', style: 'blue-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['blues', new Num(3, 0)],
    action: new NewAction('set multiplier yellowPowerPower to', new Num(1.5, 0)), nav: 'blue', subNav: 'blueUpgrades'
  },
  {
    name: 'yellow-fusion-boosts-green', displayName: 'Green Yellow Fusion', description: 'Yellow fusion boosts green generators.', auto: false,
    baseCost: new Num(1,20), cost: new Num(1, 20), increase: new Num(1,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'blueParticles',
    baseBuffer: new Num(1, -5), buffer: new Num(1, -5), amount: new Num(0, 0), type: 'blue-upgrades', resetId: 'blue-upgrade', style: 'blue-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['blues', new Num(3, 0)],
    action: new NewAction('multiply multiplier greenParticleGenerators basedon holding yellowFusion pow', new Num(1, -3)), nav: 'blue', subNav: 'blueUpgrades'
  },
  {
    name: 'green-idle-gain', displayName: 'Green particles generation', description: 'Generate 1% of green particles gained on going green per second.', auto: false,
    baseCost: new Num(1,30), cost: new Num(1, 30), increase: new Num(1,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'blueParticles',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'blue-upgrades', resetId: 'blue-upgrade', style: 'blue-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['blues', new Num(3, 0)],
    action: new NewAction('none', ''), nav: 'blue', subNav: 'blueUpgrades'
  },
  {
    name: 'extra-blue-light-upgrades', displayName: 'More Fusion Effect', description: 'The upgrade Increase Fusion Effect can be bought once more.', auto: false,
    baseCost: new Num(1,95), cost: new Num(1, 95), increase: new Num(1,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'blueParticles',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'blue-upgrades', resetId: 'blue-upgrade', style: 'blue-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['blues', new Num(3, 0)],
    action: new NewAction('set upgrade yellow-fusion-effect-increaser limit to', new Num(1.4, 1)), nav: 'blue', subNav: 'blueUpgrades'
  }
]
