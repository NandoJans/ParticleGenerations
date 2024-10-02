import {Upgrade} from "../../../../globals";
import {Num} from "../../../../num";
import {UpgradeService} from "../../upgrade.service";
import {GlobalMultipliersService} from "../../../globals/global-multipliers.service";
import {HoldingsService} from "../../../holdings.service";
import {GeneratorService} from "../../generator.service";

export const yellowUpgrades: Upgrade[] = [
  {
    name: 'yellow-repeatable-multiplier',
    displayName: 'Multiply 2',
    description: 'Multiply red particle generators by 2.00x',
    auto: false,
    scalingStart: new Num(1, 10000000),
    baseCost: new Num(1, 0),
    cost: new Num(1, 0),
    increase: new Num(1, 1),
    scaling: new Num(1, 1),
    bought: new Num(0, 0),
    currency: 'yellowParticles',
    baseBuffer: new Num(2, 0),
    buffer: new Num(2, 0),
    amount: new Num(0, 0),
    type: 'yellow-upgrades-repeatable',
    resetId: 'yellow',
    style: 'yellow-style',
    unlocked: false,
    oneTime: false,
    resets: 'none',
    requirement: ['yellows', new Num(1, 0)],
    action: (self: Upgrade) => {
      const buff: Num | undefined = self.buffer.pow(self.bought, false);
      GlobalMultipliersService.correct('redParticleGenerators', buff);
      self.description = 'Multiply red particle generators by ' + self.buffer.toString(true) + 'x';
      return buff;
    },
    nav: 'yellow',
    subNav: 'yellowUpgrades'
  },
  {
    name: 'yellow-particle-multiplier',
    displayName: 'Multiply particles by 2',
    description: 'Multiply yellow particles gain by 2.00x',
    auto: false,
    baseCost: new Num(1, 0),
    cost: new Num(1, 0),
    increase: new Num(1, 1),
    scaling: new Num(1, 0),
    bought: new Num(0, 0),
    currency: 'yellowParticles',
    baseBuffer: new Num(2, 0),
    buffer: new Num(2, 0),
    amount: new Num(0, 0),
    type: 'yellow-upgrades-repeatable',
    resetId: 'yellow',
    style: 'yellow-style',
    unlocked: false,
    oneTime: false,
    resets: 'none',
    requirement: ['yellows', new Num(1, 0)],
    action: (self: Upgrade) => {
      const buff: Num | undefined = self.buffer.pow(self.bought, false);
      GlobalMultipliersService.correct('yellowParticlesGain', buff);
      self.description = 'Multiply yellow particles gain by ' + self.buffer.toString(true) + 'x';
      return buff;
    },
    nav: 'yellow',
    subNav: 'yellowUpgrades'
  },
  {
    name: 'yellow-based-multiplier',
    displayName: 'Yellows based multiplier',
    description: 'Gain a 0.2x multiplier to red particle generators for each yellow you have.',
    auto: false,
    baseCost: new Num(1, 0),
    cost: new Num(1, 0),
    increase: new Num(1, 1),
    scaling: new Num(0, 0),
    bought: new Num(0, 0),
    currency: 'yellowParticles',
    baseBuffer: new Num(1, 0),
    buffer: new Num(1, 0),
    amount: new Num(0, 0),
    type: 'yellow-upgrades',
    resetId: 'yellow',
    style: 'yellow-style',
    unlocked: false,
    oneTime: true,
    resets: 'none',
    requirement: ['yellows', new Num(1, 0)],
    action: (self: Upgrade) => {
      const buff: Num = HoldingsService.get('yellows').mul(new Num(0.2, 0), false);
      buff.add(new Num(1, 0))
      GlobalMultipliersService.correct('redParticleGenerators', buff);
      return buff
    },
    nav: 'yellow',
    subNav: 'yellowUpgrades'
  },
  {
    name: 'yellow-based-accelerator-multiplier',
    displayName: 'Yellows based accelerator multiplier',
    description: 'Gain a 0.2x multiplier to red accelerator generators for each yellow you have.',
    auto: false,
    baseCost: new Num(2, 0),
    cost: new Num(2, 0),
    increase: new Num(1, 1),
    scaling: new Num(0, 0),
    bought: new Num(0, 0),
    currency: 'yellowParticles',
    baseBuffer: new Num(1, 0),
    buffer: new Num(1, 0),
    amount: new Num(0, 0),
    type: 'yellow-upgrades',
    resetId: 'yellow',
    style: 'yellow-style',
    unlocked: false,
    oneTime: true,
    resets: 'none',
    requirement: ['yellows', new Num(1, 0)],
    action: (self: Upgrade) => {
      const buff: Num = HoldingsService.get('yellows').mul(new Num(0.2, 0), false);
      buff.add(new Num(1, 0))
      GlobalMultipliersService.correct('redAcceleratorGenerators', buff);
      return buff
    },
    nav: 'yellow',
    subNav: 'yellowUpgrades'
  },
  {
    name: 'increase-red-generator-multiplier',
    displayName: 'Multiplier increaser',
    description: 'Sets the multiplier of red generators to 3',
    auto: false,
    baseCost: new Num(3, 0),
    cost: new Num(3, 0),
    increase: new Num(1, 1),
    scaling: new Num(0, 0),
    bought: new Num(0, 0),
    currency: 'yellowParticles',
    baseBuffer: new Num(1, 0),
    buffer: new Num(1, 0),
    amount: new Num(0, 0),
    type: 'yellow-upgrades',
    resetId: 'yellow',
    style: 'yellow-style',
    unlocked: false,
    oneTime: true,
    resets: 'none',
    requirement: ['yellows', new Num(1, 0)],
    action: (self: Upgrade) => {
      GeneratorService.setValues('red-particles', 'baseMultiplier', new Num(3, 0))
    },
    nav: 'yellow',
    subNav: 'yellowUpgrades'
  },
  {
    name: 'increase-red-accelerator-upgrade-1',
    displayName: 'Red accelerator buffer 1',
    description: 'Increases the multiplier of the first red accelerator upgrade by 1.',
    auto: false,
    baseCost: new Num(4, 0),
    cost: new Num(4, 0),
    increase: new Num(1, 1),
    scaling: new Num(0, 0),
    bought: new Num(0, 0),
    currency: 'yellowParticles',
    baseBuffer: new Num(1, 0),
    buffer: new Num(1, 0),
    amount: new Num(0, 0),
    type: 'yellow-upgrades',
    resetId: 'yellow',
    style: 'yellow-style',
    unlocked: false,
    oneTime: true,
    resets: 'none',
    requirement: ['yellows', new Num(1, 0)],
    action: (self: Upgrade) => {
      UpgradeService.increaseBuffer('red-accelerator-multiplier-1', new Num(1, 0))
    },
    nav: 'yellow',
    subNav: 'yellowUpgrades'
  },
  {
    name: 'increase-red-accelerator-upgrade-2',
    displayName: 'Red accelerator buffer 2',
    description: 'Increases the multiplier of the second red accelerator upgrade by 1.5.',
    auto: false,
    baseCost: new Num(5, 0),
    cost: new Num(5, 0),
    increase: new Num(1, 1),
    scaling: new Num(0, 0),
    bought: new Num(0, 0),
    currency: 'yellowParticles',
    baseBuffer: new Num(1, 0),
    buffer: new Num(1, 0),
    amount: new Num(0, 0),
    type: 'yellow-upgrades',
    resetId: 'yellow',
    style: 'yellow-style',
    unlocked: false,
    oneTime: true,
    resets: 'none',
    requirement: ['yellows', new Num(1, 0)],
    action: (self: Upgrade) => {
      UpgradeService.increaseBuffer('red-accelerator-multiplier-2', new Num(1.5, 0))
    },
    nav: 'yellow',
    subNav: 'yellowUpgrades'
  },
  {
    name: 'increase-red-accelerator-upgrade-3',
    displayName: 'Red accelerator buffer 3',
    description: 'Increases the multiplier of the third red accelerator upgrade by 2.',
    auto: false,
    baseCost: new Num(6, 0),
    cost: new Num(6, 0),
    increase: new Num(1, 1),
    scaling: new Num(0, 0),
    bought: new Num(0, 0),
    currency: 'yellowParticles',
    baseBuffer: new Num(1, 0),
    buffer: new Num(1, 0),
    amount: new Num(0, 0),
    type: 'yellow-upgrades',
    resetId: 'yellow',
    style: 'yellow-style',
    unlocked: false,
    oneTime: true,
    resets: 'none',
    requirement: ['yellows', new Num(1, 0)],
    action: (self: Upgrade) => {
      UpgradeService.increaseBuffer('red-accelerator-multiplier-3', new Num(2, 0));
    },
    nav: 'yellow',
    subNav: 'yellowUpgrades'
  },
  {
    name: 'increase-red-generator-extension',
    displayName: 'Red extension booster',
    description: 'Multiply the multiplier of the red generator extension by 2.',
    auto: false,
    baseCost: new Num(7, 0),
    cost: new Num(7, 0),
    increase: new Num(1, 1),
    scaling: new Num(0, 0),
    bought: new Num(0, 0),
    currency: 'yellowParticles',
    baseBuffer: new Num(1, 0),
    buffer: new Num(1, 0),
    amount: new Num(0, 0),
    type: 'yellow-upgrades',
    resetId: 'yellow',
    style: 'yellow-style',
    unlocked: false,
    oneTime: true,
    resets: 'none',
    requirement: ['yellows', new Num(1, 0)],
    action: (self: Upgrade) => {
      UpgradeService.getValue('red-generator-extension', 'buffer').mul(new Num(2, 0))
    },
    nav: 'yellow',
    subNav: 'yellowUpgrades'
  },
  {
    name: 'increase-red-generator-booster',
    displayName: 'Red booster extension',
    description: 'Increases the multiplier of the red generator booster by 0.6.',
    auto: false,
    baseCost: new Num(8, 0),
    cost: new Num(8, 0),
    increase: new Num(1, 1),
    scaling: new Num(0, 0),
    bought: new Num(0, 0),
    currency: 'yellowParticles',
    baseBuffer: new Num(1, 0),
    buffer: new Num(1, 0),
    amount: new Num(0, 0),
    type: 'yellow-upgrades',
    resetId: 'yellow',
    style: 'yellow-style',
    unlocked: false,
    oneTime: true,
    resets: 'none',
    requirement: ['yellows', new Num(1, 0)],
    action: (self: Upgrade) => {
      UpgradeService.increaseBuffer('red-generator-booster', new Num(0.6, 0));
    },
    nav: 'yellow',
    subNav: 'yellowUpgrades'
  },
  {
    name: 'start-with-red-accelerators',
    displayName: 'Accelerator Starter',
    description: 'Start yellows with red accelerators unlocked.',
    auto: false,
    baseCost: new Num(1, 1),
    cost: new Num(1, 1),
    increase: new Num(1, 1),
    scaling: new Num(0, 0),
    bought: new Num(0, 0),
    currency: 'yellowParticles',
    baseBuffer: new Num(1, 0),
    buffer: new Num(1, 0),
    amount: new Num(0, 0),
    type: 'yellow-upgrades',
    resetId: 'yellow',
    style: 'yellow-style',
    unlocked: false,
    oneTime: true,
    resets: 'none',
    requirement: ['yellows', new Num(1, 0)],
    action: (self: Upgrade) => {
      GeneratorService.setValue('red-accelerator-generator-1', 'requirement', ['none']);
    },
    nav: 'yellow',
    subNav: 'yellowUpgrades'
  }
]
