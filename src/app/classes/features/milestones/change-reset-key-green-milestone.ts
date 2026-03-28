import {GreenMilestone} from "./green-milestone";
import {Resetable} from "../interfaces/resetable";
import {Num} from "../../../num";
import {ResetHelper} from "../../helpers/reset-helper";
import {ResetKey} from "../../enums/reset-key";
import {Automator} from "../automator";

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

        if (resetable instanceof Automator) {
          // Only set completed if automator is completed before, otherwise the player unlocks the automator without ever reaching its goal.
          if (!resetable.firstTimeCompleted) {
            return;
          }
          resetable.completed = true;
          if (resetable.isActive()) {
            resetable.activate()
          }
        }
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
