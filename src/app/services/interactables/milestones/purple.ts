import {Milestone} from "../../../globals";
import {Num} from "../../../num";
import {UpgradeService} from "../upgrade.service";
import {GlobalMultipliersService} from "../../globals/global-multipliers.service";
import {ChallengeService} from "../challenge.service";
import {HoldingsService} from "../../holdings.service";
import {GeneratorService} from "../generator.service";

export const purpleMilestones: Milestone[] = [
  {
    name: 'quality-of-life-milestone', displayName: 'Quality of Life', description: 'Make some quality of life changes.', type: 'purple-milestone', style: 'purple-style',
    unlocked: false, requirement: ['purples', new Num(1, 0)], cost: new Num(1, 0), currency: 'purples', buffer: new Num(1, 0),
    action: (self: Milestone) => {
      GlobalMultipliersService.correct('redAcceleratorGenerators', new Num(1, 2));
      UpgradeService.setValues('nuclear-decay', 'resetId', 'purple');
    },
  },
  {
    name: 'early-nuclear-decay-unlock', displayName: 'Early Nuclear Decay', description: 'Unlock nuclear decay at 1e10 Green Particles.', type: 'purple-milestone', style: 'purple-style',
    unlocked: false, requirement: ['purples', new Num(1, 0)], cost: new Num(1, 0), currency: 'purples', buffer: new Num(1, 0),
    action: (self: Milestone) => {
      UpgradeService.setValues('nuclear-decay', 'requirement', ['greenParticles', new Num(1, 10)])
      GeneratorService.setValues('nuclear-decay', 'requirement', ['holding', 'greenParticles', new Num(1, 10)])
    },
  },
  {
    name: 'autocomplete-yellow-challenges', displayName: 'Auto Complete Yellow Challenges', description: 'Auto complete yellow challenges.', type: 'purple-milestone', style: 'purple-style',
    unlocked: false, requirement: ['purples', new Num(1, 0)], cost: new Num(3, 0), currency: 'purples', buffer: new Num(1, 0),
    action: (self: Milestone) => {
      const challenges = ChallengeService.getChallenges('yellow-challenges')
      challenges.forEach(challenge => {
        if (HoldingsService.get(challenge.requirement[0]).greq(challenge.requirement[1])) {
          challenge.completed = true;
        }
      })
      return undefined;
    },
  },
  {
    name: 'start-with-1-completion', displayName: '1 Completion Start', description: 'Get 1 completion when reaching the requirement of a blue challenge.', type: 'purple-milestone', style: 'purple-style',
    unlocked: false, requirement: ['purples', new Num(1, 0)], cost: new Num(5, 0), currency: 'purples', buffer: new Num(1, 0),
    action: (self: Milestone) => {
      if (!HoldingsService.get('purples').greq(new Num(1, 1))) return undefined;
      const challenges = ChallengeService.getChallenges('blue-challenges')
      challenges.forEach(challenge => {
        if (HoldingsService.get(challenge.requirement[0]).greq(challenge.requirement[1]) && challenge.completed instanceof Num && !challenge.completed.greq(new Num(1, 0))) {
          challenge.completed = new Num(1, 0);
        }
      })
      return undefined;
    },
  },
  {
    name: 'start-with-2-completion', displayName: '2 Completion Start', description: 'Get 2 completion when reaching the requirement of a blue challenge.', type: 'purple-milestone', style: 'purple-style',
    unlocked: false, requirement: ['purples', new Num(1, 0)], cost: new Num(1, 1), currency: 'purples', buffer: new Num(1, 0),
    action: (self: Milestone) => {
      if (!HoldingsService.get('purples').greq(new Num(1.5, 1))) return undefined;
      const challenges = ChallengeService.getChallenges('blue-challenges')
      challenges.forEach(challenge => {
        if (HoldingsService.get(challenge.requirement[0]).greq(challenge.requirement[1]) && challenge.completed instanceof Num && !challenge.completed.greq(new Num(2, 0))) {
          challenge.completed = new Num(2, 0);
        }
      })
      return undefined;
    },
  },
  {
    name: 'start-with-3-completion', displayName: '3 Completion Start', description: 'Get 3 completion when reaching the requirement of a blue challenge.', type: 'purple-milestone', style: 'purple-style',
    unlocked: false, requirement: ['purples', new Num(1, 0)], cost: new Num(1.5, 1), currency: 'purples', buffer: new Num(1, 0),
    action: (self: Milestone) => {
      if (!HoldingsService.get('purples').greq(new Num(2, 1))) return undefined;
      const challenges = ChallengeService.getChallenges('blue-challenges')
      challenges.forEach(challenge => {
        if (HoldingsService.get(challenge.requirement[0]).greq(challenge.requirement[1]) && challenge.completed instanceof Num && !challenge.completed.greq(new Num(3, 0))) {
          challenge.completed = new Num(3, 0);
        }
      })
      return undefined;
    },
  },
  {
    name: 'start-with-4-completion', displayName: '4 Completion Start', description: 'Get 4 completion when reaching the requirement of a blue challenge.', type: 'purple-milestone', style: 'purple-style',
    unlocked: false, requirement: ['purples', new Num(1, 0)], cost: new Num(2, 1), currency: 'purples', buffer: new Num(1, 0),
    action: (self: Milestone) => {
      if (!HoldingsService.get('purples').greq(new Num(2.5, 1))) return undefined;
      const challenges = ChallengeService.getChallenges('blue-challenges')
      challenges.forEach(challenge => {
        if (HoldingsService.get(challenge.requirement[0]).greq(challenge.requirement[1]) && challenge.completed instanceof Num && !challenge.completed.greq(new Num(4, 0))) {
          challenge.completed = new Num(4, 0);
        }
      })
      return undefined;
    },
  },
  {
    name: 'start-with-5-completion', displayName: '5 Completion Start', description: 'Get 5 completion when reaching the requirement of a blue challenge.', type: 'purple-milestone', style: 'purple-style',
    unlocked: false, requirement: ['purples', new Num(1, 0)], cost: new Num(2.5, 1), currency: 'purples', buffer: new Num(1, 0),
    action: (self: Milestone) => {
      const challenges = ChallengeService.getChallenges('blue-challenges')
      challenges.forEach(challenge => {
        if (HoldingsService.get(challenge.requirement[0]).greq(challenge.requirement[1]) && challenge.completed instanceof Num && !challenge.completed.greq(new Num(5, 0))) {
          challenge.completed = new Num(5, 0);
        }
      })
      return undefined;
    },
  },
]
