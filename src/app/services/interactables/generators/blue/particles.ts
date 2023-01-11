import {Num} from "../../../../num";

export const blueParticleGenerators = [
  {
    name: 'blue-neutron-generator', displayName: 'Blue Neutron Generator', auto: false, style: 'blue-style', noMax: true, scalingStart: new Num(1, 19),
    baseCost: new Num(1, 0), cost: new Num(1, 0), increase: new Num(1, 2), scaling: new Num(1, 1), bought: new Num(0, 0), currency: 'blueParticles',
    generates: 'blueNeutrons', baseMultiplier: new Num(1, 1), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'blue-neutrons', resetId: 'blue-neutrons', unlocked: false,
    requirement: ['holding', 'blues', new Num(1, 0)]
  },
]
