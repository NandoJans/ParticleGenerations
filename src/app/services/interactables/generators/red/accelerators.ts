import {Num} from "../../../../num";

export const redAcceleratorGenerators = [
  {
    name: 'red-accelerator-generator-1', displayName: 'Red Accelerator Generator 1', auto: false, style: 'red-style',
    baseCost: new Num(1, 0), cost: new Num(1, 0), increase: new Num(1, 1), scaling: new Num(1, 1), bought: new Num(0, 0), currency: 'redAccelerators',
    generates: 'redAccelerators', baseMulMod: new Num(1, 0), baseMultiplier: new Num(2, 0), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'red-accelerators', resetId: 'red', unlocked: false,
    requirement: ['holding', 'redParticles', new Num(1, 20)], nav: 'red', subNav: 'redAccelerators', globalMultiplier: 'redAcceleratorGenerators',
  },
  {
    name: 'red-accelerator-generator-2', displayName: 'Red Accelerator Generator 2', auto: false, style: 'red-style',
    baseCost: new Num(1, 10), cost: new Num(1, 10), increase: new Num(1, 2), scaling: new Num(1, 1), bought: new Num(0, 0), currency: 'redAccelerators',
    generates: 'red-accelerator-generator-1', baseMulMod: new Num(1, 0), baseMultiplier: new Num(2, 0), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'red-accelerators', resetId: 'red', unlocked: false,
    requirement: [''], nav: 'red', subNav: 'redAccelerators', globalMultiplier: 'redAcceleratorGenerators',
  },
]
