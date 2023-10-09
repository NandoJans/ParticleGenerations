import {Num} from "../../../../num";

export const yellowParticleGenerators = [
  {
    name: 'yellow-generator-1', displayName: 'Yellow Generator 1', auto: false, style: 'even generator-yellow-style',
    baseCost: new Num(1, 2), cost: new Num(1, 2), increase: new Num(1, 1), scaling: new Num(2, 0), scalingStart: new Num(1, 50000), bought: new Num(0, 0), currency: 'yellowParticles',
    generates: 'yellowPower', baseMulMod: new Num(1, 0), baseMultiplier: new Num(25, 0), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'yellow-particles', resetId: 'yellow', unlocked: true,
    requirement: ['holding', 'yellowParticles', new Num(1, 2)], nav: 'yellow', subNav: 'yellowGenerators', globalMultiplier: 'yellowParticleGenerators',
  },
  {
    name: 'yellow-generator-2', displayName: 'Yellow Generator 2', auto: false, style: 'uneven generator-yellow-style',
    baseCost: new Num(1, 3), cost: new Num(1, 3), increase: new Num(1, 2), scaling: new Num(2, 0), scalingStart: new Num(1, 50000), bought: new Num(0, 0), currency: 'yellowParticles',
    generates: 'yellow-generator-1', baseMulMod: new Num(1, 0), baseMultiplier: new Num(20, 0), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'yellow-particles', resetId: 'yellow', unlocked: true,
    requirement: ['holding', 'yellowParticles', new Num(1, 2)], nav: 'yellow', subNav: 'yellowGenerators', globalMultiplier: 'yellowParticleGenerators',
  },
  {
    name: 'yellow-generator-3', displayName: 'Yellow Generator 3', auto: false, style: 'even generator-yellow-style',
    baseCost: new Num(1, 4), cost: new Num(1, 4), increase: new Num(1, 3), scaling: new Num(2, 0), scalingStart: new Num(1, 50000), bought: new Num(0, 0), currency: 'yellowParticles',
    generates: 'yellow-generator-2', baseMulMod: new Num(1, 0), baseMultiplier: new Num(20, 0), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'yellow-particles', resetId: 'yellow', unlocked: true,
    requirement: ['holding', 'yellowParticles', new Num(1, 2)], nav: 'yellow', subNav: 'yellowGenerators', globalMultiplier: 'yellowParticleGenerators',
  },
  {
    name: 'yellow-generator-4', displayName: 'Yellow Generator 4', auto: false, style: 'uneven generator-yellow-style',
    baseCost: new Num(1, 5), cost: new Num(1, 5), increase: new Num(1, 4), scaling: new Num(2, 0), scalingStart: new Num(1, 50000), bought: new Num(0, 0), currency: 'yellowParticles',
    generates: 'yellow-generator-3', baseMulMod: new Num(1, 0), baseMultiplier: new Num(20, 0), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'yellow-particles', resetId: 'yellow', unlocked: true,
    requirement: ['holding', 'yellowParticles', new Num(1, 2)], nav: 'yellow', subNav: 'yellowGenerators', globalMultiplier: 'yellowParticleGenerators',
  },
  {
    name: 'yellow-generator-5', displayName: 'Yellow Generator 5', auto: false, style: 'even generator-yellow-style',
    baseCost: new Num(1, 6), cost: new Num(1, 6), increase: new Num(1, 5), scaling: new Num(2, 0), scalingStart: new Num(1, 50000), bought: new Num(0, 0), currency: 'yellowParticles',
    generates: 'yellow-generator-4', baseMulMod: new Num(1, 0), baseMultiplier: new Num(20, 0), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'yellow-particles', resetId: 'yellow', unlocked: true,
    requirement: ['holding', 'yellowParticles', new Num(1, 2)], nav: 'yellow', subNav: 'yellowGenerators', globalMultiplier: 'yellowParticleGenerators',
  },

  {
    name: 'yellow-fusion-generator', displayName: 'Yellow Fusion Generator', auto: false, style: 'yellow-style',
    baseCost: new Num(1, 0), cost: new Num(1, 0), increase: new Num(1, 0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'yellowParticles',
    generates: 'yellowFusion', baseMulMod: new Num(1, 0), baseMultiplier: new Num(0, 0), multiplier: new Num(0, 0), amount: new Num(0, 0) , type: 'yellow-fusion', resetId: 'yellow', unlocked: true,
    requirement: ['upgrade', 'unlock-yellow-fusion', new Num(1, 0)], nav: '', subNav: '', globalMultiplier: 'yellowFusion',
  },
]
