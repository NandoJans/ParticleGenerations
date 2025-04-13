import {Upgrade} from "../../../../globals";
import {Num} from "../../../../num";
import {UpgradeService} from "../../upgrade.service";
import {GeneratorService} from "../../generator.service";
import {GlobalMultipliersService} from "../../../globals/global-multipliers.service";


export const blackHoleUpgrades: Upgrade[] = [
  {
    name: 'unlock-black-hole',
    displayName: 'Unlock Black Hole',
    description: '',
    auto: false,
    baseCost: new Num(1, 0),
    cost: new Num(1, 0),
    increase: new Num(1, 0),
    scaling: new Num(1, 0),
    bought: new Num(0, 0),
    currency: 'purpleParticles',
    baseBuffer: new Num(2, 0),
    buffer: new Num(2, 0),
    amount: new Num(0, 0),
    type: 'unlock-black-hole',
    resetId: 'purple',
    style: 'black-hole-style',
    unlocked: false,
    oneTime: true,
    resets: 'none',
    requirement: ['purples', new Num(5, 0)],
    action: (self: Upgrade) => {
      UpgradeService.setValue('unlock-black-hole', 'requirement', ['never'])
      GeneratorService.setValue('gravity-generator', 'amount', new Num(1, 0));
      GeneratorService.setValue('gravity-generator', 'bought', new Num(1, 0));
      GeneratorService.setValue('gravity-generator', 'unlocked', true);
    },
    nav: 'purple',
    subNav: 'blackHole'
  },

  {
    name: 'increased-black-hole-size',
    displayName: 'Increase Size',
    description: 'Increase the size of the black hole to increase gravity gain by x1.10',
    auto: false,
    scalingStart: new Num(1, 40),
    baseCost: new Num(1, 20),
    cost: new Num(1, 20),
    increase: new Num(1, 1),
    scaling: new Num(1, 1),
    bought: new Num(0, 0),
    currency: 'blackHoleMass',
    baseBuffer: new Num(1.1, 0),
    buffer: new Num(1.1, 0),
    amount: new Num(0, 0),
    type: 'black-hole-upgrades',
    resetId: 'purple-pre',
    style: 'black-hole-style',
    unlocked: false,
    oneTime: false,
    resets: 'none',
    requirement: ['purples', new Num(5, 0)],
    action: (self: Upgrade) => {
      let buff: Num | undefined = self.buffer.pow(self.bought, false)
      GlobalMultipliersService.correct('gravityGenerators', buff)
      return buff;
    },
    nav: 'purple',
    subNav: 'blackHole'
  },
  {
    name: 'increased-black-hole-mass',
    displayName: 'Increase Mass',
    description: 'Increase the mass of the black hole to increase gravity gain by x1.20',
    auto: false,
    scalingStart: new Num(1, 40),
    baseCost: new Num(1, 20),
    cost: new Num(1, 20),
    increase: new Num(1, 2),
    scaling: new Num(1, 1),
    bought: new Num(0, 0),
    currency: 'blackHoleMass',
    baseBuffer: new Num(1.2, 0),
    buffer: new Num(1.2, 0),
    amount: new Num(0, 0),
    type: 'black-hole-upgrades',
    resetId: 'purple-pre',
    style: 'black-hole-style',
    unlocked: false,
    oneTime: false,
    resets: 'none',
    requirement: ['purples', new Num(5, 0)],
    action: (self: Upgrade) => {
      let buff: Num | undefined = self.buffer.pow(self.bought, false)
      GlobalMultipliersService.correct('gravityGenerators', buff)
      return buff;
    },
    nav: 'purple',
    subNav: 'blackHole'
  },
  {
    name: 'increased-black-hole-gravity',
    displayName: 'Increase Gravity',
    description: 'Increase the gravity of the black hole to increase gravity gain by x1.30',
    auto: false,
    scalingStart: new Num(1, 40),
    baseCost: new Num(1, 20),
    cost: new Num(1, 20),
    increase: new Num(1, 3),
    scaling: new Num(1, 1),
    bought: new Num(0, 0),
    currency: 'blackHoleMass',
    baseBuffer: new Num(1.3, 0),
    buffer: new Num(1.3, 0),
    amount: new Num(0, 0),
    type: 'black-hole-upgrades',
    resetId: 'purple-pre',
    style: 'black-hole-style',
    unlocked: false,
    oneTime: false,
    resets: 'none',
    requirement: ['purples', new Num(5, 0)],
    action: (self: Upgrade) => {
      let buff: Num | undefined = self.buffer.pow(self.bought, false)
      GlobalMultipliersService.correct('gravityGenerators', buff)
      return buff;
    },
    nav: 'purple',
    subNav: 'blackHole'
  },
  {
    name: 'increased-galaxy-amount',
    displayName: 'Another Galaxy',
    description: 'Be able to get an extra galaxy.',
    auto: false,
    scalingStart: new Num(1, 100),
    baseCost: new Num(1, 20),
    cost: new Num(1, 20),
    increase: new Num(1, 3),
    scaling: new Num(1, 0),
    bought: new Num(0, 0),
    currency: 'blackHoleMass',
    baseBuffer: new Num(1, 0),
    buffer: new Num(1, 0),
    amount: new Num(0, 0),
    type: 'black-hole-upgrades',
    resetId: 'purple-pre',
    style: 'black-hole-style',
    unlocked: false,
    oneTime: false,
    resets: 'none',
    requirement: ['purples', new Num(5, 0)],
    action: (self: Upgrade) => {
      let buff: Num | undefined = self.bought.copy();
      UpgradeService.setValue('purple-galaxy', 'limit', buff.add(new Num(1, 0), false));
      return buff;
    },
    nav: 'purple',
    subNav: 'blackHole'
  },
  {
    name: 'purple-galaxy',
    displayName: 'Purple Galaxy',
    description: 'Increase the effect of all purple void effects and increase black hole mass gain.',
    auto: false,
    limit: new Num(0, 0),
    noMax: true,
    baseCost: new Num(1, 110),
    cost: new Num(1, 110),
    increase: new Num(1, 0),
    scaling: new Num(1, 0),
    bought: new Num(0, 0),
    currency: 'gravity',
    baseBuffer: new Num(2.5, 2),
    buffer: new Num(2.5, 2),
    amount: new Num(0, 0),
    type: 'galaxies',
    resetId: 'purple-pre',
    style: 'black-hole-style',
    unlocked: false,
    oneTime: false,
    resets: 'purpleGalaxy',
    requirement: ['purples', new Num(5, 0)],
    action: (self: Upgrade) => {
      let buff: Num | undefined = self.buffer.pow(self.bought, false)
      GlobalMultipliersService.correct('purpleVoidEffect', buff);
      return buff;
    },
    nav: 'purple',
    subNav: 'blackHole'
  }
]
