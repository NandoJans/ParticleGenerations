import {Num} from "../../../../num";

export const prePurpleGenerators = [
  {
    name: 'red-purple-generator-1', displayName: 'Red Purple Generator 1', auto: false, style: 'even generator-red-purple-style',
    baseCost: new Num(1, 1), cost: new Num(1, 1), increase: new Num(1, 1100000), scaling: new Num(1, 1100000), bought: new Num(0, 0), currency: 'redParticles',
    generates: 'redPurple', baseMulMod: new Num(1, 0), baseMultiplier: new Num(2, 0), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'red-purple-generator', resetId: 'red-purple-generator', unlocked: false,
    requirement: ['holding', 'purples', new Num(1, 0)], nav: 'red', subNav: 'redPurple', globalMultiplier: 'redPurpleGenerators',
  },
  {
    name: 'red-purple-generator-2', displayName: 'Red Purple Generator 2', auto: false, style: 'uneven generator-red-purple-style',
    baseCost: new Num(1, 11), cost: new Num(1, 11), increase: new Num(1, 11000000), scaling: new Num(1, 11000000), bought: new Num(0, 0), currency: 'redParticles',
    generates: 'red-purple-generator-1', baseMulMod: new Num(1, 0), baseMultiplier: new Num(2, 0), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'red-purple-generator', resetId: 'red-purple-generator', unlocked: false,
    requirement: ['holding', 'purples', new Num(3, 0)], nav: 'red', subNav: 'redPurple', globalMultiplier: 'redPurpleGenerators',
  },
  {
    name: 'red-purple-generator-3', displayName: 'Red Purple Generator 3', auto: false, style: 'even generator-red-purple-style',
    baseCost: new Num(1, 110), cost: new Num(1, 110), increase: new Num(1, 110000000), scaling: new Num(1, 110000000), bought: new Num(0, 0), currency: 'redParticles',
    generates: 'red-purple-generator-2', baseMulMod: new Num(1, 0), baseMultiplier: new Num(2, 0), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'red-purple-generator', resetId: 'red-purple-generator', unlocked: false,
    requirement: ['holding', 'purples', new Num(5, 0)], nav: 'red', subNav: 'redPurple', globalMultiplier: 'redPurpleGenerators',
  },



  {
    name: 'yellow-purple-generator-1', displayName: 'Yellow Purple Generator 1', auto: false, style: 'even generator-yellow-purple-style',
    baseCost: new Num(1, 1), cost: new Num(1, 1), increase: new Num(1, 8000), scaling: new Num(1, 8000), bought: new Num(0, 0), currency: 'yellowParticles',
    generates: 'yellowPurple', baseMulMod: new Num(1, 0), baseMultiplier: new Num(2, 0), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'yellow-purple-generator', resetId: 'yellow-purple-generator', unlocked: false,
    requirement: ['holding', 'purples', new Num(1, 0)], nav: 'yellow', subNav: 'yellowPurple', globalMultiplier: 'yellowPurpleGenerators',
  },
  {
    name: 'yellow-purple-generator-2', displayName: 'Yellow Purple Generator 2', auto: false, style: 'uneven generator-yellow-purple-style',
    baseCost: new Num(1, 11), cost: new Num(1, 11), increase: new Num(1, 64000), scaling: new Num(1, 64000), bought: new Num(0, 0), currency: 'yellowParticles',
    generates: 'yellow-purple-generator-1', baseMulMod: new Num(1, 0), baseMultiplier: new Num(2, 0), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'yellow-purple-generator', resetId: 'yellow-purple-generator', unlocked: false,
    requirement: ['holding', 'purples', new Num(3, 0)], nav: 'yellow', subNav: 'yellowPurple', globalMultiplier: 'yellowPurpleGenerators',
  },
  {
    name: 'yellow-purple-generator-3', displayName: 'Yellow Purple Generator 3', auto: false, style: 'even generator-yellow-purple-style',
    baseCost: new Num(1, 110), cost: new Num(1, 110), increase: new Num(1, 512000), scaling: new Num(1, 512000), bought: new Num(0, 0), currency: 'yellowParticles',
    generates: 'yellow-purple-generator-2', baseMulMod: new Num(1, 0), baseMultiplier: new Num(2, 0), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'yellow-purple-generator', resetId: 'yellow-purple-generator', unlocked: false,
    requirement: ['holding', 'purples', new Num(5, 0)], nav: 'yellow', subNav: 'yellowPurple', globalMultiplier: 'yellowPurpleGenerators',
  },



  {
    name: 'green-purple-generator-1', displayName: 'Green Purple Generator 1', auto: false, style: 'even generator-green-purple-style',
    baseCost: new Num(1, 1), cost: new Num(1, 1), increase: new Num(1, 500), scaling: new Num(1, 500), bought: new Num(0, 0), currency: 'greenParticles',
    generates: 'greenPurple', baseMulMod: new Num(1, 0), baseMultiplier: new Num(2, 0), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'green-purple-generator', resetId: 'green-purple-generator', unlocked: false,
    requirement: ['holding', 'purples', new Num(1, 0)], nav: 'green', subNav: 'greenPurple', globalMultiplier: 'greenPurpleGenerators',
  },
  {
    name: 'green-purple-generator-2', displayName: 'Green Purple Generator 2', auto: false, style: 'uneven generator-green-purple-style',
    baseCost: new Num(1, 11), cost: new Num(1, 11), increase: new Num(1, 2500), scaling: new Num(1, 2500), bought: new Num(0, 0), currency: 'greenParticles',
    generates: 'green-purple-generator-1', baseMulMod: new Num(1, 0), baseMultiplier: new Num(2, 0), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'green-purple-generator', resetId: 'green-purple-generator', unlocked: false,
    requirement: ['holding', 'purples', new Num(3, 0)], nav: 'green', subNav: 'greenPurple', globalMultiplier: 'greenPurpleGenerators',
  },
  {
    name: 'green-purple-generator-3', displayName: 'Green Purple Generator 3', auto: false, style: 'even generator-green-purple-style',
    baseCost: new Num(1, 110), cost: new Num(1, 110), increase: new Num(1, 18000), scaling: new Num(1, 12500), bought: new Num(0, 0), currency: 'greenParticles',
    generates: 'green-purple-generator-2', baseMulMod: new Num(1, 0), baseMultiplier: new Num(2, 0), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'green-purple-generator', resetId: 'green-purple-generator', unlocked: false,
    requirement: ['holding', 'purples', new Num(5, 0)], nav: 'green', subNav: 'greenPurple', globalMultiplier: 'greenPurpleGenerators',
  },



  {
    name: 'blue-purple-generator-1', displayName: 'Blue Purple Generator 1', auto: false, style: 'even generator-blue-purple-style',
    baseCost: new Num(1, 1), cost: new Num(1, 1), increase: new Num(1, 20), scaling: new Num(1, 20), bought: new Num(0, 0), currency: 'blueParticles',
    generates: 'bluePurple', baseMulMod: new Num(1, 0), baseMultiplier: new Num(2, 0), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'blue-purple-generator', resetId: 'blue-purple-generator', unlocked: false,
    requirement: ['holding', 'purples', new Num(1, 0)], nav: 'blue', subNav: 'bluePurple', globalMultiplier: 'bluePurpleGenerators',
  },
  {
    name: 'blue-purple-generator-2', displayName: 'Blue Purple Generator 2', auto: false, style: 'uneven generator-blue-purple-style',
    baseCost: new Num(1, 11), cost: new Num(1, 11), increase: new Num(1, 100), scaling: new Num(1, 40), bought: new Num(0, 0), currency: 'blueParticles',
    generates: 'blue-purple-generator-1', baseMulMod: new Num(1, 0), baseMultiplier: new Num(2, 0), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'blue-purple-generator', resetId: 'blue-purple-generator', unlocked: false,
    requirement: ['holding', 'purples', new Num(3, 0)], nav: 'blue', subNav: 'bluePurple', globalMultiplier: 'bluePurpleGenerators',
  },
  {
    name: 'blue-purple-generator-3', displayName: 'Blue Purple Generator 3', auto: false, style: 'even generator-blue-purple-style',
    baseCost: new Num(1, 110), cost: new Num(1, 110), increase: new Num(1, 500), scaling: new Num(1, 80), bought: new Num(0, 0), currency: 'blueParticles',
    generates: 'blue-purple-generator-2', baseMulMod: new Num(1, 0), baseMultiplier: new Num(2, 0), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'blue-purple-generator', resetId: 'blue-purple-generator', unlocked: false,
    requirement: ['holding', 'purples', new Num(5, 0)], nav: 'blue', subNav: 'bluePurple', globalMultiplier: 'bluePurpleGenerators',
  },
]
