import {Num} from "../../../../num";
import {NewAction} from "../../../../NewAction";

export const yellowFusionUpgrades = [
  {
    name: 'unlock-yellow-fusion', displayName: 'Unlock Yellow Fusion', description: 'Start yellow fusion to boost yellow generators.', auto: false,
    baseCost: new Num(1,32), cost: new Num(1, 32), increase: new Num(1,1), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'yellowParticles',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'yellow-fusion', resetId: 'yellow-fusion', style: 'fusion-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['yellowParticles', new Num(1, 32)],
    action: new NewAction('set generator yellow-fusion-generator amount to', new Num(1, 0)), nav: 'yellow', subNav: 'yellowFusion'
  },
  {
    name: 'accelerate-yellow-fusion', displayName: 'Better condition', description: 'Make better conditions to accelerate fusion.', auto: false,
    baseCost: new Num(1,32), cost: new Num(1, 32), increase: new Num(1,1), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'yellowParticles',
    baseBuffer: new Num(1.1, 0), buffer: new Num(1.1, 0), amount: new Num(0, 0), type: 'yellow-fusion', resetId: 'yellow-fusion', style: 'fusion-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['yellowParticles', new Num(1, 32)],
    action: new NewAction('multiply multiplier yellowFusion basedon upgrade this pow', new Num(1, 0)), limit: new Num(4, 1), nav: 'yellow', subNav: 'yellowFusion'
  },
  {
    name: 'increase-yellow-fusion', displayName: 'Increase fusion rate', description: 'Increases the fusion rate to fuse more at the same time.', auto: false,
    baseCost: new Num(1,32), cost: new Num(1, 32), increase: new Num(1,2), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'yellowParticles',
    baseBuffer: new Num(1.2, 0), buffer: new Num(1.2, 0), amount: new Num(0, 0), type: 'yellow-fusion', resetId: 'yellow-fusion', style: 'fusion-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['yellowParticles', new Num(1, 32)],
    action: new NewAction('multiply multiplier yellowFusion basedon upgrade this pow', new Num(1, 0)), limit: new Num(2, 1), nav: 'yellow', subNav: 'yellowFusion'
  },
]
