import {ChangeResetKeyGreenMilestone} from "./change-reset-key-green-milestone";
import {ChallengeRecord} from "../../records/challenges/challenge-record";
import {Num} from "../../../num";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class InitialGreenMilestone extends ChangeResetKeyGreenMilestone {

  override action() {
    super.action();

    HoldingRecord.redParticles.startAmount = new Num(1, 2);
  }

  override calculationOrder =  1049;

  override tick() {
    MultiplierRecord.yellowPrestigeGain.correct(new Num(1, 1));
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
    description.push("Gain 10x more yellow prestiges");

    return description;
  }
}
