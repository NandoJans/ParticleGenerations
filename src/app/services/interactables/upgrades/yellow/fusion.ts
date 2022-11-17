import {Num} from "../../../../num";
import {Action} from "../../../../action";

export const yellowFusionUpgrades = [
  {
    name: 'unlock-yellow-fusion', displayName: 'Unlock Yellow Fusion', description: 'Start yellow fusion to boost yellow generators.', auto: false,
    baseCost: new Num(1,32), cost: new Num(1, 32), increase: new Num(1,1), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'yellowParticles',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'yellow-fusion', resetId: 'yellow-fusion', style: 'fusion-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['yellows', new Num(5, 1)],
    action: new Action('amplifyGenerator', 'yellow-fusion-generator', new Num(1, 0), 'amount')
  },
  {
    name: 'accelerate-yellow-fusion', displayName: 'Better condition', description: 'Make better conditions to accelerate fusion.', auto: false,
    baseCost: new Num(1,32), cost: new Num(1, 32), increase: new Num(1,1), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'yellowParticles',
    baseBuffer: new Num(1.1, 0), buffer: new Num(1.1, 0), amount: new Num(0, 0), type: 'yellow-fusion', resetId: 'yellow-fusion', style: 'fusion-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['yellows', new Num(5, 1)],
    action: new Action('basedOnUpgrade', 'yellowFusion', new Num(1, 0), 'bought', 'accelerate-yellow-fusion'), limit: new Num(4, 1)
  },
  {
    name: 'increase-yellow-fusion', displayName: 'Increase fusion rate', description: 'Increases the fusion rate to fuse more at the same time.', auto: false,
    baseCost: new Num(1,32), cost: new Num(1, 32), increase: new Num(1,2), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'yellowParticles',
    baseBuffer: new Num(1.2, 0), buffer: new Num(1.2, 0), amount: new Num(0, 0), type: 'yellow-fusion', resetId: 'yellow-fusion', style: 'fusion-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['yellows', new Num(5, 1)],
    action: new Action('basedOnUpgrade', 'yellowFusion', new Num(1, 0), 'bought', 'increase-yellow-fusion'), limit: new Num(2, 1)
  },
]
