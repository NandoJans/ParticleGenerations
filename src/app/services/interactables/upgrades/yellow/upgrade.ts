import {Upgrade} from "../../../../globals";
import {Num} from "../../../../num";
import {Action} from "../../../../action";
import {NewAction} from "../../../../NewAction";

export const yellowUpgrades: Upgrade[] = [
  {
    name: 'yellow-repeatable-multiplier', displayName: 'Multiply 2', description: 'Multiply red generators by 2', auto: false, scalingStart: new Num(1, 10000000),
    baseCost: new Num(1,0), cost: new Num(1, 0), increase: new Num(1,1), scaling: new Num(1, 1), bought: new Num(0, 0), currency: 'yellowParticles',
    baseBuffer: new Num(2, 0), buffer: new Num(2, 0), amount: new Num(0, 0), type: 'yellow-upgrades-repeatable', resetId: 'yellow-upgrades', style: 'yellow-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['yellows', new Num(1, 0)],
    action: new NewAction('multiply multiplier redParticleGenerators basedon upgrade this pow', new Num(1, 0)), nav: 'yellow', subNav: 'yellowUpgrades'
  },
  {
    name: 'yellow-particle-multiplier', displayName: 'Multiply particles by 2', description: 'Multiply yellow particles by 2', auto: false,
    baseCost: new Num(1,0), cost: new Num(1, 0), increase: new Num(1,1), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'yellowParticles',
    baseBuffer: new Num(2, 0), buffer: new Num(2, 0), amount: new Num(0, 0), type: 'yellow-upgrades-repeatable', resetId: 'yellow-upgrades', style: 'yellow-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['yellows', new Num(1, 0)],
    action: new NewAction('multiply multiplier yellowParticlesGain basedon upgrade this pow', new Num(1, 0)), nav: 'yellow', subNav: 'yellowUpgrades'
  },
  {
    name: 'yellow-based-multiplier', displayName: 'Yellows based multiplier', description: 'Your red generators are multiplied by the amount of yellows you have', auto: false,
    baseCost: new Num(1,0), cost: new Num(1, 0), increase: new Num(1,1), scaling: new Num(0, 0), bought: new Num(0, 0), currency: 'yellowParticles',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'yellow-upgrades', resetId: 'yellow-upgrades', style: 'yellow-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['yellows', new Num(1, 0)],
    action: new NewAction('multiply multiplier redParticleGenerators basedon holding yellows mul', new Num(0.2, 0)), nav: 'yellow', subNav: 'yellowUpgrades'
  },
  {
    name: 'yellow-based-accelerator-multiplier', displayName: 'Yellows based accelerator multiplier', description: 'Your red accelator generators are multiplied by the amount of yellows you have', auto: false,
    baseCost: new Num(2,0), cost: new Num(2, 0), increase: new Num(1,1), scaling: new Num(0, 0), bought: new Num(0, 0), currency: 'yellowParticles',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'yellow-upgrades', resetId: 'yellow-upgrades', style: 'yellow-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['yellows', new Num(1, 0)],
    action: new NewAction('multiply multiplier redAcceleratorGenerators basedon holding yellows mul', new Num(0.2, 0)), nav: 'yellow', subNav: 'yellowUpgrades'
  },
  {
    name: 'increase-red-generator-multiplier', displayName: 'Multiplier increaser', description: 'Sets the multiplier of red generators to 3', auto: false,
    baseCost: new Num(3,0), cost: new Num(3, 0), increase: new Num(1,1), scaling: new Num(0, 0), bought: new Num(0, 0), currency: 'yellowParticles',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'yellow-upgrades', resetId: 'yellow-upgrades', style: 'yellow-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['yellows', new Num(1, 0)],
    action: new NewAction('multiply generators red-particles baseMulMod by', new Num(1.5, 0)), nav: 'yellow', subNav: 'yellowUpgrades'
  },
  {
    name: 'increase-red-accelerator-upgrade-1', displayName: 'Red accelerator buffer 1', description: 'Increases the multiplier of the first red accelerator upgrade.', auto: false,
    baseCost: new Num(4,0), cost: new Num(4, 0), increase: new Num(1,1), scaling: new Num(0, 0), bought: new Num(0, 0), currency: 'yellowParticles',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'yellow-upgrades', resetId: 'yellow-upgrades', style: 'yellow-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['yellows', new Num(1, 0)],
    action: new NewAction('increase upgrade red-accelerator-multiplier-1 buffer by', new Num(1, 0)), nav: 'yellow', subNav: 'yellowUpgrades'
  },
  {
    name: 'increase-red-accelerator-upgrade-2', displayName: 'Red accelerator buffer 2', description: 'Increases the multiplier of the second red accelerator upgrade.', auto: false,
    baseCost: new Num(5,0), cost: new Num(5, 0), increase: new Num(1,1), scaling: new Num(0, 0), bought: new Num(0, 0), currency: 'yellowParticles',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'yellow-upgrades', resetId: 'yellow-upgrades', style: 'yellow-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['yellows', new Num(1, 0)],
    action: new NewAction('increase upgrade red-accelerator-multiplier-2 buffer by', new Num(1.5, 0)), nav: 'yellow', subNav: 'yellowUpgrades'
  },
  {
    name: 'increase-red-accelerator-upgrade-3', displayName: 'Red accelerator buffer 3', description: 'Increases the multiplier of the third red accelerator upgrade.', auto: false,
    baseCost: new Num(6,0), cost: new Num(6, 0), increase: new Num(1,1), scaling: new Num(0, 0), bought: new Num(0, 0), currency: 'yellowParticles',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'yellow-upgrades', resetId: 'yellow-upgrades', style: 'yellow-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['yellows', new Num(1, 0)],
    action: new NewAction('increase upgrade red-accelerator-multiplier-3 buffer by', new Num(2, 0)), nav: 'yellow', subNav: 'yellowUpgrades'
  },
  {
    name: 'increase-red-generator-extension', displayName: 'Red extension booster', description: 'Increases the multiplier of the red generator extension.', auto: false,
    baseCost: new Num(7,0), cost: new Num(7, 0), increase: new Num(1,1), scaling: new Num(0, 0), bought: new Num(0, 0), currency: 'yellowParticles',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'yellow-upgrades', resetId: 'yellow-upgrades', style: 'yellow-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['yellows', new Num(1, 0)],
    action: new NewAction('multiply upgrade red-generator-extension buffer by', new Num(2, 0)), nav: 'yellow', subNav: 'yellowUpgrades'
  },
  {
    name: 'increase-red-generator-booster', displayName: 'Red booster extension', description: 'Increases the multiplier of the red generator booster.', auto: false,
    baseCost: new Num(8,0), cost: new Num(8, 0), increase: new Num(1,1), scaling: new Num(0, 0), bought: new Num(0, 0), currency: 'yellowParticles',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'yellow-upgrades', resetId: 'yellow-upgrades', style: 'yellow-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['yellows', new Num(1, 0)],
    action: new NewAction('increase upgrade red-generator-booster buffer by', new Num(0.6, 0)), nav: 'yellow', subNav: 'yellowUpgrades'
  },
  {
    name: 'start-with-red-accelerators', displayName: 'Accelerator Starter', description: 'Start yellows with red accelerators unlocked.', auto: false,
    baseCost: new Num(1,1), cost: new Num(1, 1), increase: new Num(1,1), scaling: new Num(0, 0), bought: new Num(0, 0), currency: 'yellowParticles',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'yellow-upgrades', resetId: 'yellow-upgrades', style: 'yellow-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['yellows', new Num(1, 0)],
    action: new NewAction('set generator red-accelerator-generator-1 requirement to', ['none']), nav: 'yellow', subNav: 'yellowUpgrades'
  }
]
