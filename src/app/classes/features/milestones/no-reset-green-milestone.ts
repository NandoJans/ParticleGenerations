import {GreenMilestone} from "./green-milestone";
import {Num} from "../../../num";
import {Buyable} from "../buyable";
import {ResetKey} from "../../enums/reset-key";

export class NoResetGreenMilestone extends GreenMilestone {
  resetter: Buyable|Buyable[];
  groupName: string;
  noMax?: boolean = false;

  constructor(name: string, displayName: string, goal: Num, resetter: Buyable|Buyable[], groupName: string, noMax?: boolean) {
    super(name, displayName, goal);
    this.resetter = resetter;
    this.groupName = groupName;
    this.noMax = noMax;
  }

  override action(): void {
    if (Array.isArray(this.resetter)) {
      this.resetter.forEach(resetter => {
        resetter.resets = ResetKey.NONE;
        if (this.noMax !== undefined) {
          resetter.noMax = this.noMax;
        }
      });
    } else {
      this.resetter.resets = ResetKey.NONE;
      if (this.noMax !== undefined) {
        this.resetter.noMax = this.noMax;
      }
    }
  }

  override getDescription(): string|string[] {
    return this.groupName+" does not reset anything anymore.";
  }
}
