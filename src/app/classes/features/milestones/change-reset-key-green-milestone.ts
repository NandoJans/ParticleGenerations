import {GreenMilestone} from "./green-milestone";
import {Resetable} from "../interfaces/resetable";
import {Num} from "../../../num";
import {ResetHelper} from "../../helpers/reset-helper";
import {ResetKey} from "../../enums/reset-key";
import {Automator} from "../automator";

type ResetableProvider = () => Resetable|Resetable[];

export class ChangeResetKeyGreenMilestone extends GreenMilestone {
  private readonly resetableSource: Resetable|Resetable[]|ResetableProvider;
  groupName: string;

  constructor(
    name: string,
    displayName: string,
    goal: Num,
    resetable: Resetable|Resetable[]|ResetableProvider,
    groupName: string
  ) {
    super(name, displayName, goal);
    this.resetableSource = resetable;
    this.groupName = groupName;
  }

  override action(): void {
    const resetable = typeof this.resetableSource === 'function'
      ? this.resetableSource()
      : this.resetableSource;

    if (Array.isArray(resetable)) {
      resetable.forEach(resetable => {
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
      resetable.resetId = ResetHelper.registerReset(ResetKey.GREEN, resetable);
    }
  }

  override getDescription(): string|string[] {
    return "Stop resetting "+this.groupName+" on yellow prestige.";
  }
}
