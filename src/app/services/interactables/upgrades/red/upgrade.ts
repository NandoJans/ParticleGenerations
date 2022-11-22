import {Num} from "../../../../num";
import {Upgrade} from "../../../../globals";
import {Action} from "../../../../action";

export const redUpgrades: Upgrade[] = [
  {
    name: 'red-generator-extension-upgrade', displayName: 'Extension Upgrade', description: 'Red generator extensions multiply the red generators by 2.',
    baseCost: new Num(1,45), cost: new Num(1, 45), increase: new Num(1,0), scaling: new Num(0, 0), bought: new Num(0, 0), currency: 'redParticles',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'red-upgrades', resetId: 'red-upgrades', style: 'red-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['redParticles', new Num(1, 40)],
    action: new Action('setAction', 'red-generator-extension', new Num(2, 0), 'action')
  },
  {
    name: 'unlock-red-generators-booster', displayName: 'Unlock Generator Booster', description: 'Adds a booster upgrade for red particle generators.', auto: false,
    baseCost: new Num(1,60), cost: new Num(1, 60), increase: new Num(1,0), scaling: new Num(0, 0), bought: new Num(0, 0), currency: 'redParticles',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'red-upgrades', resetId: 'red-upgrades', style: 'red-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['redParticles', new Num(1, 40)],
    action: new Action('amplifyUpgrade', 'red-generator-booster', ['none'], 'requirement')
  },
  {
    name: 'red-accelerators-particles-based', displayName: 'Accelerator Particles', description: 'Gives a multiplier to the accelerators generator based on particles.', auto: false,
    baseCost: new Num(1,65), cost: new Num(1, 65), increase: new Num(1,0), scaling: new Num(0, 0), bought: new Num(0, 0), currency: 'redParticles',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'red-upgrades', resetId: 'red-upgrades', style: 'red-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['redParticles', new Num(1, 40)],
    action: new Action('basedOnHolding', 'redAcceleratorGenerators', new Num(1, 0), 'exponent', 'redParticles')
  },
  {
    name: 'red-booster-multiplier-upgrade', displayName: 'Booster Multiplier Amplifier', description: 'Increase the multiplier of the red generator booster.', auto: false,
    baseCost: new Num(1,80), cost: new Num(1, 80), increase: new Num(1,0), scaling: new Num(0, 0), bought: new Num(0, 0), currency: 'redParticles',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'red-upgrades', resetId: 'red-upgrades', style: 'red-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['redParticles', new Num(1, 40)],
    action: new Action('increaseBuffer', 'red-generator-booster', new Num(0.2, 0))
  },
  {
    name: 'red-booster-scaling-upgrade', displayName: 'Booster Cost Decreaser', description: 'Decrease the cost scaling of the red generator booster.', auto: false,
    baseCost: new Num(1,90), cost: new Num(1, 90), increase: new Num(1,0), scaling: new Num(0, 0), bought: new Num(0, 0), currency: 'redParticles',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'red-upgrades', resetId: 'red-upgrades', style: 'red-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['redParticles', new Num(1, 40)],
    action: new Action('amplifyUpgrade', 'red-generator-booster', new Num(2, 0), 'scaling')
  },
  {
    name: 'red-accelerator-booster-1', displayName: 'Boost accelerator upgrade 2', description: 'Increases the multiplier of the first red accelerator upgrade.', auto: false,
    baseCost: new Num(1,95), cost: new Num(1, 95), increase: new Num(1,0), scaling: new Num(0, 0), bought: new Num(0, 0), currency: 'redParticles',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'red-upgrades', resetId: 'red-upgrades', style: 'red-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['redParticles', new Num(1, 40)],
    action: new Action('increaseBuffer', 'red-accelerator-multiplier-1', new Num(0.5, 0))
  },
  {
    name: 'red-accelerator-booster-2', displayName: 'Boost accelerator upgrade 3', description: 'Increases the multiplier of the second red accelerator upgrade.', auto: false,
    baseCost: new Num(1,100), cost: new Num(1, 100), increase: new Num(1,0), scaling: new Num(0, 0), bought: new Num(0, 0), currency: 'redParticles',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'red-upgrades', resetId: 'red-upgrades', style: 'red-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['redParticles', new Num(1, 40)],
    action: new Action('increaseBuffer', 'red-accelerator-multiplier-2', new Num(0.5, 0))
  },
  {
    name: 'red-accelerator-booster-3', displayName: 'Boost accelerator upgrade 4', description: 'Increases the multiplier of the third red accelerator upgrade.', auto: false,
    baseCost: new Num(1,105), cost: new Num(1, 105), increase: new Num(1,0), scaling: new Num(0, 0), bought: new Num(0, 0), currency: 'redParticles',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'red-upgrades', resetId: 'red-upgrades', style: 'red-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['redParticles', new Num(1, 40)],
    action: new Action('increaseBuffer', 'red-accelerator-multiplier-3', new Num(0.5, 0))
  },
]
