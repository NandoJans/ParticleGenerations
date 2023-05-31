import {Num} from "../../../../num";
import {Upgrade} from "../../../../globals";
import {GlobalMultipliersService} from "../../../globals/global-multipliers.service";
import {HoldingsService} from "../../../holdings.service";
import {UpgradeService} from "../../upgrade.service";

export const blueUpgrades = [
  {
    name: 'blue-particle-multiplier', displayName: 'Multiply particles by 2', description: 'Multiply blue particles by 2.00x', auto: false,
    baseCost: new Num(3,0), cost: new Num(3, 0), increase: new Num(1,1), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'blueParticles',
    baseBuffer: new Num(2, 0), buffer: new Num(2, 0), amount: new Num(0, 0), type: 'blue-upgrades', resetId: 'blue', style: 'blue-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['blues', new Num(3, 0)],
    action: (self: Upgrade) => {
      const buff: Num | undefined = self.buffer.pow(self.bought, false);
      GlobalMultipliersService.correct('blueParticlesGain', buff);
      return buff;
    }, nav: 'blue', subNav: 'blueUpgrades'
  },
  {
    name: 'blue-light-multiplier-repeatable', displayName: 'Multiply light by 2', description: 'Multiply blue light by 2.00x', auto: false, scalingStart: new Num(1, 110),
    baseCost: new Num(5,0), cost: new Num(5, 0), increase: new Num(1,1), scaling: new Num(1, 1), bought: new Num(0, 0), currency: 'blueParticles',
    baseBuffer: new Num(2, 0), buffer: new Num(2, 0), amount: new Num(0, 0), type: 'blue-upgrades', resetId: 'blue', style: 'blue-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['blues', new Num(3, 0)],
    action: (self: Upgrade) => {
      self.description = 'Multiply blue light by '+self.buffer.toString(true)+'x'
      const buff: Num | undefined = self.buffer.pow(self.bought, false);
      GlobalMultipliersService.correct('blueLightGenerators', buff);
      return buff;
    }, nav: 'blue', subNav: 'blueUpgrades'
  },
  {
    name: 'more-powerfull-dark-age', displayName: 'Dark age to 5', description: 'Dark power multiplies dark energy to the power of 5.', auto: false,
    baseCost: new Num(1,1), cost: new Num(1, 1), increase: new Num(1,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'blueParticles',
    baseBuffer: new Num(1.67, 0), buffer: new Num(1.67, 0), amount: new Num(0, 0), type: 'blue-upgrades', resetId: 'blue', style: 'blue-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['blues', new Num(3, 0)],
    action: (self: Upgrade) => {
      GlobalMultipliersService.correct('darkPowerPower', self.buffer);
    }, nav: 'blue', subNav: 'blueUpgrades'
  },
  {
    name: 'light-boosts-neutrons', displayName: 'Neutron Light', description: 'Blue light slightly boosts blue neutrons.', auto: false,
    baseCost: new Num(1,2), cost: new Num(1, 2), increase: new Num(1,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'blueParticles',
    baseBuffer: new Num(1.5, -1), buffer: new Num(1.5, -1), amount: new Num(0, 0), type: 'blue-upgrades', resetId: 'blue', style: 'blue-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['blues', new Num(3, 0)],
    action: (self: Upgrade) => {
      const buff: Num | undefined = HoldingsService.get('blueLight').pow(self.buffer, false);
      GlobalMultipliersService.correct('blueNeutronGenerators', buff);
      return buff;
    }, nav: 'blue', subNav: 'blueUpgrades'
  },
  {
    name: 'increased-yellow-power', displayName: 'Increased Yellow Power', description: 'Increase the effect of yellow power.', auto: false,
    baseCost: new Num(1,3), cost: new Num(1, 3), increase: new Num(1,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'blueParticles',
    baseBuffer: new Num(8, 0), buffer: new Num(8, 0), amount: new Num(0, 0), type: 'blue-upgrades', resetId: 'blue', style: 'blue-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['blues', new Num(3, 0)],
    action: (self: Upgrade) => {
      GlobalMultipliersService.set('yellowPowerPower', self.buffer);
    }, nav: 'blue', subNav: 'blueUpgrades'
  },
  {
    name: 'yellow-fusion-boosts-green', displayName: 'Green Yellow Fusion', description: 'Yellow fusion boosts green generators.', auto: false,
    baseCost: new Num(1,20), cost: new Num(1, 20), increase: new Num(1,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'blueParticles',
    baseBuffer: new Num(1, -3), buffer: new Num(1, -3), amount: new Num(0, 0), type: 'blue-upgrades', resetId: 'blue', style: 'blue-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['blues', new Num(3, 0)],
    action: (self: Upgrade) => {
      const buff: Num | undefined = HoldingsService.get('yellowFusion').pow(self.buffer, false);
      GlobalMultipliersService.correct('greenParticleGenerators', buff);
      return buff;
    }, nav: 'blue', subNav: 'blueUpgrades'
  },
  {
    name: 'green-idle-gain', displayName: 'Green particles generation', description: 'Generate 1% of green particles gained on going green per second.', auto: false,
    baseCost: new Num(1,30), cost: new Num(1, 30), increase: new Num(1,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'blueParticles',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'blue-upgrades', resetId: 'blue', style: 'blue-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['blues', new Num(3, 0)],
    action: (self: Upgrade) => {}, nav: 'blue', subNav: 'blueUpgrades'
  },
  {
    name: 'extra-blue-light-upgrades', displayName: 'More Fusion Effect', description: 'The upgrade Increase Fusion Effect can be bought once more.', auto: false,
    baseCost: new Num(1,95), cost: new Num(1, 95), increase: new Num(1,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'blueParticles',
    baseBuffer: new Num(1.4, 1), buffer: new Num(1.4, 1), amount: new Num(0, 0), type: 'blue-upgrades', resetId: 'blue', style: 'blue-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['blues', new Num(3, 0)],
    action: (self: Upgrade) => {
      UpgradeService.setValue('yellow-fusion-effect-increaser', 'limit', self.buffer)
    }, nav: 'blue', subNav: 'blueUpgrades'
  }
]
