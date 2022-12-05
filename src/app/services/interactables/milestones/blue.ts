import {Num} from "../../../num";
import {Action} from "../../../action";

export const blueMilestones = [
  {
    name: 'apply-all-milestones-blue', displayName: 'Apply all milestones', description: 'Apply all other milestones for the blue phase.', type: 'blue-milestone', style: 'blue-style',
    unlocked: false, requirement: ['blues', new Num(1, 0)], cost: new Num(1, 0), currency: 'blues', buffer: new Num(1, 0),
    action: new Action('', ''),
  },
  {
    name: 'yellow-gain-increaser', displayName: 'Increase yellow gain', description: 'Increase the yellows gained on yellow by x100.', type: 'blue-milestone', style: 'blue-style',
    unlocked: false, requirement: ['blues', new Num(1, 0)], cost: new Num(2, 0), currency: 'blues', buffer: new Num(1, 0),
    action: new Action('globalMultiplier', 'yellowsGain', new Num(1, 2)),
  },
  {
    name: 'green-gain-increaser', displayName: 'Increase green gain', description: 'Increase the greens gained on green by x10.', type: 'blue-milestone', style: 'blue-style',
    unlocked: false, requirement: ['blues', new Num(1, 0)], cost: new Num(3, 0), currency: 'blues', buffer: new Num(1, 0),
    action: new Action('globalMultiplier', 'greensGain', new Num(1, 1)),
  },
  {
    name: 'keep-green-limited-upgrades', displayName: 'Keep green sacrifice', description: 'Keep all green sacrifice upgrades on going blue.', type: 'blue-milestone', style: 'blue-style',
    unlocked: false, requirement: ['blues', new Num(1, 0)], cost: new Num(1, 1), currency: 'blues', buffer: new Num(1, 0),
    action: new Action('amplifyUpgrades', 'green-limited-upgrades', 'blue-limited-upgrades', 'resetId'),
  },
]
