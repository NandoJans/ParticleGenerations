import {Num} from "../../../../num";
import {Action} from "../../../../action";
import {Upgrade} from "../../../../globals";
import {NewAction} from "../../../../NewAction";


export const nuclearDecayUpgrades: Upgrade[] = [
  {
    name: 'nuclear-decay-booster', displayName: 'Nuclear Boosting', description: 'Increases the buy multiplier of the nuclear decay generators and the Increase Multiplier upgrade.', auto: false, noMax: true,
    baseCost: new Num(1.5,2), cost: new Num(2, 2), increase: new Num(2,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'greenSouls',
    baseBuffer: new Num(2, 0), buffer: new Num(2, 0), amount: new Num(0, 0), type: 'nuclear-decay', resetId: 'nuclear-decay', style: 'green-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['greenParticles', new Num(1, 35)],
    action: [
      new NewAction('multiply generator nuclear-decay-generator-1 baseMulMod basedon upgrade this pow', new Num(1, 0)),
      new NewAction('multiply generator nuclear-decay-generator-2 baseMulMod basedon upgrade this pow', new Num(1, 0)),
      new NewAction('multiply generator nuclear-decay-generator-3 baseMulMod basedon upgrade this pow', new Num(1, 0)),
      new NewAction('multiply upgrade nuclear-decay-increaser buffer basedon upgrade this pow', new Num(1, 0)),
      new NewAction('decrease holding greenSouls basedon upgrade nuclear-decay-booster bought incremental', new Num(2, 0)),
    ], limit: new Num(2, 0), nav: 'green', subNav: 'nuclearDecay'
  },
  {
    name: 'nuclear-decay-increaser', displayName: 'Increase Multiplier', description: 'Increases the multiplier of the nuclear decay generator by 5x.', auto: false, noMax: true,
    baseCost: new Num(1,1), cost: new Num(1, 1), increase: new Num(2,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'greenSouls',
    baseBuffer: new Num(5, 0), buffer: new Num(5, 0), amount: new Num(0, 0), type: 'nuclear-decay', resetId: 'nuclear-decay', style: 'green-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['greenParticles', new Num(1, 35)],
    action: [
      new NewAction('multiply multiplier nuclearDecayGenerators basedon upgrade this pow', new Num(1, 0)),
      new NewAction('decrease holding greenSouls basedon upgrade nuclear-decay-increaser bought incremental', new Num(2, 0)),
    ], limit: new Num(5, 0), nav: 'green', subNav: 'nuclearDecay'
  },
  {
    name: 'better-nuclear-decay', displayName: 'Better Nuclear Decay', description: 'Increase the nuclear decay effect.', auto: false, noMax: true,
    baseCost: new Num(7.5,1), cost: new Num(1, 2), increase: new Num(2,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'greenSouls',
    baseBuffer: new Num(1.25, 0), buffer: new Num(1.25, 0), amount: new Num(0, 0), type: 'nuclear-decay', resetId: 'nuclear-decay', style: 'green-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['greenParticles', new Num(1, 35)],
    action: [
      new NewAction('multiply multiplier nuclearDecayPower basedon upgrade this pow', new Num(1, 0)),
      new NewAction('decrease holding greenSouls basedon upgrade better-nuclear-decay bought incremental', new Num(2, 0)),
    ], limit: new Num(3, 0), nav: 'green', subNav: 'nuclearDecay'
  }
]
