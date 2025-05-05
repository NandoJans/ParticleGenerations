import {Styles} from "../../enums/styles";
import {Holding} from "../holding";
import {Resetable} from "../interfaces/resetable";
import {ResetKey} from "../../enums/reset-key";
import {Enhancable} from "../interfaces/enhancable";
import {Num} from "../../../num";

export abstract class Enhancement implements Resetable {
  abstract style: Styles;
  abstract holding: Holding;
  saveName: string

  constructor(saveName: string) {
    this.saveName = saveName;
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
      if (enhancable.canEnhance()) {
        enhancable.enhance();
      }
    });
  }

  abstract getRequirement(): Num;

  add(enhancable: Enhancable) {
    this.enhancables[enhancable.name] = enhancable;
  }
}

