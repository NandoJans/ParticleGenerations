import {Num} from "../../../../num";
import {Automator} from "../../../../globals";

export const yellowAutomators: Automator[] = [
  {
    name: '2x-yellow-upgrade-automator', displayName: '2x Yellow Upgrade Automator', cost: new Num(5, 0), bought: new Num(0, 0), currency: 'greenParticles',
    type: 'yellow-automators', resetId: 'yellow-automators', style: 'automator yellow-automator', unlocked: false, active: false, requirement: ['greens', new Num(1, 0)],
    target: 'yellow-particle-multiplier', targetType: 'upgrade', nav: 'automators', subNav: 'yellowAutomators'
  },
  {
    name: '2x-redgen-upgrade-automator', displayName: '2x Red Generators Automator', cost: new Num(5, 0), bought: new Num(0, 0), currency: 'greenParticles',
    type: 'yellow-automators', resetId: 'yellow-automators', style: 'automator yellow-automator', unlocked: false, active: false, requirement: ['greens', new Num(1, 0)],
    target: 'yellow-repeatable-multiplier', targetType: 'upgrade', nav: 'automators', subNav: 'yellowAutomators'
  },
  {
    name: 'yellow-generators-automator', displayName: 'Yellow Generators Automator', cost: new Num(2, 1), bought: new Num(0, 0), currency: 'greenParticles',
    type: 'yellow-automators', resetId: 'yellow-automators', style: 'automator yellow-automator', unlocked: false, active: false, requirement: ['greens', new Num(1, 0)],
    target: 'yellow-particles', targetType: 'generators', nav: 'automators', subNav: 'yellowAutomators'
  },
  {
    name: 'yellow-upgrades-automator', displayName: 'Yellow Upgrades Automator', cost: new Num(2, 0), bought: new Num(0, 0), currency: 'purpleParticles',
    type: 'yellow-automators', resetId: 'yellow-automators', style: 'automator yellow-automator', unlocked: false, active: false, requirement: ['purples', new Num(1, 0)],
    target: ['yellow-upgrades', 'yellow-fusion'], targetType: 'upgrades', nav: 'automators', subNav: 'yellowAutomators'
  },
  {
    name: 'yellow-purple-generator-automator', displayName: 'Yellow Purple Generator Automator', cost: new Num(1, 110), bought: new Num(0, 0), currency: 'yellowParticles',
    type: 'yellow-automators', resetId: 'yellow-automators', style: 'automator yellow-automator', unlocked: false, active: false, requirement: ['purples', new Num(1, 0)],
    target: 'yellow-purple-generator', targetType: 'generators', nav: 'automators', subNav: 'yellowAutomators'
  },
  {
    name: 'yellow-purple-upgrade-automator', displayName: 'Yellow Purple Upgrade Automator', cost: new Num(1, 1100), bought: new Num(0, 0), currency: 'yellowParticles',
    type: 'yellow-automators', resetId: 'yellow-automators', style: 'automator yellow-automator', unlocked: false, active: false, requirement: ['purples', new Num(1, 0)],
    target: 'yellow-purple-upgrade', targetType: 'upgrades', nav: 'automators', subNav: 'yellowAutomators'
  }
]
