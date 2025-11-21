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
  style: Styles = Styles.YELLOW;
  buyables(): Buyable[] {
    return [
      UpgradeRecord.increaseProximaCentauriGoal,
      UpgradeRecord.increaseLalandeGoal,
      UpgradeRecord.increaseSunGoal,
      UpgradeRecord.increaseSiriusGoal
    ];
  }
  goal: Num = new Num(1, 1000000);
  goalString: string = "Reach 1e1,000,000 Red Particles in Lalande Challenge";
  task(): Num {
    if (ChallengeRecord.currentChallenges['yellow'] === ChallengeRecord.lalandeStar) {
      return HoldingRecord.redParticles.amount;
    }
    return new Num(0, 0);
  }
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.YELLOW, this);
  override requirement: Requirement[] = [
    new Requirement(HoldingRecord.yellowParticles, new Num(1, 10), this),
  ];
}
