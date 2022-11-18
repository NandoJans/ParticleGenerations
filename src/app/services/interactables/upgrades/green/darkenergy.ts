import {Upgrade} from "../../../../globals";
import {Num} from "../../../../num";
import {Action} from "../../../../action";

export const darkenergyUpgrades: Upgrade[] = [
  {
    name: 'dark-energy-compressor', displayName: 'Compressor', description: 'Compresses Green Energy into Dark Energy', auto: false,
    baseCost: new Num(1,5), cost: new Num(1, 5), increase: new Num(1,1), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'greenEnergy',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'dark-compressor', resetId: 'dark-compressor', style: 'sacrifice-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['greens', new Num(1, 1)],
    action: [
      new Action('increaseHolding', 'darkEnergy', new Num(1, 0), 'bought', 'dark-energy-compressor'),
    ]
  },
  {
    name: 'dark-red-generators', displayName: 'Dark red generators', description: '', auto: false,
    baseCost: new Num(1,0), cost: new Num(1, 0), increase: new Num(2,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'darkEnergy',
    baseBuffer: new Num(1, 50), buffer: new Num(1, 50), amount: new Num(0, 0), type: 'dark-upgrade', resetId: 'dark-upgrade', style: 'sacrifice-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['greens', new Num(1, 1)],
    action: [
      new Action('basedOnUpgrade', 'redParticleGenerators', new Num(1, 0), 'bought', 'dark-red-generators'),
      new Action('decreaseHoldingIncremental', 'darkEnergy', new Num(1, 0), 'bought', 'dark-red-generators'),
    ]
  },
  {
    name: 'dark-red-accelerators', displayName: 'Dark red accelerators', description: '', auto: false,
    baseCost: new Num(1,0), cost: new Num(1, 0), increase: new Num(2,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'darkEnergy',
    baseBuffer: new Num(1, 30), buffer: new Num(1, 30), amount: new Num(0, 0), type: 'dark-upgrade', resetId: 'dark-upgrade', style: 'sacrifice-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['greens', new Num(1, 1)],
    action: [
      new Action('basedOnUpgrade', 'redAcceleratorGenerators', new Num(1, 0), 'bought', 'dark-red-accelerators'),
      new Action('decreaseHoldingIncremental', 'darkEnergy', new Num(1, 0), 'bought', 'dark-red-accelerators'),
    ]
  },
  {
    name: 'dark-yellow-generators', displayName: 'Dark yellow generators', description: '', auto: false,
    baseCost: new Num(1,0), cost: new Num(1, 0), increase: new Num(2,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'darkEnergy',
    baseBuffer: new Num(1, 10), buffer: new Num(1, 10), amount: new Num(0, 0), type: 'dark-upgrade', resetId: 'dark-upgrade', style: 'sacrifice-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['greens', new Num(1, 1)],
    action: [
      new Action('basedOnUpgrade', 'yellowParticleGenerators', new Num(1, 0), 'bought', 'dark-yellow-generators'),
      new Action('decreaseHoldingIncremental', 'darkEnergy', new Num(1, 0), 'bought', 'dark-yellow-generators'),
    ]
  },
  {
    name: 'dark-yellow-fusion', displayName: 'Dark yellow fusion', description: '', auto: false,
    baseCost: new Num(1,0), cost: new Num(1, 0), increase: new Num(2,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'darkEnergy',
    baseBuffer: new Num(1, 10), buffer: new Num(1, 10), amount: new Num(0, 0), type: 'dark-upgrade', resetId: 'dark-upgrade', style: 'sacrifice-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['greens', new Num(1, 1)],
    action: [
      new Action('increaseHoldingIncremental', 'yellowFusionMax', new Num(1, 10), 'bought', 'dark-yellow-fusion'),
      new Action('decreaseHoldingIncremental', 'darkEnergy', new Num(1, 0), 'bought', 'dark-yellow-fusion'),
    ]
  },
  {
    name: 'dark-green-generators', displayName: 'Dark green generators', description: '', auto: false,
    baseCost: new Num(1,0), cost: new Num(1, 0), increase: new Num(2,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'darkEnergy',
    baseBuffer: new Num(2, 0), buffer: new Num(2, 0), amount: new Num(0, 0), type: 'dark-upgrade', resetId: 'dark-upgrade', style: 'sacrifice-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['greens', new Num(1, 1)],
    action: [
      new Action('basedOnUpgrade', 'greenParticleGenerators', new Num(1, 0), 'bought', 'dark-green-generators'),
      new Action('decreaseHoldingIncremental', 'darkEnergy', new Num(1, 0), 'bought', 'dark-green-generators'),
    ]
  },
]
