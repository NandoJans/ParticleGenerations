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

  private getThresholdKey(level: number): string {
    return `startThreshold_level_${level}`;
  }

  // Returns the minimum Yellow Particles required to start the given level
  getThresholdForLevel(level: number): Num {
    return this.localStorageHelper.loadNum(new Num(0, 0), this.getThresholdKey(level));
  }

  setThresholdForLevel(level: number, value: Num): void {
    this.localStorageHelper.saveNum(value, this.getThresholdKey(level));
  }

  private getNextLevelIndex(): number {
    // Next attempt is current completions + 1
    const current = this.challenge.getCompletions().toNumber();
    return Math.max(1, Math.floor(current) + 1);
  }

  override action() {
    // Check if we are not in a challenge, and we have the requirements to start one.
    if (
      !ChallengeRecord.currentChallenges[this.challenge.prestigeLayer] && (
        (this.challenge.maxCompletions === undefined && !this.challenge.completed) ||
        (this.challenge.maxCompletions instanceof Num && this.challenge.getCompletions().lt(this.challenge.maxCompletions))
      )
    ) {
      // Gate starting by Yellow Particles threshold per level
      const nextLevel = this.getNextLevelIndex();
      const threshold = this.getThresholdForLevel(nextLevel);
      const haveYellow = HoldingRecord.yellowParticles.amount;
      if (!haveYellow.greq(threshold)) {
        // Not enough Yellow Particles to start this level according to user setting
        super.action();
        return;
      }

      // Start the challenge
      ResetHelper.reset(this.challenge.prestige)
      this.challenge.start();
      ChallengeRecord.currentChallenges[this.challenge.prestigeLayer] = this.challenge;
    }
    super.action();
  }
}
