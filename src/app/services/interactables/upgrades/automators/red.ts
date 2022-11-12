import {Num} from "../../../../num";
import {Action} from "../../../../action";
import {Upgrade} from "../../../../globals";

export const redAutomators: Upgrade[] = [
  {
    name: 'red-generators-automator', displayName: 'Red Generators Automator', description: 'Automates the buying of red generators.', auto: false,
    baseCost: new Num(5,0), cost: new Num(5, 0), increase: new Num(1,1), scaling: new Num(2, 0), bought: new Num(0, 0), currency: 'yellowParticles',
    baseBuffer: new Num(2, 0), buffer: new Num(2, 0), amount: new Num(0, 0), type: 'red-automators', resetId: 'red-automators', style: 'automator', unlocked: false, oneTime: true, resets: 'none', requirement: ['yellows', new Num(1, 0)],
    action: new Action('amplifyGenerators', 'red-particles', true, 'auto')
  },
  {
    name: 'red-accelerators-automator', displayName: 'Red Accelerators Automator', description: 'Automates the buying of red accelerator generators.', auto: false,
    baseCost: new Num(5,0), cost: new Num(5, 0), increase: new Num(1,1), scaling: new Num(2, 0), bought: new Num(0, 0), currency: 'yellowParticles',
    baseBuffer: new Num(2, 0), buffer: new Num(2, 0), amount: new Num(0, 0), type: 'red-automators', resetId: 'red-automators', style: 'automator', unlocked: false, oneTime: true, resets: 'none', requirement: ['yellows', new Num(1, 0)],
    action: new Action('amplifyGenerators', 'red-accelerators', true, 'auto')
  },
  {
    name: 'red-booster-automator', displayName: 'Red Booster Automator', description: 'Automates the buying of red booster upgrades.', auto: false,
    baseCost: new Num(1,1), cost: new Num(1, 1), increase: new Num(1,1), scaling: new Num(2, 0), bought: new Num(0, 0), currency: 'yellowParticles',
    baseBuffer: new Num(2, 0), buffer: new Num(2, 0), amount: new Num(0, 0), type: 'red-automators', resetId: 'red-automators', style: 'automator', unlocked: false, oneTime: true, resets: 'none', requirement: ['yellows', new Num(1, 0)],
    action: new Action('amplifyUpgrade', 'red-generator-booster', true, 'auto')
  },
  {
    name: 'red-extension-automator', displayName: 'Red Extension Automator', description: 'Automates the buying of red extension upgrades.', auto: false,
    baseCost: new Num(1,1), cost: new Num(1, 1), increase: new Num(1,1), scaling: new Num(2, 0), bought: new Num(0, 0), currency: 'yellowParticles',
    baseBuffer: new Num(2, 0), buffer: new Num(2, 0), amount: new Num(0, 0), type: 'red-automators', resetId: 'red-automators', style: 'automator', unlocked: false, oneTime: true, resets: 'none', requirement: ['yellows', new Num(1, 0)],
    action: new Action('amplifyUpgrade', 'red-generator-extension', true, 'auto')
  },
  {
    name: 'red-accelerator-upgrades-automator', displayName: 'Red Accelerator Upgrades Automator', description: 'Automates the buying of red accelerator upgrades.', auto: false,
    baseCost: new Num(1,2), cost: new Num(1, 2), increase: new Num(1,1), scaling: new Num(2, 0), bought: new Num(0, 0), currency: 'yellowParticles',
    baseBuffer: new Num(2, 0), buffer: new Num(2, 0), amount: new Num(0, 0), type: 'red-automators', resetId: 'red-automators', style: 'automator', unlocked: false, oneTime: true, resets: 'none', requirement: ['yellows', new Num(1, 0)],
    action: new Action('amplifyUpgrades', 'red-accelerators', true, 'auto')
  },
]
