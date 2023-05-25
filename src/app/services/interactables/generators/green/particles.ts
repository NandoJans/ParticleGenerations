import {Num} from "../../../../num";

export const greenParticleGenerators = [
  {
    name: 'green-generator-1', displayName: 'Green Generator 1', auto: false, style: 'green-style',
    baseCost: new Num(1, 0), cost: new Num(1, 0), increase: new Num(5, 1), scaling: new Num(2, 0), scalingStart: new Num(1, 150), bought: new Num(0, 0), currency: 'greenParticles',
    generates: 'greenEnergy', baseMulMod: new Num(1, 0), baseMultiplier: new Num(5, 0), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'green-particles', resetId: 'green', unlocked: false,
    requirement: ['holding', 'greens', new Num(1, 0)], nav: 'green', subNav: 'greenGenerators', globalMultiplier: 'greenParticleGenerators',
  },
  {
    name: 'green-generator-2', displayName: 'Green Generator 2', auto: false, style: 'green-style',
    baseCost: new Num(5, 0), cost: new Num(5, 0), increase: new Num(2.5, 1), scaling: new Num(2, 0), scalingStart: new Num(1, 150), bought: new Num(0, 0), currency: 'greenParticles',
    generates: 'green-generator-1', baseMulMod: new Num(1, 0), baseMultiplier: new Num(5, 0), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'green-particles', resetId: 'green', unlocked: false,
    requirement: ['holding', 'greens', new Num(1, 0)], nav: 'green', subNav: 'greenGenerators', globalMultiplier: 'greenParticleGenerators',
  },
  {
    name: 'green-generator-3', displayName: 'Green Generator 3', auto: false, style: 'green-style',
    baseCost: new Num(2.5, 1), cost: new Num(2.5, 1), increase: new Num(1.25, 2), scaling: new Num(2, 0), scalingStart: new Num(1, 150), bought: new Num(0, 0), currency: 'greenParticles',
    generates: 'green-generator-2', baseMulMod: new Num(1, 0), baseMultiplier: new Num(5, 0), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'green-particles', resetId: 'green', unlocked: false,
    requirement: ['holding', 'greens', new Num(1, 0)], nav: 'green', subNav: 'greenGenerators', globalMultiplier: 'greenParticleGenerators',
  },
  {
    name: 'green-generator-4', displayName: 'Green Generator 4', auto: false, style: 'green-style',
    baseCost: new Num(1, 3), cost: new Num(1, 3), increase: new Num(5, 1), scaling: new Num(2, 0), scalingStart: new Num(1, 150), bought: new Num(0, 0), currency: 'greenParticles',
    generates: 'green-generator-3', baseMulMod: new Num(1, 0), baseMultiplier: new Num(5, 0), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'green-particles', resetId: 'green', unlocked: false,
    requirement: ['holding', 'greens', new Num(1, 0)], nav: 'green', subNav: 'greenGenerators', globalMultiplier: 'greenParticleGenerators',
  },
  {
    name: 'green-generator-5', displayName: 'Green Generator 5', auto: false, style: 'green-style',
    baseCost: new Num(1, 5), cost: new Num(1, 5), increase: new Num(1, 2), scaling: new Num(2, 0), scalingStart: new Num(1, 150), bought: new Num(0, 0), currency: 'greenParticles',
    generates: 'green-generator-4', baseMulMod: new Num(1, 0), baseMultiplier: new Num(5, 0), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'green-particles', resetId: 'green', unlocked: false,
    requirement: ['holding', 'greens', new Num(1, 0)], nav: 'green', subNav: 'greenGenerators', globalMultiplier: 'greenParticleGenerators',
  },

  {
    name: 'nuclear-decay-generator-1', displayName: 'Nuclear Decay Generator 1', auto: false, style: 'green-style', noMax: true,
    baseCost: new Num(1, 0), cost: new Num(1, 0), increase: new Num(2, 0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'greenSouls',
    generates: 'nuclearDecay', baseMulMod: new Num(1, 0), baseMultiplier: new Num(2, 0), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'nuclear-decay', resetId: 'nuclearDecay', unlocked: false,
    requirement: ['holding', 'greenParticles', new Num(1, 35)], nav: 'green', subNav: 'nuclearDecay', globalMultiplier: 'nuclearDecayGenerators',
  },
  {
    name: 'nuclear-decay-generator-2', displayName: 'Nuclear Decay Generator 2', auto: false, style: 'green-style', noMax: true,
    baseCost: new Num(1, 1), cost: new Num(1, 1), increase: new Num(2, 0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'greenSouls',
    generates: 'nuclear-decay-generator-1', baseMulMod: new Num(1, 0), baseMultiplier: new Num(2, 0), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'nuclear-decay', resetId: 'nuclearDecay', unlocked: false,
    requirement: ['holding', 'greenParticles', new Num(1, 35)], nav: 'green', subNav: 'nuclearDecay', globalMultiplier: 'nuclearDecayGenerators',
  },
  {
    name: 'nuclear-decay-generator-3', displayName: 'Nuclear Decay Generator 3', auto: false, style: 'green-style', noMax: true,
    baseCost: new Num(1, 2), cost: new Num(1, 2), increase: new Num(2, 0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'greenSouls',
    generates: 'nuclear-decay-generator-2', baseMulMod: new Num(1, 0), baseMultiplier: new Num(2, 0), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'nuclear-decay', resetId: 'nuclearDecay', unlocked: false,
    requirement: ['holding', 'greenParticles', new Num(1, 35)], nav: 'green', subNav: 'nuclearDecay', globalMultiplier: 'nuclearDecayGenerators',
  },
]
