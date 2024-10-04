import {GameElement} from "./game-element";
import {Num} from "../../num";
import {Styles} from "../enums/styles";
import {Holding} from "./holding";
import {ResetKey} from "../enums/reset-key";

export abstract class Milestone extends GameElement {
  abstract name: string
  abstract displayName: string
  abstract getDescription(): string
  abstract type: string
  abstract style: Styles
  abstract goal: Num
  abstract currency: Holding

  effect: Num | undefined
  buffer: Num = new Num(1, 0)
  baseBuffer: Num = new Num(1, 0)

  abstract action(): Num | undefined

  run(): void {
    if (this.goalReached()) {
      const effect = this.action()
      if (effect) {
        this.effect = effect.copy()
      }
    }
  }

  protected goalReached(): boolean {
    return this.currency.amount.greq(this.goal)
  }

  effectString(): string {
    return this.effect ? this.effect.toString() : ''
  }

  getEffectDisplay(): string {
    return this.effectString()
  }
}
