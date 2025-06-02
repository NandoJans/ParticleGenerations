import {IncreaseChallengeGoalUpgrade} from "./increase-challenge-goal-upgrade";
import {Challenge} from "../challenge";
import {ChallengeRecord} from "../../records/challenges/challenge-record";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {Styles} from "../../enums/styles";
import {Num} from "../../../num";
import {Holding} from "../holding";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Requirement} from "../interfaces/requirement";

export class IncreaseSunGoalUpgrade extends IncreaseChallengeGoalUpgrade {
  challenge: Challenge = ChallengeRecord.sunStar;
  name: string = 'increase-sun-goal-upgrade';
  displayName: string = 'Increase Sun Goal';
  type: string = 'increase-sun-goal-upgrade';
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.YELLOW, this);
  style: Styles = Styles.SUN;
  nav: string = 'yellow';
  subNav: string = 'yellowFusion';
  baseCost: Num = new Num(1, 20);
  cost: Num = new Num(1, 20);
override scaling: Num = new Num(1, 5);
  increase: Num = new Num(1, 30);
  startIncrease: Num = new Num(1, 30);
  override limit: Num = new Num(2, 0);
  currency: Holding = HoldingRecord.yellowParticles;
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.yellowParticles, new Num(1, 10), this),
  ];
}
