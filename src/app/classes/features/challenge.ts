import {Num} from "../../num";
import {GameElement} from "./game-element";
import {Holding} from "./holding";
import {ResetKey} from "../enums/reset-key";
import {Styles} from "../enums/styles";

export abstract class Challenge extends GameElement {
  abstract name: string
  abstract displayName: string
  abstract baseGoal: Num
  abstract goal: Num
  abstract currency: Holding
  abstract prestige: ResetKey
  abstract getRewardDescription(): string
  abstract getDescription(): string
  abstract style: Styles
  abstract type: string
  abstract resetId: ResetKey
  instantComplete: boolean = false
  abstract reward(): Num | undefined
  abstract nerfs(): void
  completed: boolean | Num = false
  effect: Num | undefined = undefined
  maxEffect: Num | undefined = undefined
  dynamic: boolean | undefined = undefined
  maxCompletions: Num | undefined = undefined
  goalIncrease: Num | undefined = undefined

  run(): Num | undefined {
    const reward = this.reward();
    if (reward) {
      this.effect = reward;
    }
    return reward;
  }

  effectString(): string {
    return '';
  }

  getEffectDisplay(): string {
    return this.effectString();
  }
}
