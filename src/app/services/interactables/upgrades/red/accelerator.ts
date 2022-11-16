import {Num} from "../../../../num";
import {Upgrade} from "../../../../globals";
import {Action} from "../../../../action";

export const redAccelerators: Upgrade[] = [
  {
    name: 'red-accelerator-multiplier-1', displayName: 'Red Accelerator Multiplier 1', description: 'Gives a multiplier to the red accelerator generator', auto: false,
    baseCost: new Num(1,4), cost: new Num(1, 4), increase: new Num(1,1), scaling: new Num(2, 0), bought: new Num(0, 0), currency: 'redAccelerators',
    baseBuffer: new Num(2, 0), buffer: new Num(2, 0), amount: new Num(0, 0), type: 'red-accelerators', resetId: 'red-accelerators', style: 'accelerator-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['redParticles', new Num(1, 20)],
    action: new Action('basedOnUpgrade', 'redAcceleratorGenerators', new Num(1, 0), 'bought', 'red-accelerator-multiplier-1')
  },
  {
    name: 'red-accelerator-multiplier-2', displayName: 'Red Accelerator Multiplier 2', description: 'Gives a multiplier to the red accelerator generator', auto: false,
    baseCost: new Num(1,5), cost: new Num(1, 5), increase: new Num(1,2), scaling: new Num(3, 0), bought: new Num(0, 0), currency: 'redAccelerators',
    baseBuffer: new Num(3, 0), buffer: new Num(3, 0), amount: new Num(0, 0), type: 'red-accelerators', resetId: 'red-accelerators', style: 'accelerator-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['redParticles', new Num(1, 20)],
    action: new Action('basedOnUpgrade', 'redAcceleratorGenerators', new Num(1, 0), 'bought', 'red-accelerator-multiplier-2')
  },
  {
    name: 'red-accelerator-multiplier-3', displayName: 'Red Accelerator Multiplier 3', description: 'Gives a multiplier to the red accelerator generator',
    baseCost: new Num(1,6), cost: new Num(1, 6), increase: new Num(1,3), scaling: new Num(4, 0), bought: new Num(0, 0), currency: 'redAccelerators',
    baseBuffer: new Num(4, 0), buffer: new Num(4, 0), amount: new Num(0, 0), type: 'red-accelerators', resetId: 'red-accelerators', style: 'accelerator-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['redParticles', new Num(1, 20)],
    action: new Action('basedOnUpgrade', 'redAcceleratorGenerators', new Num(1, 0), 'bought', 'red-accelerator-multiplier-3')
  },
]
