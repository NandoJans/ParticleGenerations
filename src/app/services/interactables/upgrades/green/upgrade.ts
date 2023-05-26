import {Upgrade} from "../../../../globals";
import {Num} from "../../../../num";
import {GlobalMultipliersService} from "../../../globals/global-multipliers.service";

export const greenUpgrades: Upgrade[] = [
  {
    name: 'green-particle-multiplier', displayName: 'Multiply particles by 2', description: 'Multiply green particles by 2.00x', auto: false,
    baseCost: new Num(5,0), cost: new Num(5, 0), increase: new Num(1,1), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'greenParticles',
    baseBuffer: new Num(2, 0), buffer: new Num(2, 0), amount: new Num(0, 0), type: 'green-upgrade', resetId: 'green', style: 'green-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['greens', new Num(1, 0)],
    action: (self: Upgrade) => {
      const buff: Num | undefined = self.buffer.pow(self.bought, false);
      GlobalMultipliersService.correct('greenParticlesGain', buff);
      return buff;
    }, nav: 'green', subNav: 'greenGenerators'
  },
]
