import {Num} from "../../../../num";
import {Automator} from "../../../../globals";

export const greenAutomators: Automator[] = [
  {
    name: '2x-green-particles-multiplier', displayName: '2x Green Particle Automator', cost: new Num(2, 0), bought: new Num(0, 0), currency: 'blueParticles',
    type: 'green-automators', resetId: 'green-automators', style: 'automator green-automator', unlocked: false, active: false, requirement: ['blues', new Num(1, 0)],
    target: 'green-particle-multiplier', targetType: 'upgrade', nav: 'automators', subNav: 'greenAutomators'
  },
  {
    name: 'green-generators-automator', displayName: 'Green Generators Automator', cost: new Num(3, 0), bought: new Num(0, 0), currency: 'blueParticles',
    type: 'green-automators', resetId: 'green-automators', style: 'automator green-automator', unlocked: false, active: false, requirement: ['blues', new Num(1, 0)],
    target: 'green-particles', targetType: 'generators', nav: 'automators', subNav: 'greenAutomators'
  },
  {
    name: 'green-sacrifice-automator', displayName: 'Green Sacrifice Automator', cost: new Num(3, 0), bought: new Num(0, 0), currency: 'blueParticles',
    type: 'green-automators', resetId: 'green-automators', style: 'automator green-automator', unlocked: false, active: false, requirement: ['blues', new Num(1, 0)],
    target: 'green-sacrifices', targetType: 'upgrades', nav: 'automators', subNav: 'greenAutomators'
  },
  {
    name: 'dark-compressor-automator', displayName: 'Dark Compressor Automator', cost: new Num(1, 1), bought: new Num(0, 0), currency: 'blueParticles',
    type: 'green-automators', resetId: 'green-automators', style: 'automator green-automator', unlocked: false, active: false, requirement: ['blues', new Num(1, 0)],
    target: 'dark-energy-compressor', targetType: 'upgrade', nav: 'automators', subNav: 'greenAutomators'
  },
  {
    name: 'dark-upgrades-automator', displayName: 'Dark Upgrades Automator', cost: new Num(1, 1), bought: new Num(0, 0), currency: 'blueParticles',
    type: 'green-automators', resetId: 'green-automators', style: 'automator green-automator', unlocked: false, active: false, requirement: ['blues', new Num(1, 0)],
    target: 'dark-upgrade', targetType: 'upgrades', nav: 'automators', subNav: 'greenAutomators'
  },
  {
    name: 'nuclear-decay-generator-automator', displayName: 'Nuclear Decay Generator Automator', cost: new Num(1, 3), bought: new Num(0, 0), currency: 'blueParticles',
    type: 'green-automators', resetId: 'green-automators', style: 'automator green-automator', unlocked: false, active: false, requirement: ['blues', new Num(1, 0)],
    target: 'nuclear-decay', targetType: 'generators', nav: 'automators', subNav: 'greenAutomators'
  },
  {
    name: 'green-upgrades-automator', displayName: 'Green Sacrifice Upgrades Automator', cost: new Num(2, 0), bought: new Num(0, 0), currency: 'purpleParticles',
    type: 'green-automators', resetId: 'green-automators', style: 'automator green-automator', unlocked: false, active: false, requirement: ['purples', new Num(1, 0)],
    target: 'green-limited-upgrades', targetType: 'upgrades', nav: 'automators', subNav: 'greenAutomators'
  },
  {
    name: 'green-purple-generator-automator', displayName: 'Green Purple Generator Automator', cost: new Num(1, 110), bought: new Num(0, 0), currency: 'greenParticles',
    type: 'green-automators', resetId: 'green-automators', style: 'automator green-automator', unlocked: false, active: false, requirement: ['purples', new Num(1, 0)],
    target: 'green-purple-generator', targetType: 'generators', nav: 'automators', subNav: 'greenAutomators'
  },
  {
    name: 'green-purple-upgrade-automator', displayName: 'Green Purple Upgrade Automator', cost: new Num(1, 1100), bought: new Num(0, 0), currency: 'greenParticles',
    type: 'green-automators', resetId: 'green-automators', style: 'automator green-automator', unlocked: false, active: false, requirement: ['purples', new Num(1, 0)],
    target: 'green-purple-upgrade', targetType: 'upgrades', nav: 'automators', subNav: 'greenAutomators'
  }
]
