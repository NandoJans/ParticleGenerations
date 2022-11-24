import {Upgrade} from "../../../../globals";
import {Num} from "../../../../num";
import {Action} from "../../../../action";

export const limitedGreenUpgrades: Upgrade[] = [
  {
    name: 'red-accelerator-buffer', displayName: 'Buff red accelerators', description: '', auto: false, noMax: true,
    baseCost: new Num(1,0), cost: new Num(1, 0), increase: new Num(1,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'greenSouls',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'green-limited-upgrades', resetId: 'green-limited-upgrades', style: 'limited-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['greens', new Num(1, 0)],
    action: new Action('decreaseHolding', 'greenSouls', new Num(1, 0), 'cost', 'red-accelerator-buffer')
  },
  {
    name: 'green-generators-energy-based', displayName: 'Buff green generators based on green energy', description: '', auto: false, noMax: true,
    baseCost: new Num(3,0), cost: new Num(3, 0), increase: new Num(1,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'greenSouls',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'green-limited-upgrades', resetId: 'green-limited-upgrades', style: 'limited-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['greens', new Num(1, 0)],
    action: [
      new Action('basedOnHolding', 'greenParticleGenerators', new Num(3, -2), 'power', 'greenEnergy'),
      new Action('decreaseHolding', 'greenSouls', new Num(3, 0), 'cost', 'red-accelerator-buffer'),
    ]
  },
  {
    name: 'accelerators-yellow-power-based', displayName: 'Give Accelerators a multiplier based on fifth yellow generators', description: '', auto: false,
    baseCost: new Num(5,0), cost: new Num(5, 0), increase: new Num(1,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'greenSouls',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'green-limited-upgrades', resetId: 'green-limited-upgrades', style: 'limited-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['greens', new Num(1, 0)],
    action: [
      new Action('basedOnGenerator', 'redAcceleratorGenerators', new Num(1, 0), 'multiplier', 'yellow-generator-5'),
      new Action('decreaseHolding', 'greenSouls', new Num(5, 0), 'cost', 'red-accelerator-buffer'),
    ]
  },
  {
    name: 'green-generator-greens-based', displayName: 'Give green generators a multiplier based on greens', description: '', auto: false, noMax: true,
    baseCost: new Num(7,0), cost: new Num(7, 0), increase: new Num(1,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'greenSouls',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'green-limited-upgrades', resetId: 'green-limited-upgrades', style: 'limited-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['greens', new Num(1, 0)],
    action: [
      new Action('basedOnHolding', 'greenParticleGenerators', new Num(1, 0), '', 'greens'),
      new Action('decreaseHolding', 'greenSouls', new Num(7, 0), 'cost', 'red-accelerator-buffer'),
    ]
  },
  {
    name: 'red-generators-booster-increase', displayName: 'Increase red generator boosters effect by 3', description: '', auto: false, noMax: true,
    baseCost: new Num(1,1), cost: new Num(1, 1), increase: new Num(1,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'greenSouls',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'green-limited-upgrades', resetId: 'green-limited-upgrades', style: 'limited-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['greens', new Num(1, 0)],
    action: [
      new Action('increaseBuffer', 'red-generator-booster', new Num(3, 0)),
      new Action('decreaseHolding', 'greenSouls', new Num(1, 1), 'cost', 'red-accelerator-buffer'),
    ]
  },
  {
    name: 'green-buffs-yellow-generators', displayName: 'Green generators boost yellow generators', description: '', auto: false, noMax: true,
    baseCost: new Num(1.6,1), cost: new Num(1.6, 1), increase: new Num(1,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'greenSouls',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'green-limited-upgrades', resetId: 'green-limited-upgrades', style: 'limited-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['greens', new Num(1, 0)],
    action: [
      new Action('basedOnGenerator', 'yellowParticleGenerators', new Num(1.5, 1), 'amount', 'green-generator-1'),
      new Action('decreaseHolding', 'greenSouls', new Num(1.6, 1), 'cost', 'red-accelerator-buffer'),
    ]
  },
  {
    name: 'fusion-boost-red-generators', displayName: 'Yellow fusion gives a boost to red generators', description: '', auto: false, noMax: true,
    baseCost: new Num(2.5,1), cost: new Num(2.5, 1), increase: new Num(1,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'greenSouls',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'green-limited-upgrades', resetId: 'green-limited-upgrades', style: 'limited-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['greens', new Num(1, 0)],
    action: [
      new Action('basedOnHolding', 'redParticleGenerators', new Num(1, 1), 'power', 'yellowFusion'),
      new Action('decreaseHolding', 'greenSouls', new Num(2.5, 1), 'cost', 'red-accelerator-buffer'),
    ]
  },
  {
    name: 'remove-fusion-limit', displayName: 'Remove the fusion limit, but fusion is slowed down when going beyond its limit.', description: '', auto: false, noMax: true,
    baseCost: new Num(1,2), cost: new Num(1, 2), increase: new Num(1,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'greenSouls',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'green-limited-upgrades', resetId: 'green-limited-upgrades', style: 'limited-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['greens', new Num(1, 0)],
    action: [
      new Action('decreaseHolding', 'greenSouls', new Num(1, 2), 'cost', 'red-accelerator-buffer'),
    ]
  },
  {
    name: 'super-increase-fusion', displayName: 'Increase Yellow Fusion by 20x.', description: '', auto: false, noMax: true,
    baseCost: new Num(1,2), cost: new Num(1, 2), increase: new Num(1,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'greenSouls',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'green-limited-upgrades', resetId: 'green-limited-upgrades', style: 'limited-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['greens', new Num(1, 0)],
    action: [
      new Action('globalMultiplier', 'yellowFusion', new Num(2, 1)),
      new Action('decreaseHolding', 'greenSouls', new Num(1, 2), 'cost', 'red-accelerator-buffer'),
    ]
  },
  {
    name: 'yellow-idle-gain', displayName: 'Gain 1% of your yellows gained on yellow per second.', description: '', auto: false, noMax: true,
    baseCost: new Num(2,2), cost: new Num(2, 2), increase: new Num(1,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'greenSouls',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'green-limited-upgrades', resetId: 'green-limited-upgrades', style: 'limited-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['greens', new Num(1, 0)],
    action: [
      new Action('decreaseHolding', 'greenSouls', new Num(2, 2), 'cost', 'red-accelerator-buffer'),
    ]
  },
]
