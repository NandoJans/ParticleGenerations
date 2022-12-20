import {Num} from "../../../num";

export const combinerSubject = [
  {
    name: 'based-on-red-particles', displayName: 'Red Particles', cost: new Num(2, 3), currency: 'blueParticles', type: 'blue-subject', resetId: 'blue-combiners', style: 'blue-style',
    unlocked: false, requirement: ['blueParticles', new Num(1, 4)], active: false, element: 'redParticles', buffer: new Num(1, -4), bought: new Num(0, 0)
  },
  {
    name: 'based-on-yellow-particles', displayName: 'Yellow Particles', cost: new Num(1, 6), currency: 'blueParticles', type: 'blue-subject', resetId: 'blue-combiners', style: 'blue-style',
    unlocked: false, requirement: ['blueParticles', new Num(1, 4)], active: false, element: 'yellowParticles', buffer: new Num(1, -1), bought: new Num(0, 0)
  },
]
