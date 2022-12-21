import {Num} from "../../../num";

export const combinerTarget = [
  {
    name: 'boost-red-generators', displayName: 'Red Generators', cost: new Num(1, 3), currency: 'blueParticles', type: 'blue-target', resetId: 'blue-combiners', style: 'blue-style',
    unlocked: false, requirement: ['blueParticles', new Num(1, 4)], active: false, element: 'redParticleGenerators', buffer: new Num(1, 2), bought: new Num(0, 0)
  },
  {
    name: 'boost-yellow-generators', displayName: 'Yellow Generators', cost: new Num(1, 5), currency: 'blueParticles', type: 'blue-target', resetId: 'blue-combiners', style: 'blue-style',
    unlocked: false, requirement: ['blueParticles', new Num(1, 4)], active: false, element: 'yellowParticleGenerators', buffer: new Num(5, 0), bought: new Num(0, 0)
  },
  {
    name: 'boost-red-accelerators', displayName: 'Red Accerelator Generators', cost: new Num(1, 17), currency: 'blueParticles', type: 'blue-target', resetId: 'blue-combiners', style: 'blue-style',
    unlocked: false, requirement: ['blueParticles', new Num(1, 4)], active: false, element: 'redAcceleratorGenerators', buffer: new Num(1, 1), bought: new Num(0, 0)
  },
  {
    name: 'boost-green-generators', displayName: 'Green Generators', cost: new Num(1, 25), currency: 'blueParticles', type: 'blue-target', resetId: 'blue-combiners', style: 'blue-style',
    unlocked: false, requirement: ['blueParticles', new Num(1, 4)], active: false, element: 'redAcceleratorGenerators', buffer: new Num(1, 0), bought: new Num(0, 0)
  },
  {
    name: 'boost-yellow-fusion', displayName: 'Yellow Fusion Generation', cost: new Num(1, 35), currency: 'blueParticles', type: 'blue-target', resetId: 'blue-combiners', style: 'blue-style',
    unlocked: false, requirement: ['blueParticles', new Num(1, 4)], active: false, element: 'redAcceleratorGenerators', buffer: new Num(1, 1), bought: new Num(0, 0)
  },
  {
    name: 'boost-nuclear-decay', displayName: 'Nuclear Decay Generators', cost: new Num(1, 60), currency: 'blueParticles', type: 'blue-target', resetId: 'blue-combiners', style: 'blue-style',
    unlocked: false, requirement: ['blueParticles', new Num(1, 4)], active: false, element: 'redAcceleratorGenerators', buffer: new Num(1, -1), bought: new Num(0, 0)
  },
]
