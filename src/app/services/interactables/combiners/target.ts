import {Num} from "../../../num";

export const combinerTarget = [
  {
    name: 'boost-red-generators', displayName: 'Red Generators', cost: new Num(1, 3), currency: 'blueParticles', type: 'blue-target', resetId: 'blue-combiners', style: 'blue-style',
    unlocked: false, requirement: ['blueParticles', new Num(1, 4)], active: false, element: 'redParticleGenerators', buffer: new Num(1, 2), bought: new Num(0, 0),
    nav: 'blue', subNav: 'blueCombiners'
  },
  {
    name: 'boost-yellow-generators', displayName: 'Yellow Generators', cost: new Num(1, 5), currency: 'blueParticles', type: 'blue-target', resetId: 'blue-combiners', style: 'blue-style',
    unlocked: false, requirement: ['blueParticles', new Num(1, 4)], active: false, element: 'yellowParticleGenerators', buffer: new Num(4, 0), bought: new Num(0, 0),
    nav: 'blue', subNav: 'blueCombiners'
  },
  {
    name: 'boost-red-accelerators', displayName: 'Red Accerelator Generators', cost: new Num(1, 19), currency: 'blueParticles', type: 'blue-target', resetId: 'blue-combiners', style: 'blue-style',
    unlocked: false, requirement: ['blueParticles', new Num(1, 4)], active: false, element: 'redAcceleratorGenerators', buffer: new Num(6, 1), bought: new Num(0, 0),
    nav: 'blue', subNav: 'blueCombiners'
  },
  {
    name: 'boost-green-generators', displayName: 'Green Generators', cost: new Num(1, 27), currency: 'blueParticles', type: 'blue-target', resetId: 'blue-combiners', style: 'blue-style',
    unlocked: false, requirement: ['blueParticles', new Num(1, 4)], active: false, element: 'greenParticleGenerators', buffer: new Num(2.7, -2), bought: new Num(0, 0),
    nav: 'blue', subNav: 'blueCombiners'
  },
  {
    name: 'boost-yellow-fusion', displayName: 'Yellow Fusion Generation', cost: new Num(1, 40), currency: 'blueParticles', type: 'blue-target', resetId: 'blue-combiners', style: 'blue-style',
    unlocked: false, requirement: ['blueParticles', new Num(1, 4)], active: false, element: 'yellowFusion', buffer: new Num(3.5, -3), bought: new Num(0, 0),
    nav: 'blue', subNav: 'blueCombiners'
  },
  {
    name: 'boost-nuclear-decay', displayName: 'Nuclear Decay Generators', cost: new Num(1, 70), currency: 'blueParticles', type: 'blue-target', resetId: 'blue-combiners', style: 'blue-style',
    unlocked: false, requirement: ['blueParticles', new Num(1, 4)], active: false, element: 'nuclearDecayGenerators', buffer: new Num(2.9, -5), bought: new Num(0, 0),
    nav: 'blue', subNav: 'blueCombiners'
  },
]
