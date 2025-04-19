import {Challenge} from "../../../globals";
import {Num} from "../../../num";
import {GlobalMultipliersService} from "../../globals/global-multipliers.service";
import {HoldingsService} from "../../holdings.service";
import {AutomatorService} from "../automator.service";

export const yellowChallenges: Challenge[] = [
  {
    name: 'yellow-challenge-1',
    displayName: 'Yellow Challenge 1',
    description: 'Red Particles without the red generator booster.',
    baseGoal: new Num(1, 1100),
    goal: new Num(1, 1100),
    currency: 'redParticles',
    completed: false,
    disabled: false,
    rewardDescription: 'Gain a multiplier to red accelerators based on red generator boosts.',
    style: 'yellow-challenge',
    resetId: 'yellow',
    type: 'yellow-challenges',
    prestige: 'yellow',
    unlocked: false,
    instantComplete: false,
    requirement: ['yellowParticles', new Num(1, 5)],
    reward: (self: Challenge) => {
    },
    nerfs: (self: Challenge) => {
    }
  },
  {
    name: 'yellow-challenge-2',
    displayName: 'Yellow Challenge 2',
    description: 'Red Particles without any red accelerators.',
    baseGoal: new Num(1, 1350),
    goal: new Num(1, 1350),
    currency: 'redParticles',
    completed: false,
    disabled: false,
    rewardDescription: 'Gain an extra red accelerator generator.',
    style: 'yellow-challenge',
    resetId: 'yellow',
    type: 'yellow-challenges',
    prestige: 'yellow',
    unlocked: false,
    instantComplete: false,
    requirement: ['yellowParticles', new Num(1, 8)],
    reward: (self: Challenge) => {
    },
    nerfs: (self: Challenge) => {
      HoldingsService.set('redAccelerators', new Num(1, 0));
    }
  },
  {
    name: 'yellow-challenge-3',
    displayName: 'Yellow Challenge 3',
    description: 'Red Particles while only having red and yellow generators.',
    baseGoal: new Num(1, 1250),
    goal: new Num(1, 1250),
    currency: 'redParticles',
    completed: false,
    disabled: false,
    rewardDescription: 'Yellow generators are multiplied by the amount of fifth red generators.',
    style: 'yellow-challenge',
    resetId: 'yellow',
    type: 'yellow-challenges',
    prestige: 'yellow',
    unlocked: false,
    instantComplete: false,
    requirement: ['yellowParticles', new Num(1, 11)],
    maxEffect: new Num(1, 10),
    reward: (self: Challenge) => {
    },
    nerfs: (self: Challenge) => {
      HoldingsService.set('redAccelerators', new Num(1, 0));
    }
  },
  {
    name: 'yellow-challenge-4',
    displayName: 'Yellow Challenge 4',
    description: 'Red Particles while only having red generators, but red accelerators are insanely powerfull.',
    baseGoal: new Num(1, 1750),
    goal: new Num(1, 1750),
    currency: 'redParticles',
    completed: false,
    disabled: false,
    rewardDescription: 'Red accelerators gain a multiplier based on yellow power.',
    style: 'yellow-challenge',
    resetId: 'yellow',
    type: 'yellow-challenges',
    prestige: 'yellow',
    unlocked: false,
    instantComplete: false,
    requirement: ['yellowParticles', new Num(1, 15)],
    reward: (self: Challenge) => {
      let buff: Num = HoldingsService.get('yellowPower').add(new Num(1, 0), false);
      if (buff.greq(new Num(1, 37500))) {
        // @ts-ignore
        const tempBuff: Num = buff.pow(new Num(1, -1), false);
        tempBuff.mul(new Num(1, 37500));
        buff = tempBuff;
      }
      GlobalMultipliersService.correct('redAcceleratorGenerators', buff)
      return buff;
    },
    nerfs: (self: Challenge) => {
      HoldingsService.set('yellowPower', new Num(0, 0));

      if (!HoldingsService.get('redAccelerators').greq(new Num(1, 0))) {
        HoldingsService.set('redAccelerators', new Num(1, 0));
      }

      if (HoldingsService.get('greens').greq(new Num(1, 0))) {
        GlobalMultipliersService.correct('redAcceleratorGenerators', new Num(1, 1));
      }

      if (!HoldingsService.get('greens').greq(new Num(1, 0)) && !HoldingsService.get('purples').greq(new Num(2, 0))) {
      }
    }
  },
  {
    name: 'yellow-challenge-5',
    displayName: 'Yellow Challenge 5',
    description: 'Red Particles when generators won\'t multiply themselfs.',
    baseGoal: new Num(1, 3000),
    goal: new Num(1, 3000),
    currency: 'redParticles',
    completed: false,
    disabled: false,
    rewardDescription: 'First red generators boost the other generators.',
    style: 'yellow-challenge',
    resetId: 'yellow',
    type: 'yellow-challenges',
    prestige: 'yellow',
    unlocked: false,
    instantComplete: false,
    requirement: ['yellowParticles', new Num(1, 23)],
    reward: (self: Challenge) => {
    },
    nerfs: (self: Challenge) => {
    }
  },
  {
    name: 'yellow-challenge-6',
    displayName: 'Yellow Challenge 6',
    description: 'Red Particles without red generators 2-5.',
    baseGoal: new Num(1, 1150),
    goal: new Num(1, 1150),
    currency: 'redParticles',
    completed: false,
    disabled: false,
    rewardDescription: 'The Accelerator Particles upgrade is a lot more powerfull.',
    style: 'yellow-challenge',
    resetId: 'yellow',
    type: 'yellow-challenges',
    prestige: 'yellow',
    unlocked: false,
    instantComplete: false,
    requirement: ['yellowParticles', new Num(1, 29)],
    reward: (self: Challenge) => {

    },
    nerfs: (self: Challenge) => {
    }
  },
  {
    name: 'yellow-challenge-7',
    displayName: 'Yellow Challenge 7',
    description: 'Red Particles with only generators, accelerators and reduced fusion',
    baseGoal: new Num(1, 15000),
    goal: new Num(1, 15000),
    currency: 'redParticles',
    completed: false,
    disabled: false,
    rewardDescription: 'Gain a multiplier on red generators based on yellow fusion.',
    style: 'yellow-challenge',
    resetId: 'yellow',
    type: 'yellow-challenges',
    prestige: 'yellow',
    unlocked: false,
    instantComplete: false,
    requirement: ['yellowParticles', new Num(1, 70)],
    reward: (self: Challenge) => {
      const buff: Num = HoldingsService.get('yellowFusion').add(new Num(1, 0), false).pow(new Num(5, -1), false);
      GlobalMultipliersService.correct('redAcceleratorGenerators', buff);
      return buff
    },
    nerfs: (self: Challenge) => {
    }
  },
  {
    name: 'yellow-challenge-8',
    displayName: 'Yellow Challenge 8',
    description: 'Red Particles when yellow generators generate second red accelerator generators.',
    baseGoal: new Num(1, 5500),
    goal: new Num(1, 5500),
    currency: 'redParticles',
    completed: false,
    disabled: false,
    rewardDescription: 'Make yellow fusion much more powerfull.',
    style: 'yellow-challenge',
    resetId: 'yellow',
    type: 'yellow-challenges',
    prestige: 'yellow',
    unlocked: false,
    instantComplete: false,
    requirement: ['yellowParticles', new Num(1, 90)],
    reward: (self: Challenge) => {
      HoldingsService.set('yellowFusionPower', new Num(4, -1));
    },
    nerfs: (self: Challenge) => {
    }
  },
]
