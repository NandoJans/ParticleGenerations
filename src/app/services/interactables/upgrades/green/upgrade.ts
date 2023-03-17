import {Upgrade} from "../../../../globals";
import {Num} from "../../../../num";
import {Action} from "../../../../action";
import {NewAction} from "../../../../NewAction";

export const greenUpgrades: Upgrade[] = [
  {
    name: 'green-particle-multiplier', displayName: 'Multiply particles by 2', description: 'Multiply green particles by 2', auto: false,
    baseCost: new Num(5,0), cost: new Num(5, 0), increase: new Num(1,1), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'greenParticles',
    baseBuffer: new Num(2, 0), buffer: new Num(2, 0), amount: new Num(0, 0), type: 'green-upgrade', resetId: 'green-upgrades-repeatable', style: 'green-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['greens', new Num(1, 1)],
    action: new NewAction('multiply multiplier greenParticlesGain basedon upgrade this pow', new Num(1, 0)), nav: 'green', subNav: 'greenGenerators'
  },
]
