import {Upgrade} from "../../../../globals";
import {Num} from "../../../../num";
import {HoldingsService} from "../../../holdings.service";
import {GlobalMultipliersService} from "../../../globals/global-multipliers.service";

export const darkenergyUpgrades: Upgrade[] = [
  {
    name: 'dark-energy-compressor', displayName: 'Compressor', description: 'Compresses Green Energy into Dark Energy', auto: false,
    baseCost: new Num(1,1), cost: new Num(1, 1), increase: new Num(1,1), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'greenEnergy',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'dark-compressor', resetId: 'green', style: 'sacrifice-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['greens', new Num(1, 1)],
    action: (self: Upgrade) => {
      const darkEnergy = HoldingsService.get('darkEnergy');
      const buff = darkEnergy.mul(self.bought, false);
      HoldingsService.set('darkEnergy', buff);
      return buff;
    }, nav: 'green', subNav: 'darkEnergy'
  },

  {
    name: 'dark-yellow-fusion', displayName: 'Dark yellow fusion', description: '', auto: false, noMax: true,
    baseCost: new Num(1,0), cost: new Num(1, 0), increase: new Num(2,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'darkEnergy',
    baseBuffer: new Num(1, 5), buffer: new Num(1, 5), amount: new Num(0, 0), type: 'dark-upgrade', resetId: 'green', style: 'sacrifice-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['greens', new Num(1, 1)],
    action: (self: Upgrade) => {
      // @ts-ignore
      HoldingsService.remove('darkEnergy', self.increase.pow(self.bought, false).sub(new Num(1, 0), false));
      const yellowFusionMax = HoldingsService.get('yellowFusionMax');
      const buff = yellowFusionMax.mul(self.buffer.pow(self.bought, false), false);
      HoldingsService.set('yellowFusionMax', buff);
      return buff;
    }, nav: 'green', subNav: 'darkEnergy'
  },
  {
    name: 'dark-green-generators', displayName: 'Dark green generators', description: '', auto: false, noMax: true,
    baseCost: new Num(1,0), cost: new Num(1, 0), increase: new Num(2,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'darkEnergy',
    baseBuffer: new Num(3, 0), buffer: new Num(3, 0), amount: new Num(0, 0), type: 'dark-upgrade', resetId: 'green', style: 'sacrifice-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['greens', new Num(1, 1)],
    action: (self: Upgrade) => {
      // @ts-ignore
      HoldingsService.remove('darkEnergy', self.increase.pow(self.bought, false).sub(new Num(1, 0), false));
      const buff = self.buffer.pow(self.bought, false);
      GlobalMultipliersService.correct('greenParticleGenerators', buff);
      return buff;
    }, nav: 'green', subNav: 'darkEnergy'
  },
  {
    name: 'dark-yellow-generators', displayName: 'Dark yellow generators', description: '', auto: false, noMax: true,
    baseCost: new Num(1,0), cost: new Num(1, 0), increase: new Num(2,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'darkEnergy',
    baseBuffer: new Num(1, 15), buffer: new Num(1, 15), amount: new Num(0, 0), type: 'dark-upgrade', resetId: 'green', style: 'sacrifice-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['greens', new Num(1, 1)],
    action: (self: Upgrade) => {
      // @ts-ignore
      HoldingsService.remove('darkEnergy', self.increase.pow(self.bought, false).sub(new Num(1, 0), false));
      const buff = self.buffer.pow(self.bought, false);
      GlobalMultipliersService.correct('yellowParticleGenerators', buff);
      return buff;
    }, nav: 'green', subNav: 'darkEnergy'
  },
  {
    name: 'dark-red-generators', displayName: 'Dark red generators', description: '', auto: false, noMax: true,
    baseCost: new Num(1,0), cost: new Num(1, 0), increase: new Num(2,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'darkEnergy',
    baseBuffer: new Num(1, 150), buffer: new Num(1, 150), amount: new Num(0, 0), type: 'dark-upgrade', resetId: 'green', style: 'sacrifice-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['greens', new Num(1, 1)],
    action: (self: Upgrade) => {
    // @ts-ignore
    HoldingsService.remove('darkEnergy', self.increase.pow(self.bought, false).sub(new Num(1, 0), false));
    const buff = self.buffer.pow(self.bought, false);
    GlobalMultipliersService.correct('redParticleGenerators', buff);
    return buff;
    }, nav: 'green', subNav: 'darkEnergy'
  },
  {
    name: 'dark-red-accelerators', displayName: 'Dark red accelerators', description: '', auto: false, noMax: true,
    baseCost: new Num(1,0), cost: new Num(1, 0), increase: new Num(2,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'darkEnergy',
    baseBuffer: new Num(1, 40), buffer: new Num(1, 40), amount: new Num(0, 0), type: 'dark-upgrade', resetId: 'green', style: 'sacrifice-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['greens', new Num(1, 1)],
    action: (self: Upgrade) => {
    // @ts-ignore
    HoldingsService.remove('darkEnergy', self.increase.pow(self.bought, false).sub(new Num(1, 0), false));
    const buff = self.buffer.pow(self.bought, false);
    GlobalMultipliersService.correct('redAcceleratorGenerators', buff);
    return buff;
    }, nav: 'green', subNav: 'darkEnergy'
  }
]
