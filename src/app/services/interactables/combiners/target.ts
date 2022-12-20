import {Num} from "../../../num";

export const combinerTarget = [
  {
    name: 'boost-red-generators', displayName: 'Red Generators', cost: new Num(2, 3), currency: 'blueParticles', type: 'blue-target', resetId: 'blue-combiners', style: 'blue-style',
    unlocked: false, requirement: ['blueParticles', new Num(1, 4)], active: false, element: 'redParticleGenerators', buffer: new Num(1, 2), bought: new Num(0, 0)
  },
  {
    name: 'boost-yellow-generators', displayName: 'Yellow Generators', cost: new Num(1, 5), currency: 'blueParticles', type: 'blue-target', resetId: 'blue-combiners', style: 'blue-style',
    unlocked: false, requirement: ['blueParticles', new Num(1, 4)], active: false, element: 'yellowParticleGenerators', buffer: new Num(5, 0), bought: new Num(0, 0)
  },
]
