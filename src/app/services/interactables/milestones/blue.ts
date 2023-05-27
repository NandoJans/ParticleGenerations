import {Num} from "../../../num";
import {Milestone} from "../../../globals";
import {GlobalMultipliersService} from "../../globals/global-multipliers.service";
import {UpgradeService} from "../upgrade.service";
import {HoldingsService} from "../../holdings.service";

export const blueMilestones = [
  {
    name: 'apply-all-milestones-blue', displayName: 'Apply all milestones', description: 'Apply all other milestones for the blue phase.', type: 'blue-milestone', style: 'blue-style',
    unlocked: false, requirement: ['blues', new Num(1, 0)], cost: new Num(1, 0), currency: 'blues', buffer: new Num(1, 0),
    action: (self: Milestone) => {
      UpgradeService.setValues('red-upgrades', 'resetId', 'blue')
      UpgradeService.setValues('yellow-upgrades', 'resetId', 'blue')
    },
  },
  {
    name: 'yellow-gain-increaser', displayName: 'Increase yellow gain', description: 'Increase the yellows gained on yellow by x100.', type: 'blue-milestone', style: 'blue-style',
    unlocked: false, requirement: ['blues', new Num(1, 0)], cost: new Num(2, 0), currency: 'blues', buffer: new Num(1, 2),
    action: (self: Milestone) => {
      GlobalMultipliersService.set('yellowsGain', self.buffer)
    },
  },
  {
    name: 'green-gain-increaser', displayName: 'Increase green gain', description: 'Increase the greens gained on green by x10.', type: 'blue-milestone', style: 'blue-style',
    unlocked: false, requirement: ['blues', new Num(1, 0)], cost: new Num(3, 0), currency: 'blues', buffer: new Num(1, 1),
    action: (self: Milestone) => {
      GlobalMultipliersService.set('greensGain', self.buffer)
    },
  },
  {
    name: 'keep-green-limited-upgrades', displayName: 'Keep green sacrifice', description: 'Keep all green sacrifice upgrades on going blue.', type: 'blue-milestone', style: 'blue-style',
    unlocked: false, requirement: ['blues', new Num(1, 0)], cost: new Num(1, 1), currency: 'blues', buffer: new Num(1, 0),
    action: (self: Milestone) => {
      UpgradeService.setValues('green-limited-upgrades', 'resetId', 'blue');
    },
  },
  {
    name: 'idle-blue-particles-gain', displayName: 'Idle blue Particles', description: 'You generate 50% of your best blue particles / second.', type: 'blue-milestone', style: 'blue-style',
    unlocked: false, requirement: ['blues', new Num(1, 0)], cost: new Num(2.5, 1), currency: 'blues', buffer: new Num(1, 0),
    action: (self: Milestone) => {},
  },
  {
    name: 'gain-dark-power-idle', displayName: 'Idle Dark Power', description: 'Gain dark power without having to go dark aging.', type: 'blue-milestone', style: 'blue-style',
    unlocked: false, requirement: ['blues', new Num(1, 0)], cost: new Num(1, 2), currency: 'blues', buffer: new Num(1, 0),
    action: (self: Milestone) => {},
  },
  {
    name: 'free-green-souls', displayName: 'Free green souls', description: 'Gain 4000 free green souls.', type: 'blue-milestone', style: 'blue-style',
    unlocked: false, requirement: ['blues', new Num(1, 0)], cost: new Num(1.5, 2), currency: 'blues', buffer: new Num(4, 3),
    action: (self: Milestone) => {
      HoldingsService.add('greenSouls', self.buffer)
    },
  },
  {
    name: 'keep-nuclear-decay', displayName: 'Nuclear Decay Keeper', description: 'Keep nuclear decay upgrades on going blue.', type: 'blue-milestone', style: 'blue-style',
    unlocked: false, requirement: ['blues', new Num(1, 0)], cost: new Num(2, 2), currency: 'blues', buffer: new Num(1, 0),
    action: (self: Milestone) => {},
  },
  {
    name: 'yellow-fusion-start-boost', displayName: '25% Yellow Fusion?', description: 'Only lose 25% of yellow fusion on going blue.', type: 'blue-milestone', style: 'blue-style',
    unlocked: false, requirement: ['blues', new Num(1, 0)], cost: new Num(3, 2), currency: 'blues', buffer: new Num(1, 0),
    action: (self: Milestone) => {},
  }
]
