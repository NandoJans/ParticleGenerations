import {Num} from "../../../../num";
import {Upgrade} from "../../../../globals";
import {GlobalMultipliersService} from "../../../globals/global-multipliers.service";

export const redAccelerators: Upgrade[] = [
  {
    name: 'red-accelerator-multiplier-1', displayName: 'Red Accelerator Multiplier 1', description: 'Multiply red accelerator generators by 2.00x', auto: false,
    baseCost: new Num(1,4), cost: new Num(1, 4), increase: new Num(1,1), scaling: new Num(2, 0), bought: new Num(0, 0), currency: 'redAccelerators',
    baseBuffer: new Num(2, 0), buffer: new Num(2, 0), amount: new Num(0, 0), type: 'red-accelerators', resetId: 'red', style: 'accelerator-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['redParticles', new Num(1, 20)],
    action: (self: Upgrade) => {
      const buff: Num | undefined = self.buffer.pow(self.bought, false);
      GlobalMultipliersService.correct('redAcceleratorGenerators', buff);
      self.description = 'Multiply red accelerator generators by '+self.buffer.toString(true)+'x'
      return buff;
    }, nav: 'red', subNav: 'redAccelerators'
  },
  {
    name: 'red-accelerator-multiplier-2', displayName: 'Red Accelerator Multiplier 2', description: 'Multiply red accelerator generators by 3.00x', auto: false,
    baseCost: new Num(1,5), cost: new Num(1, 5), increase: new Num(1,2), scaling: new Num(3, 0), bought: new Num(0, 0), currency: 'redAccelerators',
    baseBuffer: new Num(3, 0), buffer: new Num(3, 0), amount: new Num(0, 0), type: 'red-accelerators', resetId: 'red', style: 'accelerator-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['redParticles', new Num(1, 20)],
    action: (self: Upgrade) => {
      const buff: Num | undefined = self.buffer.pow(self.bought, false);
      GlobalMultipliersService.correct('redAcceleratorGenerators', buff);
      self.description = 'Multiply red accelerator generators by '+self.buffer.toString(true)+'x'
      return buff;
    }, nav: 'red', subNav: 'redAccelerators'
  },
  {
    name: 'red-accelerator-multiplier-3', displayName: 'Red Accelerator Multiplier 3', description: 'Multiply red accelerator generators by 4.00x',
    baseCost: new Num(1,6), cost: new Num(1, 6), increase: new Num(1,3), scaling: new Num(4, 0), bought: new Num(0, 0), currency: 'redAccelerators',
    baseBuffer: new Num(4, 0), buffer: new Num(4, 0), amount: new Num(0, 0), type: 'red-accelerators', resetId: 'red', style: 'accelerator-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['redParticles', new Num(1, 20)],
    action: (self: Upgrade) => {
      const buff: Num | undefined = self.buffer.pow(self.bought, false);
      GlobalMultipliersService.correct('redAcceleratorGenerators', buff);
      self.description = 'Multiply red accelerator generators by '+self.buffer.toString(true)+'x'
      return buff;
    }, nav: 'red', subNav: 'redAccelerators'
  },
]
