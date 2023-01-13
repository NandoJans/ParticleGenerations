import {Num} from "../../../../num";
import {Action} from "../../../../action";
import {Upgrade} from "../../../../globals";


export const nuclearDecayUpgrades: Upgrade[] = [
  {
    name: 'nuclear-decay-increaser', displayName: 'Increase Multiplier', description: 'Increases the multiplier of the nuclear decay generator by 5x.', auto: false, noMax: true,
    baseCost: new Num(1,1), cost: new Num(1, 1), increase: new Num(2,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'greenSouls',
    baseBuffer: new Num(5, 0), buffer: new Num(5, 0), amount: new Num(0, 0), type: 'nuclear-decay', resetId: 'nuclear-decay', style: 'green-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['greenParticles', new Num(1, 30)],
    action: [
      new Action('basedOnUpgrade', 'nuclearDecayGenerators', new Num(1, 0), 'bought', 'nuclear-decay-increaser'),
      new Action('decreaseHoldingIncremental', 'greenSouls', new Num(1, 1), 'bought', 'nuclear-decay-increaser'),
    ], nav: 'green', subNav: 'nuclearDecay'
  },
  {
    name: 'better-nuclear-decay', displayName: 'Better Nuclear Decay', description: 'Increase the nuclear decay effect.', auto: false, noMax: true,
    baseCost: new Num(1,2), cost: new Num(1, 2), increase: new Num(2,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'greenSouls',
    baseBuffer: new Num(1.2, 0), buffer: new Num(1.2, 0), amount: new Num(0, 0), type: 'nuclear-decay', resetId: 'nuclear-decay', style: 'green-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['greenParticles', new Num(1, 30)],
    action: [
      new Action('decreaseHoldingIncremental', 'greenSouls', new Num(5, 1), 'bought', 'better-nuclear-decay'),
    ], limit: new Num(5, 0), nav: 'green', subNav: 'nuclearDecay'
  },
]
