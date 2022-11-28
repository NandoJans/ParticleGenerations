import {Num} from "../../../num";
import {Action} from "../../../action";

export const blueMilestones = [
  {
    name: 'keep-all-autobuyers', displayName: 'Keep all automators', description: 'Keep all automators on reset.', type: 'blue-milestone', style: 'blue-style',
    unlocked: false, requirement: ['blues', new Num(1, 0)], cost: new Num(1, 0), currency: 'blues', buffer: new Num(1, 0),
    action: new Action('amplifyAutomators', 'green-automators', 'blue-automators', 'resetId'),
  },
]
