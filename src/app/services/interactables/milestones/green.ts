import {Milestone} from "../../../globals";
import {Num} from "../../../num";
import {Action} from "../../../action";

export const greenMilestones: Milestone[] = [
  {
    name: 'autobuyers-no-reset', displayName: 'Keep automators', description: 'Keep automators on reset.', type: 'green-milestone', style: 'green-style',
    unlocked: false, requirement: ['greens', new Num(1, 0)], cost: new Num(1, 0), currency: 'greens', buffer: new Num(1, 0),
    action: new Action('amplifyAutomators', 'red-automators', 'yellow-automators', 'resetId'),
  },
  {
    name: 'red-upgrades-no-reset', displayName: 'Keep red upgrades', description: 'Keep red upgrades on reset.', type: 'green-milestone', style: 'green-style',
    unlocked: false, requirement: ['greens', new Num(1, 0)], cost: new Num(2, 0), currency: 'greens', buffer: new Num(1, 0),
    action: new Action('amplifyUpgrades', 'red-upgrades', 'green-upgrades', 'resetId'),
  },
  {
    name: 'fusion-buffer-milestone', displayName: 'Buff yellow fusion', description: 'Give fusion a base speed that is 5x faster.', type: 'green-milestone', style: 'green-style',
    unlocked: false, requirement: ['greens', new Num(1, 0)], cost: new Num(3, 0), currency: 'greens', buffer: new Num(1, 0),
    action: new Action('globalMultiplier', 'yellowFusion', new Num(5, 0)),
  },
  {
    name: 'accelerator-start-increase', displayName: 'Increase accelerator start', description: 'Red accelerators now start at 1e10.', type: 'green-milestone', style: 'green-style',
    unlocked: false, requirement: ['greens', new Num(1, 0)], cost: new Num(4, 0), currency: 'greens', buffer: new Num(1, 0),
    action: new Action('setHolding', 'redAcceleratorsStart', new Num(1, 10)),
  },
  {
    name: 'keep-yellow-upgrades', displayName: 'Keep yellow upgrades', description: 'You keep your yellow upgrades on going green.', type: 'green-milestone', style: 'green-style',
    unlocked: false, requirement: ['greens', new Num(1, 0)], cost: new Num(5, 0), currency: 'greens', buffer: new Num(1, 0),
    action: new Action('amplifyUpgrades', 'yellow-upgrades', 'green-upgrades', 'resetId'),
  },
  {
    name: 'auto-complete-yellow-challenges', displayName: 'Yellow Challenges dodger', description: 'Complete yellow challenges as soon as you would unlock them.', type: 'green-milestone', style: 'green-style',
    unlocked: false, requirement: ['greens', new Num(1, 0)], cost: new Num(1, 1), currency: 'greens', buffer: new Num(1, 0),
    action: new Action('', 'redAcceleratorsStart', new Num(1, 10)),
  },
  {
    name: 'yellow-fusion-keeper', displayName: 'Yellow Fusion Starter', description: 'Start greens with fusion unlocked.', type: 'green-milestone', style: 'green-style',
    unlocked: false, requirement: ['greens', new Num(1, 0)], cost: new Num(2, 1), currency: 'greens', buffer: new Num(1, 0),
    action: new Action('amplifyUpgrades', 'yellow-fusion', 'green-fusion', 'resetId'),
  },
  {
    name: 'idle-green-particles-gain', displayName: 'Idle Green Particles', description: 'You generate 50% of your best green particles / second.', type: 'green-milestone', style: 'green-style',
    unlocked: false, requirement: ['greens', new Num(1, 0)], cost: new Num(2.5, 1), currency: 'greens', buffer: new Num(1, 0),
    action: new Action('', ''),
  },
  {
    name: 'divide-yellow-fusion', displayName: 'Divide Yellow Fusion', description: 'Divide yellow fusion on going yellow.', type: 'green-milestone', style: 'green-style',
    unlocked: false, requirement: ['greens', new Num(1, 0)], cost: new Num(1, 3), currency: 'greens', buffer: new Num(1, 0),
    action: new Action('', ''),
  },
]
