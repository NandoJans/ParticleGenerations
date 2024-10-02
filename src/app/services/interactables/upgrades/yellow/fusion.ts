import {Num} from "../../../../num";
import {Upgrade} from "../../../../globals";
import {GeneratorService} from "../../generator.service";
import {GlobalMultipliersService} from "../../../globals/global-multipliers.service";

export const yellowFusionUpgrades = [
  {
    name: 'unlock-yellow-fusion',
    displayName: 'Unlock Yellow Fusion',
    description: 'Start yellow fusion to boost yellow generators.',
    auto: false,
    baseCost: new Num(1, 32),
    cost: new Num(1, 32),
    increase: new Num(1, 1),
    scaling: new Num(1, 0),
    bought: new Num(0, 0),
    currency: 'yellowParticles',
    baseBuffer: new Num(1, 0),
    buffer: new Num(1, 0),
    amount: new Num(0, 0),
    type: 'yellow-fusion',
    resetId: 'yellow',
    style: 'fusion-style',
    unlocked: false,
    oneTime: true,
    resets: 'none',
    requirement: ['yellowParticles', new Num(1, 32)],
    action: (self: Upgrade) => {
      GeneratorService.setValue('yellow-fusion-generator', 'amount', new Num(1, 0))
    },
    nav: 'yellow',
    subNav: 'yellowFusion'
  },
  {
    name: 'accelerate-yellow-fusion',
    displayName: 'Better condition',
    description: 'Make better conditions to accelerate fusion.',
    auto: false,
    baseCost: new Num(1, 32),
    cost: new Num(1, 32),
    increase: new Num(1, 1),
    scaling: new Num(1, 0),
    bought: new Num(0, 0),
    currency: 'yellowParticles',
    baseBuffer: new Num(1.1, 0),
    buffer: new Num(1.1, 0),
    amount: new Num(0, 0),
    type: 'yellow-fusion',
    resetId: 'yellow',
    style: 'fusion-style',
    unlocked: false,
    oneTime: false,
    resets: 'none',
    requirement: ['yellowParticles', new Num(1, 32)],
    action: (self: Upgrade) => {
      const buff: Num | undefined = self.buffer.pow(self.amount, false);
      GlobalMultipliersService.correct('yellowFusion', buff);
      return buff
    },
    limit: new Num(4, 1),
    nav: 'yellow',
    subNav: 'yellowFusion'
  },
  {
    name: 'increase-yellow-fusion',
    displayName: 'Increase fusion rate',
    description: 'Increases the fusion rate to fuse more at the same time.',
    auto: false,
    baseCost: new Num(1, 32),
    cost: new Num(1, 32),
    increase: new Num(1, 2),
    scaling: new Num(1, 0),
    bought: new Num(0, 0),
    currency: 'yellowParticles',
    baseBuffer: new Num(1.2, 0),
    buffer: new Num(1.2, 0),
    amount: new Num(0, 0),
    type: 'yellow-fusion',
    resetId: 'yellow',
    style: 'fusion-style',
    unlocked: false,
    oneTime: false,
    resets: 'none',
    requirement: ['yellowParticles', new Num(1, 32)],
    action: (self: Upgrade) => {
      const buff: Num | undefined = self.buffer.pow(self.amount, false);
      GlobalMultipliersService.correct('yellowFusion', buff);
      return buff
    },
    limit: new Num(2, 1),
    nav: 'yellow',
    subNav: 'yellowFusion'
  },
]
