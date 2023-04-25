import {Num} from "../../../num";
import {Action} from "../../../action";
import {NewAction} from "../../../NewAction";

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
  {
    name: 'idle-blue-particles-gain', displayName: 'Idle blue Particles', description: 'You generate 50% of your best blue particles / second.', type: 'blue-milestone', style: 'blue-style',
    unlocked: false, requirement: ['blues', new Num(1, 0)], cost: new Num(2.5, 1), currency: 'blues', buffer: new Num(1, 0),
    action: new Action('', ''),
  },
  {
    name: 'gain-dark-power-idle', displayName: 'Idle Dark Power', description: 'Gain dark power without having to go dark aging.', type: 'blue-milestone', style: 'blue-style',
    unlocked: false, requirement: ['blues', new Num(1, 0)], cost: new Num(1, 2), currency: 'blues', buffer: new Num(1, 0),
    action: new Action('', ''),
  },
  {
    name: 'free-green-souls', displayName: 'Free green souls', description: 'Gain 4000 free green souls.', type: 'blue-milestone', style: 'blue-style',
    unlocked: false, requirement: ['blues', new Num(1, 0)], cost: new Num(1.5, 2), currency: 'blues', buffer: new Num(1, 0),
    action: new NewAction('increase holding greenSouls by', new Num(4, 3)),
  },
  {
    name: 'keep-nuclear-decay', displayName: 'Nuclear Decay Keeper', description: 'Keep nuclear decay upgrades on going blue.', type: 'blue-milestone', style: 'blue-style',
    unlocked: false, requirement: ['blues', new Num(1, 0)], cost: new Num(2, 2), currency: 'blues', buffer: new Num(1, 0),
    action: new Action('', ''),
  },
  {
    name: 'yellow-fusion-start-boost', displayName: '1e50000 Yellow Fusion?', description: 'Start blues with 1e50000 yellow fusion.', type: 'blue-milestone', style: 'blue-style',
    unlocked: false, requirement: ['blues', new Num(1, 0)], cost: new Num(3, 2), currency: 'blues', buffer: new Num(1, 0),
    action: new Action('', ''),
  }
]
