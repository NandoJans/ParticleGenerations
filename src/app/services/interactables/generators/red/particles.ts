import {Num} from "../../../../num";

export const redParticleGenerators = [
  {
    name: 'red-generator-1', displayName: 'Red Generator 1', auto: false, style: 'even generator-red-style',
    baseCost: new Num(1, 1), cost: new Num(1, 1), increase: new Num(1, 1), scaling: new Num(1, 1), bought: new Num(0, 0), currency: 'redParticles',
    generates: 'redParticles', baseMulMod: new Num(1, 0), baseMultiplier: new Num(2, 0), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'red-particles', resetId: 'redParticleGenerators', unlocked: true,
    requirement: ['none'], nav: 'red', subNav: 'redParticles', globalMultiplier: 'redParticleGenerators',
  },
  {
    name: 'red-generator-2', displayName: 'Red Generator 2', auto: false, style: 'uneven generator-red-style',
    baseCost: new Num(1, 2), cost: new Num(1, 2), increase: new Num(1, 2), scaling: new Num(1, 1), bought: new Num(0, 0), currency: 'redParticles',
    generates: 'red-generator-1', baseMulMod: new Num(1, 0), baseMultiplier: new Num(2, 0), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'red-particles', resetId: 'redParticleGenerators', unlocked: false,
    requirement: ['upgrade', 'red-generator-extension', new Num(1, 0)], nav: 'red', subNav: 'redParticles', globalMultiplier: 'redParticleGenerators',
  },
  {
    name: 'red-generator-3', displayName: 'Red Generator 3', auto: false, style: 'even generator-red-style',
    baseCost: new Num(1, 3), cost: new Num(1, 3), increase: new Num(1, 3), scaling: new Num(1, 1), bought: new Num(0, 0), currency: 'redParticles',
    generates: 'red-generator-2', baseMulMod: new Num(1, 0), baseMultiplier: new Num(2, 0), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'red-particles', resetId: 'redParticleGenerators', unlocked: false,
    requirement: ['upgrade', 'red-generator-extension', new Num(2, 0)], nav: 'red', subNav: 'redParticles', globalMultiplier: 'redParticleGenerators',
  },
  {
    name: 'red-generator-4', displayName: 'Red Generator 4', auto: false, style: 'uneven generator-red-style',
    baseCost: new Num(1, 4), cost: new Num(1, 4), increase: new Num(1, 4), scaling: new Num(1, 1), bought: new Num(0, 0), currency: 'redParticles',
    generates: 'red-generator-3', baseMulMod: new Num(1, 0), baseMultiplier: new Num(2, 0), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'red-particles', resetId: 'redParticleGenerators', unlocked: false,
    requirement: ['upgrade', 'red-generator-extension', new Num(3, 0)], nav: 'red', subNav: 'redParticles', globalMultiplier: 'redParticleGenerators',
  },
  {
    name: 'red-generator-5', displayName: 'Red Generator 5', auto: false, style: 'even generator-red-style',
    baseCost: new Num(1, 5), cost: new Num(1, 5), increase: new Num(1, 5), scaling: new Num(1, 1), bought: new Num(0, 0), currency: 'redParticles',
    generates: 'red-generator-4', baseMulMod: new Num(1, 0), baseMultiplier: new Num(2, 0), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'red-particles', resetId: 'redParticleGenerators', unlocked: false,
    requirement: ['upgrade', 'red-generator-extension', new Num(4, 0)], nav: 'red', subNav: 'redParticles', globalMultiplier: 'redParticleGenerators',
  },
]
