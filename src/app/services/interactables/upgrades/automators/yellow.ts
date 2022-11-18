import {Num} from "../../../../num";
import {Automator} from "../../../../globals";

export const yellowAutomators: Automator[] = [
  {
    name: '2x-yellow-upgrade-automator', displayName: '2x Yellow Upgrade Automator', cost: new Num(5, 0), bought: new Num(0, 0), currency: 'greenParticles',
    type: 'yellow-automators', resetId: 'yellow-automators', style: 'automator', unlocked: false, active: false, requirement: ['greens', new Num(1, 0)],
    target: 'yellow-particle-multiplier', targetType: 'upgrade'
  },
  {
    name: '2x-redgen-upgrade-automator', displayName: '2x Red Generators Automator', cost: new Num(5, 0), bought: new Num(0, 0), currency: 'greenParticles',
    type: 'yellow-automators', resetId: 'yellow-automators', style: 'automator', unlocked: false, active: false, requirement: ['greens', new Num(1, 0)],
    target: 'yellow-repeatable-multiplier', targetType: 'upgrade'
  },
  {
    name: 'yellow-generators-automator', displayName: 'Yellow Generators Automator', cost: new Num(2, 1), bought: new Num(0, 0), currency: 'greenParticles',
    type: 'yellow-automators', resetId: 'yellow-automators', style: 'automator', unlocked: false, active: false, requirement: ['greens', new Num(1, 0)],
    target: 'yellow-particles', targetType: 'generators'
  },
  {
    name: 'yellow-fusion-upgrades', displayName: 'Yellow Fusion Automator', cost: new Num(5, 1), bought: new Num(0, 0), currency: 'greenParticles',
    type: 'yellow-automators', resetId: 'yellow-automators', style: 'automator', unlocked: false, active: false, requirement: ['greens', new Num(1, 0)],
    target: 'yellow-fusion', targetType: 'upgrades'
  },
]
