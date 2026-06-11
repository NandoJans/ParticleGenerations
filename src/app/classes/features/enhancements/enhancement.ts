import {Styles} from "../../enums/styles";
import {Holding} from "../holding";
import {Resetable} from "../interfaces/resetable";
import {ResetKey} from "../../enums/reset-key";
import {Enhancable} from "../interfaces/enhancable";
import {Num} from "../../../num";

export abstract class Enhancement implements Resetable {
  private static readonly registry = new Map<string, Enhancement>();

  abstract style: Styles;
  saveName: string

  constructor(saveName: string) {
    this.saveName = saveName;
    Enhancement.registry.set(saveName, this);
  }

  static getBySaveName(saveName: unknown): Enhancement | null {
    if (typeof saveName !== 'string') {
      return null;
    }

    return Enhancement.registry.get(saveName) ?? null;
  }

  enhancables: {[key: string]: Enhancable } = {};
  abstract actionMessage: string;

  abstract canEnhance(): boolean;

  abstract name: string;
  abstract displayName: string;
  abstract description: string;
  abstract resetId: ResetKey;
  abstract respecResetKey: ResetKey;
  softResetId: ResetKey = ResetKey.NONE;

  reset(): void {
    Object.values(this.enhancables).forEach((enhancable) => {
      if (enhancable.canEnhance()) {
        enhancable.enhancement = null;
      }
      return false;
    });
    this.enhancables = {};
  }

  softReset(): void {
  }

  abstract getMultiplier(): Num;
  abstract getAddition(): Num;

  run(): void {
    Object.values(this.enhancables).forEach((enhancable) => {
      if (enhancable.canEnhance() && enhancable.unlocked) {
        enhancable.enhance();
      }
    });
  }

  abstract getRequirement(): Num;

  add(enhancable: Enhancable) {
    this.enhancables[enhancable.name] = enhancable;
  }

  abstract getHolding(): Holding;
}

