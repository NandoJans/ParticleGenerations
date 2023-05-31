import {Num} from "../../../../num";

export const blueParticleGenerators = [
  {
    name: 'blue-neutron-generator-1', displayName: 'Blue Neutron Generator 1', auto: false, style: 'blue-style', noMax: true,
    baseCost: new Num(1, 0), cost: new Num(1, 0), increase: new Num(1, 1), scaling: new Num(1, 1), bought: new Num(0, 0), currency: 'blueParticles',
    generates: 'blueNeutrons', baseMulMod: new Num(1, 0), baseMultiplier: new Num(1, 1), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'blue-neutrons', resetId: 'blue', unlocked: false,
    requirement: ['holding', 'blues', new Num(1, 0)], nav: 'blue', subNav: 'blueNeutrons', globalMultiplier: 'blueNeutronGenerators',
  },
  {
    name: 'blue-neutron-generator-2', displayName: 'Blue Neutron Generator 2', auto: false, style: 'blue-style', noMax: true, scalingStart: new Num(1, 19),
    baseCost: new Num(2.5, 1), cost: new Num(2.5, 1), increase: new Num(1, 2), scaling: new Num(1, 1), bought: new Num(0, 0), currency: 'blueParticles',
    generates: 'blue-neutron-generator-1', baseMulMod: new Num(1, 0), baseMultiplier: new Num(1, 1), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'blue-neutrons', resetId: 'blue', unlocked: false,
    requirement: ['holding', 'blues', new Num(1, 0)], nav: 'blue', subNav: 'blueNeutrons', globalMultiplier: 'blueNeutronGenerators',
  },
  {
    name: 'blue-neutron-generator-3', displayName: 'Blue Neutron Generator 3', auto: false, style: 'blue-style', noMax: true, scalingStart: new Num(1, 19),
    baseCost: new Num(5, 2), cost: new Num(5, 2), increase: new Num(1, 3), scaling: new Num(1, 1), bought: new Num(0, 0), currency: 'blueParticles',
    generates: 'blue-neutron-generator-2', baseMulMod: new Num(1, 0), baseMultiplier: new Num(1, 1), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'blue-neutrons', resetId: 'blue', unlocked: false,
    requirement: ['holding', 'blues', new Num(1, 0)], nav: 'blue', subNav: 'blueNeutrons', globalMultiplier: 'blueNeutronGenerators',
  },
  {
    name: 'blue-generator-1', displayName: 'Blue Generator 1', auto: false, style: 'blue-style',
    baseCost: new Num(1, 60), cost: new Num(1, 60), increase: new Num(1, 5), scaling: new Num(2, 0), bought: new Num(0, 0), currency: 'blueParticles',
    generates: 'blueHydrogen', baseMulMod: new Num(1, 0), baseMultiplier: new Num(5, 0), multiplier: new Num(5, 0), amount: new Num(0, 0) , type: 'blue-particles', resetId: 'blue', unlocked: false,
    requirement: ['holding', 'blueParticles', new Num(1, 30)], nav: 'blue', subNav: 'blueGenerators', globalMultiplier: 'blueParticleGenerators',
  },
  {
    name: 'blue-generator-2', displayName: 'Blue Generator 2', auto: false, style: 'blue-style',
    baseCost: new Num(1, 70), cost: new Num(1, 70), increase: new Num(1, 10), scaling: new Num(4, 0), bought: new Num(0, 0), currency: 'blueParticles',
    generates: 'blue-generator-1', baseMulMod: new Num(1, 0), baseMultiplier: new Num(5, 0), multiplier: new Num(5, 0), amount: new Num(0, 0) , type: 'blue-particles', resetId: 'blue', unlocked: false,
    requirement: ['holding', 'blueParticles', new Num(1, 30)], nav: 'blue', subNav: 'blueGenerators', globalMultiplier: 'blueParticleGenerators',
  },
  {
    name: 'blue-generator-3', displayName: 'Blue Generator 3', auto: false, style: 'blue-style',
    baseCost: new Num(1, 80), cost: new Num(1, 80), increase: new Num(1, 15), scaling: new Num(6, 0), bought: new Num(0, 0), currency: 'blueParticles',
    generates: 'blue-generator-2', baseMulMod: new Num(1, 0), baseMultiplier: new Num(5, 0), multiplier: new Num(5, 0), amount: new Num(0, 0) , type: 'blue-particles', resetId: 'blue', unlocked: false,
    requirement: ['holding', 'blueParticles', new Num(1, 30)], nav: 'blue', subNav: 'blueGenerators', globalMultiplier: 'blueParticleGenerators',
  },
  {
    name: 'blue-generator-4', displayName: 'Blue Generator 4', auto: false, style: 'blue-style',
    baseCost: new Num(1, 90), cost: new Num(1, 90), increase: new Num(1, 20), scaling: new Num(8, 0), bought: new Num(0, 0), currency: 'blueParticles',
    generates: 'blue-generator-3', baseMulMod: new Num(1, 0), baseMultiplier: new Num(5, 0), multiplier: new Num(5, 0), amount: new Num(0, 0) , type: 'blue-particles', resetId: 'blue', unlocked: false,
    requirement: ['holding', 'blueParticles', new Num(1, 30)], nav: 'blue', subNav: 'blueGenerators', globalMultiplier: 'blueParticleGenerators',
  },
  {
    name: 'blue-generator-5', displayName: 'Blue Generator 5', auto: false, style: 'blue-style',
    baseCost: new Num(1, 100), cost: new Num(1, 100), increase: new Num(1, 25), scaling: new Num(1, 1), bought: new Num(0, 0), currency: 'blueParticles',
    generates: 'blue-generator-4', baseMulMod: new Num(1, 0), baseMultiplier: new Num(5, 0), multiplier: new Num(5, 0), amount: new Num(0, 0) , type: 'blue-particles', resetId: 'blue', unlocked: false,
    requirement: ['holding', 'blueParticles', new Num(1, 30)], nav: 'blue', subNav: 'blueGenerators', globalMultiplier: 'blueParticleGenerators',
  },
]
