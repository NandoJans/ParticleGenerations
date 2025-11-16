import {ResetKey} from "../../enums/reset-key";
import {Styles} from "../../enums/styles";
import {ChallengeAutomator} from "./challenge-automator";
import {Challenge} from "../challenge";
import {ResetHelper} from "../../helpers/reset-helper";
import {Requirement} from "../interfaces/requirement";
import {Num} from "../../../num";

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
      new Requirement(challenge, new Num(1, 0), this),
    ]
    this.resetId = ResetHelper.registerReset(ResetKey.GREEN, this);
  }

  override action() {
    super.action();
  }
}
