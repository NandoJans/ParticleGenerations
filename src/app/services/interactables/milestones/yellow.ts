import {Milestone} from "../../../globals";
import {Num} from "../../../num";
import {Action} from "../../../action";

export const yellowMilestones: Milestone[] = [
  {
    name: 'red-upgrades-no-reset', displayName: 'Red upgrades keeper', description: 'You keep your red upgrades on going yellow.', type: 'yellow-milestone', style: 'yellow-style',
    unlocked: false, requirement: ['yellows', new Num(1, 0)], cost: new Num(1, 2), currency: 'yellows', buffer: new Num(1, 0),
    action: new Action('amplifyUpgrades', 'red-upgrades', 'yellow-upgrades', 'resetId'),
  }
]
