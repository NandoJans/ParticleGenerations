import {Milestone} from "../../../globals";
import {Num} from "../../../num";
import {Action} from "../../../action";

export const yellowMilestones: Milestone[] = [
  {
    name: 'red-extensions-no-reset', displayName: 'Red extensions keeper', description: 'You keep your red extension upgrades.', type: 'yellow-milestone', style: 'yellow-style',
    unlocked: false, requirement: ['yellows', new Num(1, 0)], cost: new Num(5, 0), currency: 'yellows', buffer: new Num(1, 0),
    action: new Action('amplifyUpgrade', 'red-generator-extension-upgrade', 'yellow-upgrades', 'resetId'),
  },{
    name: 'red-booster-no-reset', displayName: 'Red booster starter', description: 'You start with red boosters unlocked.', type: 'yellow-milestone', style: 'yellow-style',
    unlocked: false, requirement: ['yellows', new Num(1, 0)], cost: new Num(1, 1), currency: 'yellows', buffer: new Num(1, 0),
    action: new Action('amplifyUpgrade', 'red-generator-booster-upgrade', 'yellow-upgrades', 'resetId'),
  },
  {
    name: 'red-upgrades-no-reset', displayName: 'Red upgrades keeper', description: 'You keep your red upgrades on going yellow.', type: 'yellow-milestone', style: 'yellow-style',
    unlocked: false, requirement: ['yellows', new Num(1, 0)], cost: new Num(5, 1), currency: 'yellows', buffer: new Num(1, 0),
    action: new Action('amplifyUpgrades', 'red-upgrades', 'yellow-upgrades', 'resetId'),
  }
]
