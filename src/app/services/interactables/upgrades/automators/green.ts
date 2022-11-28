import {Num} from "../../../../num";
import {Automator} from "../../../../globals";

export const greenAutomators: Automator[] = [
  {
    name: '2x-green-particles-multiplier', displayName: '2x Green Particle Automator', cost: new Num(2, 0), bought: new Num(0, 0), currency: 'blueParticles',
    type: 'green-automators', resetId: 'green-automators', style: 'automator', unlocked: false, active: false, requirement: ['blues', new Num(1, 0)],
    target: 'green-particle-multiplier', targetType: 'upgrade'
  },
  {
    name: 'green-generators-automator', displayName: 'Green Generators Automator', cost: new Num(3, 0), bought: new Num(0, 0), currency: 'blueParticles',
    type: 'green-automators', resetId: 'green-automators', style: 'automator', unlocked: false, active: false, requirement: ['blues', new Num(1, 0)],
    target: 'green-particles', targetType: 'generators'
  },
  {
    name: 'green-sacrifice-automator', displayName: 'Green Sacrifice Automator', cost: new Num(3, 0), bought: new Num(0, 0), currency: 'blueParticles',
    type: 'green-automators', resetId: 'green-automators', style: 'automator', unlocked: false, active: false, requirement: ['blues', new Num(1, 0)],
    target: 'green-sacrifices', targetType: 'upgrades'
  },
  {
    name: 'dark-compressor-automator', displayName: 'Dark Compressor Automator', cost: new Num(1, 1), bought: new Num(0, 0), currency: 'blueParticles',
    type: 'green-automators', resetId: 'green-automators', style: 'automator', unlocked: false, active: false, requirement: ['blues', new Num(1, 0)],
    target: 'dark-energy-compressor', targetType: 'upgrade'
  },
]
