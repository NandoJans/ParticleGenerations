import {Num} from "../../../../num";
import {Action} from "../../../../action";
import {Upgrade} from "../../../../globals";


export const nuclearDecayUpgrades: Upgrade[] = [
  {
    name: 'nuclear-decay-base-increaser', displayName: 'Increase Base Boost', description: 'Increases the base boost of nuclear decay by 1.', auto: false, noMax: true,
    baseCost: new Num(5,0), cost: new Num(5, 0), increase: new Num(2,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'greenSouls',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'nuclear-decay', resetId: 'nuclear-decay', style: 'green-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['greenParticles', new Num(1, 30)],
    action: new Action('decreaseHoldingIncremental', 'greenSouls', new Num(5, 0), 'bought', 'nuclear-decay-base-increaser'),
  },
  {
    name: 'nuclear-decay-increaser', displayName: 'Increase Multiplier', description: 'Increases the multiplier of the nuclear decay generator by 5x.', auto: false, noMax: true,
    baseCost: new Num(1,1), cost: new Num(1, 1), increase: new Num(2,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'greenSouls',
    baseBuffer: new Num(5, 0), buffer: new Num(5, 0), amount: new Num(0, 0), type: 'nuclear-decay', resetId: 'nuclear-decay', style: 'green-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['greenParticles', new Num(1, 30)],
    action: [
      new Action('basedOnUpgrade', 'nuclearDecayGenerators', new Num(1, 0), 'bought', 'nuclear-decay-increaser'),
      new Action('decreaseHoldingIncremental', 'greenSouls', new Num(1, 1), 'bought', 'nuclear-decay-increaser'),
    ],
  },
  {
    name: 'better-nuclear-decay', displayName: 'Better Nuclear Decay', description: 'Restart Nuclear Decay buy the boost to red generator boosters will be better.', auto: false, noMax: true,
    baseCost: new Num(5,1), cost: new Num(5, 1), increase: new Num(2,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'greenSouls',
    baseBuffer: new Num(1.2, 0), buffer: new Num(1.2, 0), amount: new Num(0, 0), type: 'nuclear-decay', resetId: 'nuclear-decay', style: 'green-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['greenParticles', new Num(1, 30)],
    action: [
      new Action('decreaseHoldingIncremental', 'greenSouls', new Num(5, 1), 'bought', 'better-nuclear-decay'),
    ],
  },
]
