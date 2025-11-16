import {GreenMilestone} from "./green-milestone";
import {Resetable} from "../interfaces/resetable";
import {Num} from "../../../num";
import {ResetHelper} from "../../helpers/reset-helper";
import {ResetKey} from "../../enums/reset-key";

export class ChangeResetKeyGreenMilestone extends GreenMilestone {
  resetable: Resetable|Resetable[];
  groupName: string;

  constructor(name: string, displayName: string, goal: Num, resetable: Resetable|Resetable[], groupName: string) {
    super(name, displayName, goal);
    this.resetable = resetable;
    this.groupName = groupName;
  }

  override action(): void {
    if (Array.isArray(this.resetable)) {
      this.resetable.forEach(resetable => {
        resetable.softResetId = ResetKey.GREEN;
        resetable.resetId = ResetHelper.registerReset(ResetKey.GREEN, resetable);
      });
      return;
    } else {
      this.resetable.resetId = ResetHelper.registerReset(ResetKey.GREEN, this.resetable);
    }
  }

  override getDescription(): string|string[] {
    return "Stop resetting "+this.groupName+" on yellow prestige.";
  }
}
