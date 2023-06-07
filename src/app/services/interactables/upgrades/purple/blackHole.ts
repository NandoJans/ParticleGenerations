import {Upgrade} from "../../../../globals";
import {Num} from "../../../../num";
import {UpgradeService} from "../../upgrade.service";
import {GeneratorService} from "../../generator.service";
import {HoldingsService} from "../../../holdings.service";
import {GlobalMultipliersService} from "../../../globals/global-multipliers.service";


export const blackHoleUpgrades: Upgrade[] = [
  {
    name: 'unlock-black-hole', displayName: 'Unlock Black Hole', description: '', auto: false,
    baseCost: new Num(1,0), cost: new Num(1, 0), increase: new Num(1,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'purpleParticles',
    baseBuffer: new Num(2, 0), buffer: new Num(2, 0), amount: new Num(0, 0), type: 'unlock-black-hole', resetId: 'purple', style: 'purple-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['purples', new Num(5, 0)],
    action: (self: Upgrade) => {
      UpgradeService.setValue('unlock-black-hole', 'requirement', ['never'])
      GeneratorService.setValue('gravity-generator', 'amount', new Num(1, 0));
      GeneratorService.setValue('gravity-generator', 'bought', new Num(1, 0));
      GeneratorService.setValue('gravity-generator', 'unlocked', true);
    }, nav: 'red', subNav: 'redPurple'
  },

  {
    name: 'increased-black-hole-size', displayName: 'Increase Size', description: 'Increase the size of the black hole to increase gravity gain by x1.10', auto: false, limit: new Num(1.5, 1),
    baseCost: new Num(1,10), cost: new Num(1, 10), increase: new Num(1,2), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'blackHoleMass',
    baseBuffer: new Num(1.1, 0), buffer: new Num(1.1, 0), amount: new Num(0, 0), type: 'black-hole-upgrades', resetId: 'purple', style: 'purple-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['purples', new Num(5, 0)],
    action: (self: Upgrade) => {
      let buff: Num | undefined = self.buffer.pow(self.bought, false)
      GlobalMultipliersService.correct('gravityGenerators', buff)
      return buff;
    }, nav: 'red', subNav: 'redPurple'
  },
  {
    name: 'increased-black-hole-mass', displayName: 'Increase Mass', description: 'Increase the mass of the black hole to increase gravity gain by x1.20', auto: false, limit: new Num(1, 1),
    baseCost: new Num(1,10), cost: new Num(1, 10), increase: new Num(1,4), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'blackHoleMass',
    baseBuffer: new Num(1.2, 0), buffer: new Num(1.2, 0), amount: new Num(0, 0), type: 'black-hole-upgrades', resetId: 'purple', style: 'purple-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['purples', new Num(5, 0)],
    action: (self: Upgrade) => {
      let buff: Num | undefined = self.buffer.pow(self.bought, false)
      GlobalMultipliersService.correct('gravityGenerators', buff)
      return buff;
    }, nav: 'red', subNav: 'redPurple'
  },
  {
    name: 'increased-black-hole-gravity', displayName: 'Increase Gravity', description: 'Increase the gravity of the black hole to increase gravity gain by x1.30', auto: false, limit: new Num(5, 0),
    baseCost: new Num(1,10), cost: new Num(1, 10), increase: new Num(1,6), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'blackHoleMass',
    baseBuffer: new Num(1.3, 0), buffer: new Num(1.3, 0), amount: new Num(0, 0), type: 'black-hole-upgrades', resetId: 'purple', style: 'purple-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['purples', new Num(5, 0)],
    action: (self: Upgrade) => {
      let buff: Num | undefined = self.buffer.pow(self.bought, false)
      GlobalMultipliersService.correct('gravityGenerators', buff)
      return buff;
    }, nav: 'red', subNav: 'redPurple'
  }
]
