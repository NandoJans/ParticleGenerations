import {Num} from "../../num";
import {Buyable} from "./buyable";
import {Requirement} from "./interfaces/requirement";
import {ResetKey} from "../enums/reset-key";
import {Styles} from "../enums/styles";
import {Require} from "./interfaces/require";

export abstract class Upgrade extends Buyable implements Require {
  abstract name: string
  abstract displayName: string
  abstract getDescription(): string
  baseBuffer: Num = new Num(1, 0)
  buffer: Num = new Num(1, 0)
  amount: Num = new Num(0, 0)
  abstract type: string
  abstract resetId: string
  abstract style: Styles
  abstract action(): Num | undefined;
  abstract nav: string
  abstract subNav: string
  effect: Num | undefined = undefined
  maxEffect: Num | undefined = undefined

  run(): Num | undefined {
    const effect = this.action();
    if (effect) {
      this.effect = effect;
    }
    return effect;
  }

  effectString(): string {
    return "";
  }

  getEffectDisplay(): string {
    return this.effectString();
  }

  requirementSatisfied(amount: Num): boolean {
    return this.amount.greq(amount);
  }
}
