import {Automator} from "../../../../globals";
import {Num} from "../../../../num";

export const prestigeAutomators: Automator[] = [
  {
    name: 'go-yellow-automator', displayName: 'Go Yellow Automator', cost: new Num(1, 3), bought: new Num(0, 0), currency: 'yellowParticles',
    type: 'prestige-automators', resetId: 'prestige-automators', style: 'automator', unlocked: false, active: false, requirement: ['yellows', new Num(1, 0)],
    target: 'yellow-prestige', targetType: 'prestige', waitFor: new Num(0, 0), layer: 'yellow', nav: 'automators', subNav: 'prestigeAutomators',
    prestigeType: 'waitFor'
  },
  {
    name: 'go-green-automator', displayName: 'Go Green Automator', cost: new Num(1, 3), bought: new Num(0, 0), currency: 'greenParticles',
    type: 'prestige-automators', resetId: 'prestige-automators', style: 'automator', unlocked: false, active: false, requirement: ['greens', new Num(1, 0)],
    target: 'green-prestige', targetType: 'prestige', waitFor: new Num(0, 0), layer: 'green', nav: 'automators', subNav: 'prestigeAutomators',
    prestigeType: 'waitFor'
  },
  {
    name: 'go-blue-automator', displayName: 'Go Blue Automator', cost: new Num(1, 3), bought: new Num(0, 0), currency: 'blueParticles',
    type: 'prestige-automators', resetId: 'prestige-automators', style: 'automator', unlocked: false, active: false, requirement: ['blues', new Num(1, 0)],
    target: 'blue-prestige', targetType: 'prestige', waitFor: new Num(0, 0), layer: 'blue', nav: 'automators', subNav: 'prestigeAutomators',
    prestigeType: 'waitFor'
  },
]
