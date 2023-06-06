import {Milestone} from "../../../globals";
import {Num} from "../../../num";
import {UpgradeService} from "../upgrade.service";
import {GlobalMultipliersService} from "../../globals/global-multipliers.service";

export const purpleMilestones: Milestone[] = [
  {
    name: 'quality-of-life-milestone', displayName: 'Quality of Life', description: 'Make some quality of life changes.', type: 'purple-milestone', style: 'purple-style',
    unlocked: false, requirement: ['purples', new Num(1, 0)], cost: new Num(1, 0), currency: 'purples', buffer: new Num(1, 0),
    action: (self: Milestone) => {
      GlobalMultipliersService.correct('redAcceleratorGenerators', new Num(1, 2));
    },
  },
]
