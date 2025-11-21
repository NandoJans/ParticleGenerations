import {Styles} from "../../enums/styles";
import {Buyable} from "../buyable";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Automator} from "../automator";
import {ChallengeRecord} from "../../records/challenges/challenge-record";

export class IncreaseChallengeGoalUpgradesAutomator extends Automator {
  name: string = "increase-challenge-goal-upgrades-automator";
  displayName: string = "Increase Challenge Goal Upgrades Automator";
  style: Styles = Styles.GREEN;
  buyables(): Buyable[] {
    return [
      UpgradeRecord.increaseProximaCentauriGoal,
      UpgradeRecord.increaseLalandeGoal,
      UpgradeRecord.increaseSunGoal,
      UpgradeRecord.increaseSiriusGoal
    ];
  }
  goal: Num = new Num(4, 0);
  goalString: string = "Complete 4 star challenges";
  task(): Num {
    let totalCompletions = new Num(0, 0);
    const challenges = [
      ChallengeRecord.proximaCentauriStar,
      ChallengeRecord.lalandeStar,
      ChallengeRecord.sunStar,
      ChallengeRecord.siriusStar
    ];
    
    challenges.forEach(challenge => {
      if (challenge.completed instanceof Num) {
        totalCompletions = totalCompletions.add(challenge.completed);
      } else if (challenge.completed === true) {
        totalCompletions = totalCompletions.add(new Num(1, 0));
      }
    });
    
    return totalCompletions;
  }
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.GREEN, this);
  override requirement: Requirement[] = [
    new Requirement(HoldingRecord.yellowParticles, new Num(1, 10), this),
  ];
}
