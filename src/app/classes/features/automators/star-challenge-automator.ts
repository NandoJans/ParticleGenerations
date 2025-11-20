import {ResetKey} from "../../enums/reset-key";
import {Styles} from "../../enums/styles";
import {ChallengeAutomator} from "./challenge-automator";
import {Challenge} from "../challenge";
import {ResetHelper} from "../../helpers/reset-helper";
import {Requirement} from "../interfaces/requirement";
import {Num} from "../../../num";
import {ChallengeRecord} from "../../records/challenges/challenge-record";
import {HoldingRecord} from "../../records/holdings/holding-record";

export class StarChallengeAutomator extends ChallengeAutomator {
  resetId: ResetKey;
  style: Styles = Styles.YELLOW;

  constructor(
    saveName: string,
    challenge: Challenge
  ) {
    super(
      saveName,
      challenge,
    );
    this.requirement = [
      new Requirement(HoldingRecord.yellowPrestiges, new Num(1, 3), this),
    ]
    this.resetId = ResetHelper.registerReset(ResetKey.GREEN, this);
  }

  override action() {
    // Check if we are not in a challenge, and we have the requirements to start one.
    if (
      !ChallengeRecord.currentChallenges[this.challenge.prestigeLayer] && (
        (this.challenge.maxCompletions === undefined && !this.challenge.completed) ||
        (this.challenge.maxCompletions instanceof Num && this.challenge.getCompletions().lt(this.challenge.maxCompletions))
      )
    ) {
      console.log('Starting challenge ' + this.challenge.prestigeLayer + ' ' + this.challenge.prestige);
      ResetHelper.reset(this.challenge.prestige)
      this.challenge.start();
      ChallengeRecord.currentChallenges[this.challenge.prestigeLayer] = this.challenge;
    }
    super.action();
  }
}
