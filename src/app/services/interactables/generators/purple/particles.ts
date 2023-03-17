import {Num} from "../../../../num";

export const purpleParticleGenerators = [
  {
    name: 'purple-generator-1', displayName: 'Purple Generator 1', auto: false, style: 'purple-style',
    baseCost: new Num(1, 0), cost: new Num(1, 0), increase: new Num(1, 1), scaling: new Num(1, 1), bought: new Num(0, 0), currency: 'purpleParticles',
    generates: 'purpleVoid', baseMulMod: new Num(1, 0), baseMultiplier: new Num(5, 0), multiplier: new Num(5, 0), amount: new Num(0, 0) , type: 'purple-particles', resetId: 'purpleParticleGenerators', unlocked: false,
    requirement: ['holding', 'purples', new Num(1, 0)], nav: 'purple', subNav: 'purpleGenerators', globalMultiplier: 'purpleParticleGenerators',
  },
  {
    name: 'purple-generator-2', displayName: 'Purple Generator 2', auto: false, style: 'purple-style',
    baseCost: new Num(1, 10), cost: new Num(1, 10), increase: new Num(1, 5), scaling: new Num(1, 1), bought: new Num(0, 0), currency: 'purpleParticles',
    generates: 'purple-generator-1', baseMulMod: new Num(1, 0), baseMultiplier: new Num(5, 0), multiplier: new Num(5, 0), amount: new Num(0, 0) , type: 'purple-particles', resetId: 'purpleParticleGenerators', unlocked: false,
    requirement: ['holding', 'purples', new Num(1, 0)], nav: 'purple', subNav: 'purpleGenerators', globalMultiplier: 'purpleParticleGenerators',
  },
  {
    name: 'purple-generator-3', displayName: 'Purple Generator 3', auto: false, style: 'purple-style',
    baseCost: new Num(1, 25), cost: new Num(1, 25), increase: new Num(5, 12), scaling: new Num(1, 1), bought: new Num(0, 0), currency: 'purpleParticles',
    generates: 'purple-generator-2', baseMulMod: new Num(1, 0), baseMultiplier: new Num(5, 0), multiplier: new Num(5, 0), amount: new Num(0, 0) , type: 'purple-particles', resetId: 'purpleParticleGenerators', unlocked: false,
    requirement: ['holding', 'purples', new Num(1, 0)], nav: 'purple', subNav: 'purpleGenerators', globalMultiplier: 'purpleParticleGenerators',
  },
  {
    name: 'purple-generator-4', displayName: 'Purple Generator 4', auto: false, style: 'purple-style',
    baseCost: new Num(1, 50), cost: new Num(1, 50), increase: new Num(1, 25), scaling: new Num(1, 1), bought: new Num(0, 0), currency: 'purpleParticles',
    generates: 'purple-generator-3', baseMulMod: new Num(1, 0), baseMultiplier: new Num(5, 0), multiplier: new Num(5, 0), amount: new Num(0, 0) , type: 'purple-particles', resetId: 'purpleParticleGenerators', unlocked: false,
    requirement: ['holding', 'purples', new Num(1, 0)], nav: 'purple', subNav: 'purpleGenerators', globalMultiplier: 'purpleParticleGenerators',
  },
  {
    name: 'purple-generator-5', displayName: 'Purple Generator 5', auto: false, style: 'purple-style',
    baseCost: new Num(1, 80), cost: new Num(1, 80), increase: new Num(1, 40), scaling: new Num(1, 1), bought: new Num(0, 0), currency: 'purpleParticles',
    generates: 'purple-generator-4', baseMulMod: new Num(1, 0), baseMultiplier: new Num(5, 0), multiplier: new Num(5, 0), amount: new Num(0, 0) , type: 'purple-particles', resetId: 'purpleParticleGenerators', unlocked: false,
    requirement: ['holding', 'purples', new Num(1, 0)], nav: 'purple', subNav: 'purpleGenerators', globalMultiplier: 'purpleParticleGenerators',
  },
]
