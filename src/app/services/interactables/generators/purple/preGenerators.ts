import {Num} from "../../../../num";

export const prePurpleGenerators = [
  {
    name: 'red-purple-generator', displayName: 'Red Purple Generator', auto: false, style: 'red-purple-style',
    baseCost: new Num(1, 1), cost: new Num(1, 1), increase: new Num(1, 110), scaling: new Num(1, 110), bought: new Num(0, 0), currency: 'redParticles',
    generates: 'redPurple', baseMultiplier: new Num(2, 0), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'red-purple-generator', resetId: 'red-purple-generator', unlocked: false,
    requirement: ['holding', 'purples', new Num(1, 0)], nav: 'red', subNav: 'redPurple'
  },



  {
    name: 'yellow-purple-generator', displayName: 'Yellow Purple Generator', auto: false, style: 'yellow-purple-style',
    baseCost: new Num(1, 1), cost: new Num(1, 1), increase: new Num(1, 110), scaling: new Num(1, 110), bought: new Num(0, 0), currency: 'yellowParticles',
    generates: 'yellowPurple', baseMultiplier: new Num(2, 0), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'yellow-purple-generator', resetId: 'yellow-purple-generator', unlocked: false,
    requirement: ['holding', 'purples', new Num(1, 0)], nav: 'yellow', subNav: 'yellowPurple'
  },



  {
    name: 'green-purple-generator', displayName: 'Green Purple Generator', auto: false, style: 'green-purple-style',
    baseCost: new Num(1, 1), cost: new Num(1, 1), increase: new Num(1, 110), scaling: new Num(1, 110), bought: new Num(0, 0), currency: 'greenParticles',
    generates: 'greenPurple', baseMultiplier: new Num(2, 0), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'green-purple-generator', resetId: 'green-purple-generator', unlocked: false,
    requirement: ['holding', 'purples', new Num(1, 0)], nav: 'green', subNav: 'greenPurple'
  },



  {
    name: 'blue-purple-generator', displayName: 'Blue Purple Generator', auto: false, style: 'blue-purple-style',
    baseCost: new Num(1, 1), cost: new Num(1, 1), increase: new Num(1, 110), scaling: new Num(1, 110), bought: new Num(0, 0), currency: 'blueParticles',
    generates: 'bluePurple', baseMultiplier: new Num(2, 0), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'blue-purple-generator', resetId: 'blue-purple-generator', unlocked: false,
    requirement: ['holding', 'purples', new Num(1, 0)], nav: 'blue', subNav: 'bluePurple'
  },
]
