import {Upgrade} from "../../../../globals";
import {Num} from "../../../../num";
import {Action} from "../../../../action";

export const limitedGreenUpgrades: Upgrade[] = [
  {
    name: 'red-accelerator-buffer', displayName: 'Buff red accelerators', description: '', auto: false,
    baseCost: new Num(1,0), cost: new Num(1, 0), increase: new Num(1,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'greenSouls',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'green-limited-upgrades', resetId: 'green-limited-upgrades', style: 'limited-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['greens', new Num(1, 0)],
    action: new Action('decreaseHolding', 'greenSouls', new Num(1, 0), 'cost', 'red-accelerator-buffer')
  },
  {
    name: 'green-generators-energy-based', displayName: 'Buff green generators based on green energy', description: '', auto: false,
    baseCost: new Num(3,0), cost: new Num(3, 0), increase: new Num(1,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'greenSouls',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'green-limited-upgrades', resetId: 'green-limited-upgrades', style: 'limited-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['greens', new Num(1, 0)],
    action: [
      new Action('basedOnHolding', 'greenParticleGenerators', new Num(1, -2), 'power', 'greenEnergy'),
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
    name: 'red-generators-booster-increase', displayName: 'Increase red generator boosters effect by 3', description: '', auto: false,
    baseCost: new Num(1,1), cost: new Num(1, 1), increase: new Num(1,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'greenSouls',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'green-limited-upgrades', resetId: 'green-limited-upgrades', style: 'limited-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['greens', new Num(1, 0)],
    action: [
      new Action('increaseBuffer', 'red-generator-booster', new Num(3, 0)),
      new Action('decreaseHolding', 'greenSouls', new Num(1, 1), 'cost', 'red-accelerator-buffer'),
    ]
  },
]
