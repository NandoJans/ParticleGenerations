import {Milestone} from "../../../globals";
import {Num} from "../../../num";
import {HoldingsService} from "../../holdings.service";
import {UpgradeService} from "../upgrade.service";

export const yellowMilestones: Milestone[] = [
  {
    name: 'start-with-1000', displayName: 'Start with 1000', description: 'Start yellows with 1000 red particles.', type: 'yellow-milestone', style: 'yellow-style',
    unlocked: false, requirement: ['yellows', new Num(1, 0)], cost: new Num(1, 0), currency: 'yellows', buffer: new Num(1, 0),
    action: (self: Milestone) => {
      HoldingsService.set('redParticlesStart', new Num(1, 3))
    },
  },
  {
    name: 'red-extensions-no-reset', displayName: 'Red extensions keeper', description: 'You keep your red extension upgrades.', type: 'yellow-milestone', style: 'yellow-style',
    unlocked: false, requirement: ['yellows', new Num(1, 0)], cost: new Num(5, 0), currency: 'yellows', buffer: new Num(1, 0),
    action: (self: Milestone) => {
      UpgradeService.setValue('red-generator-extension-upgrade', 'resetId', 'yellow')
    },
  },
  {
    name: 'red-booster-no-reset', displayName: 'Red booster starter', description: 'You start with red boosters unlocked.', type: 'yellow-milestone', style: 'yellow-style',
    unlocked: false, requirement: ['yellows', new Num(1, 0)], cost: new Num(1, 1), currency: 'yellows', buffer: new Num(1, 0),
    action: (self: Milestone) => {
      UpgradeService.setValue('unlock-red-generators-booster', 'resetId', 'yellow')
    },
  },
  {
    name: 'idle-yellow-particles-gain', displayName: 'Idle Yellow Particles', description: 'You generate 50% of your best yellow particles / second.', type: 'yellow-milestone', style: 'yellow-style',
    unlocked: false, requirement: ['yellows', new Num(1, 0)], cost: new Num(2.5, 1), currency: 'yellows', buffer: new Num(1, 0),
    action: (self: Milestone) => { },
  },
  {
    name: 'red-upgrades-no-reset', displayName: 'Red upgrades keeper', description: 'You keep your red upgrades on going yellow.', type: 'yellow-milestone', style: 'yellow-style',
    unlocked: false, requirement: ['yellows', new Num(1, 0)], cost: new Num(5, 1), currency: 'yellows', buffer: new Num(1, 0),
    action: (self: Milestone) => {
      UpgradeService.setValues('red-upgrades', 'resetId', 'yellow')
    },
  },
  {
    name: 'start-with-1e10', displayName: 'Start with 1e10', description: 'Start yellows with 1e10 red particles.', type: 'yellow-milestone', style: 'yellow-style',
    unlocked: false, requirement: ['yellows', new Num(1, 0)], cost: new Num(1, 3), currency: 'yellows', buffer: new Num(1, 0),
    action: (self: Milestone) => {
      HoldingsService.set('redParticlesStart', new Num(1, 10))
    },
  },
  {
    name: 'no-red-extension-reset', displayName: 'Red extension banner', description: 'Red extensions don\'t reset generators.', type: 'yellow-milestone', style: 'yellow-style',
    unlocked: false, requirement: ['yellows', new Num(1, 0)], cost: new Num(5, 3), currency: 'yellows', buffer: new Num(1, 0),
    action: (self: Milestone) => {
      UpgradeService.setValue('red-generator-extension', 'resets', 'none')
    },
  },
]
