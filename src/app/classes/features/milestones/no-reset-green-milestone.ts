import {GreenMilestone} from "./green-milestone";
import {Num} from "../../../num";
import {Buyable} from "../buyable";
import {ResetKey} from "../../enums/reset-key";

type BuyableProvider = () => Buyable|Buyable[];

export class NoResetGreenMilestone extends GreenMilestone {
  private readonly resetterSource: Buyable|Buyable[]|BuyableProvider;
  groupName: string;
  noMax?: boolean = false;

  constructor(
    name: string,
    displayName: string,
    goal: Num,
    resetter: Buyable|Buyable[]|BuyableProvider,
    groupName: string,
    noMax?: boolean
  ) {
    super(name, displayName, goal);
    this.resetterSource = resetter;
    this.groupName = groupName;
    this.noMax = noMax;
  }

  override action(): void {
    const resetter = typeof this.resetterSource === 'function'
      ? this.resetterSource()
      : this.resetterSource;

    if (Array.isArray(resetter)) {
      resetter.forEach(resetter => {
        resetter.resets = ResetKey.NONE;
        if (this.noMax !== undefined) {
          resetter.noMax = this.noMax;
        }
      });
    } else {
      resetter.resets = ResetKey.NONE;
      if (this.noMax !== undefined) {
        resetter.noMax = this.noMax;
      }
    }
  }

  override getDescription(): string|string[] {
    return this.groupName+" does not reset anything anymore.";
  }
}
