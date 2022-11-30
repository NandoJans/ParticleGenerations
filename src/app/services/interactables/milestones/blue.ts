import {Num} from "../../../num";
import {Action} from "../../../action";

export const blueMilestones = [
  {
    name: 'apply-all-milestones-blue', displayName: 'Apply all milestones', description: 'Apply all other milestones for the blue phase.', type: 'blue-milestone', style: 'blue-style',
    unlocked: false, requirement: ['blues', new Num(1, 0)], cost: new Num(1, 0), currency: 'blues', buffer: new Num(1, 0),
    action: new Action('', ''),
  },
  {
    name: 'keep-green-limited-upgrades', displayName: 'Keep green sacrifice', description: 'Keep all green sacrifice upgrades on going blue.', type: 'blue-milestone', style: 'blue-style',
    unlocked: false, requirement: ['blues', new Num(1, 0)], cost: new Num(1, 1), currency: 'blues', buffer: new Num(1, 0),
    action: new Action('amplifyUpgrades', 'green-limited-upgrades', 'blue-limited-upgrades', 'resetId'),
  },
]
