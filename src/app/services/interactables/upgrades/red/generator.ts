import {Upgrade} from "../../../../globals";
import {Num} from "../../../../num";
import {GlobalMultipliersService} from "../../../globals/global-multipliers.service";
import {UpgradeService} from "../../upgrade.service";
import {HoldingsService} from "../../../holdings.service";

export const redGeneratorUpgrades: Upgrade[] = [
  {
    name: 'red-generator-extension', displayName: 'Red Generator Extension', description: 'Gain a 2.00x buff to all red generators.', auto: false,
    baseCost: new Num(1,4), cost: new Num(1, 4), increase: new Num(1, 2), scaling: new Num(1, 1), bought: new Num(0, 0), currency: 'redParticles',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'red-particles', resetId: 'red', style: 'red-style', unlocked: true, oneTime: false, resets: 'redParticleGenerators', requirement: ['none', new Num(0, 0)],
    action: (self: Upgrade) => {
      const buff: Num | undefined = self.buffer.pow(self.bought, false);
      GlobalMultipliersService.correct('redParticleGenerators', buff);
      const boughtUpgrade: boolean = UpgradeService.bought('red-generator-extension-upgrade');
      if (self.bought.greq(new Num(4, 0)) && !boughtUpgrade) {
        self.limit = new Num(4, 0)
        self.description = 'You have unlocked all new red generators.'
      } else if (!boughtUpgrade) {
        self.description = 'Unlock a new red generator that generates the previous generator.'
      } else {
        self.description = 'Gain a '+self.buffer.toString(true)+'x buff to all red generators.';
        self.limit = new Num(1, 1000000)
      }
      return buff;
    }, nav: 'red', subNav: 'redParticles'
  },
  {
    name: 'red-generator-booster', displayName: 'Red Generator Booster', description: 'Boosts generators', auto: false, limit: new Num(0, 0),
    baseCost: new Num(1,3), cost: new Num(1, 3), increase: new Num(2,0), scaling: new Num(3, 0), bought: new Num(0, 0), currency: 'redParticles',
    baseBuffer: new Num(1.2, 0), buffer: new Num(1.2, 0), amount: new Num(0, 0), type: 'red-particles', resetId: 'red', style: 'red-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['none', new Num(1, 0)],
    action: (self: Upgrade) => {
      console.log(1);
      if (!UpgradeService.getValue('unlock-red-generators-booster', 'bought').greq(new Num(1, 0))) {
        self.unlocked = false;
        self.requirement = ['never'];
        return;
      }
      const freeUpgrades = HoldingsService.get('greenEnergy').log(new Num(0.8, 0), false).floor(false);
      // @ts-ignore
      const buff: Num | undefined = self.buffer.pow(self.bought.add(freeUpgrades, false), false);
      GlobalMultipliersService.correct('redParticleGenerators', buff);
      self.description = 'Boost generators by '+self.buffer.toString(true)+'x.'
      return buff;
    }, nav: 'red', subNav: 'redParticles'
  },
]
