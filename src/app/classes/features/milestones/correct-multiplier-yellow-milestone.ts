import {YellowMilestone} from "./yellow-milestone";
import {Resetable} from "../interfaces/resetable";
import {Num} from "../../../num";
import {ResetHelper} from "../../helpers/reset-helper";
import {ResetKey} from "../../enums/reset-key";

export class CorrectMultiplierYellowMilestone extends YellowMilestone {
  resetable: Resetable;

  constructor(name: string, displayName: string, goal: Num, resetable: Resetable) {
    super(name, displayName, goal);
    this.resetable = resetable;
  }

  override action(): void {
    this.resetable.resetId = ResetHelper.registerReset(ResetKey.YELLOW, this.resetable);
  }

  override getDescription(): string {
    return "Stop resetting "+this.resetable.displayName+" on yellow prestige.";
  }
}
