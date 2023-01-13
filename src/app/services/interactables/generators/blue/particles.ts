import {Num} from "../../../../num";

export const blueParticleGenerators = [
  {
    name: 'blue-neutron-generator', displayName: 'Blue Neutron Generator', auto: false, style: 'blue-style', noMax: true, scalingStart: new Num(1, 19),
    baseCost: new Num(1, 0), cost: new Num(1, 0), increase: new Num(1, 2), scaling: new Num(1, 1), bought: new Num(0, 0), currency: 'blueParticles',
    generates: 'blueNeutrons', baseMultiplier: new Num(1, 1), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'blue-neutrons', resetId: 'blue-neutrons', unlocked: false,
    requirement: ['holding', 'blues', new Num(1, 0)], nav: 'blue', subNav: 'blueNeutrons'
  },
  {
    name: 'blue-generator-1', displayName: 'Blue Generator 1', auto: false, style: 'blue-style',
    baseCost: new Num(1, 40), cost: new Num(1, 40), increase: new Num(1, 5), scaling: new Num(1.5, 0), scalingStart: new Num(1, 2000), bought: new Num(0, 0), currency: 'blueParticles',
    generates: 'blueHydrogen', baseMultiplier: new Num(1, 1), multiplier: new Num(1, 1), amount: new Num(0, 0) , type: 'blue-particles', resetId: 'blueParticleGenerators', unlocked: false,
    requirement: ['holding', 'greenParticles', new Num(1, 40)], nav: 'blue', subNav: 'blueGenerators'
  },
  {
    name: 'blue-generator-2', displayName: 'Blue Generator 2', auto: false, style: 'blue-style',
    baseCost: new Num(1, 45), cost: new Num(1, 45), increase: new Num(1, 10), scaling: new Num(1.5, 0), scalingStart: new Num(1, 2000), bought: new Num(0, 0), currency: 'blueParticles',
    generates: 'blue-generator-1', baseMultiplier: new Num(1, 2), multiplier: new Num(1, 2), amount: new Num(0, 0) , type: 'blue-particles', resetId: 'blueParticleGenerators', unlocked: false,
    requirement: ['holding', 'greenParticles', new Num(1, 40)], nav: 'blue', subNav: 'blueGenerators'
  },
  {
    name: 'blue-generator-3', displayName: 'Blue Generator 3', auto: false, style: 'blue-style',
    baseCost: new Num(1, 55), cost: new Num(1, 55), increase: new Num(1, 15), scaling: new Num(1.5, 0), scalingStart: new Num(1, 2000), bought: new Num(0, 0), currency: 'blueParticles',
    generates: 'blue-generator-2', baseMultiplier: new Num(1, 3), multiplier: new Num(1, 3), amount: new Num(0, 0) , type: 'blue-particles', resetId: 'blueParticleGenerators', unlocked: false,
    requirement: ['holding', 'greenParticles', new Num(1, 40)], nav: 'blue', subNav: 'blueGenerators'
  },
  {
    name: 'blue-generator-4', displayName: 'Blue Generator 4', auto: false, style: 'blue-style',
    baseCost: new Num(1, 65), cost: new Num(1, 65), increase: new Num(1, 20), scaling: new Num(1.5, 0), scalingStart: new Num(1, 2000), bought: new Num(0, 0), currency: 'blueParticles',
    generates: 'blue-generator-3', baseMultiplier: new Num(1, 4), multiplier: new Num(1, 4), amount: new Num(0, 0) , type: 'blue-particles', resetId: 'blueParticleGenerators', unlocked: false,
    requirement: ['holding', 'greenParticles', new Num(1, 40)], nav: 'blue', subNav: 'blueGenerators'
  },
  {
    name: 'blue-generator-5', displayName: 'Blue Generator 5', auto: false, style: 'blue-style',
    baseCost: new Num(1, 80), cost: new Num(1, 80), increase: new Num(1, 25), scaling: new Num(1.5, 0), scalingStart: new Num(1, 2000), bought: new Num(0, 0), currency: 'blueParticles',
    generates: 'blue-generator-4', baseMultiplier: new Num(1, 5), multiplier: new Num(1, 5), amount: new Num(0, 0) , type: 'blue-particles', resetId: 'blueParticleGenerators', unlocked: false,
    requirement: ['holding', 'greenParticles', new Num(1, 40)], nav: 'blue', subNav: 'blueGenerators'
  },
]
