import {Num} from "../../../num";

export const combinerSubject = [
  {
    name: 'based-on-red-particles', displayName: 'Red Particles', cost: new Num(5, 4), currency: 'blueParticles', type: 'blue-subject', resetId: 'blue-combiners', style: 'blue-style',
    unlocked: false, requirement: ['blueParticles', new Num(1, 4)], active: false, element: 'redParticles', buffer: new Num(3, -6), bought: new Num(0, 0),
    nav: 'blue', subNav: 'blueCombiners'
  },
  {
    name: 'based-on-yellow-particles', displayName: 'Yellow Particles', cost: new Num(1, 10), currency: 'blueParticles', type: 'blue-subject', resetId: 'blue-combiners', style: 'blue-style',
    unlocked: false, requirement: ['blueParticles', new Num(1, 4)], active: false, element: 'yellowParticles', buffer: new Num(9, -4), bought: new Num(0, 0),
    nav: 'blue', subNav: 'blueCombiners'
  },
  {
    name: 'based-on-red-accelerators', displayName: 'Red Accelerators', cost: new Num(1, 26), currency: 'blueParticles', type: 'blue-subject', resetId: 'blue-combiners', style: 'blue-style',
    unlocked: false, requirement: ['blueParticles', new Num(1, 4)], active: false, element: 'redAccelerators', buffer: new Num(15, -5), bought: new Num(0, 0),
    nav: 'blue', subNav: 'blueCombiners'
  },
  {
    name: 'based-on-green-particles', displayName: 'Green Particles', cost: new Num(1, 40), currency: 'blueParticles', type: 'blue-subject', resetId: 'blue-combiners', style: 'blue-style',
    unlocked: false, requirement: ['blueParticles', new Num(1, 4)], active: false, element: 'greenParticles', buffer: new Num(9, -1), bought: new Num(0, 0),
    nav: 'blue', subNav: 'blueCombiners'
  },
  {
    name: 'based-on-yellow-fusion', displayName: 'Yellow Fusion', cost: new Num(1, 65), currency: 'blueParticles', type: 'blue-subject', resetId: 'blue-combiners', style: 'blue-style',
    unlocked: false, requirement: ['blueParticles', new Num(1, 4)], active: false, element: 'yellowFusion', buffer: new Num(1, -3), bought: new Num(0, 0),
    nav: 'blue', subNav: 'blueCombiners'
  },
  {
    name: 'based-on-nuclear-decay', displayName: 'Nuclear Decay', cost: new Num(1, 70), currency: 'blueParticles', type: 'blue-subject', resetId: 'blue-combiners', style: 'blue-style',
    unlocked: false, requirement: ['blueParticles', new Num(1, 4)], active: false, element: 'nuclearDecay', buffer: new Num(2, 2), bought: new Num(0, 0),
    nav: 'blue', subNav: 'blueCombiners'
  },
]
