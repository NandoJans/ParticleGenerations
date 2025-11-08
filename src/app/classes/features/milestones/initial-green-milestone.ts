import {ChangeResetKeyGreenMilestone} from "./change-reset-key-green-milestone";
import {ChallengeRecord} from "../../records/challenges/challenge-record";
import {Num} from "../../../num";

export class InitialGreenMilestone extends ChangeResetKeyGreenMilestone {

  override tick() {
    const currentYellowChallenge = ChallengeRecord.currentChallenges['yellow'];
    if (currentYellowChallenge) {
      for (const gen of currentYellowChallenge.getGenerators()) {
        gen.amount = new Num(1, 1);
      }
    }
  }

  override getDescription(): string[] {
    const superDescription = super.getDescription();
    let description: string[] = (typeof superDescription === 'string') ? [superDescription] : superDescription;

    description.push("Star challenge holdings are generated 10x faster");

    return description;
  }
}
