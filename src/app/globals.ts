import {Num} from "./num";

export interface Milestone {
  name: string,
  displayName: string,
  description: string,
  style: string,
  type: string,
  unlocked: boolean,
  requirement: any[],
  cost: Num,
  currency: string,
  buffer: Num,
  action: Function
}

export interface Challenge {
  name: string,
  displayName: string,
  description: string,
  baseGoal: Num,
  goal: Num,
  currency: string,
  prestige: string,
  rewardDescription: string,
  style: string,
  type: string,
  resetId: string,
  unlocked: boolean,
  instantComplete: boolean,
  disabled: boolean,
  requirement: any[],
  reward: Function,
  nerfs: Function,
  dynamic?: boolean,
  completed: boolean | Num,
  maxCompletions?: Num,
  goalIncrease?: Num,
  effect?: Num,
  maxEffect?: Num
}
