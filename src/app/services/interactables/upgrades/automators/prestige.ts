import {Automator} from "../../../../globals";
import {Num} from "../../../../num";

export const prestigeAutomators: Automator[] = [
  {
    name: 'go-yellow-automator', displayName: 'Go Yellow Automator', cost: new Num(1, 3), bought: new Num(0, 0), currency: 'yellowParticles',
    type: 'prestige-automators', resetId: 'prestige-automators', style: 'automator', unlocked: false, active: false, requirement: ['yellows', new Num(1, 0)],
    target: 'yellow-prestige', targetType: 'prestige', waitFor: new Num(0, 0), layer: 'yellow'
  },
]
