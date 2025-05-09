import { Num } from "src/app/num";
import { Challenge } from "../challenge";
import { Enhancement } from "../enhancements/enhancement";
import {Upgrade} from "../upgrade";

export abstract class IncreaseChallengeGoalUpgrade extends Upgrade {
  abstract challenge: Challenge;

  override getDescription(): string {
    return `Increase the goal of ${this.challenge.displayName} by ${this.buffer.toString(2)}x.`;
  }

  action(): Num {
    const effect = this.amount.add(new Num(1, 0));
    if (effect.greq(Num.ONE)) {
      this.challenge.maxCompletions = effect;
    }
    return effect;
  }
  allowedEnhancements: Enhancement[] = [];
  enhancementString(enhancement: Enhancement): string {
      return "";
  }
  canEnhance(): boolean {
      return false;
  }
  enhance(): void {}

  override effectString(): string {
    return this.effect?.toString() ?? "";
  }

  bought: Num = new Num(0, 0);
}
