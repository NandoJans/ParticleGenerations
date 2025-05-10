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

export class IncreaseLalandeGoalUpgrade extends IncreaseChallengeGoalUpgrade {
  challenge: Challenge = ChallengeRecord.lalandeStar;
  name: string = 'increase-lalande-goal-upgrade';
  displayName: string = 'Increase Lalande Goal';
  type: string = 'increase-lalande-goal-upgrade';
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.YELLOW, this);
  style: Styles = Styles.LALANDE;
  nav: string = 'yellow';
  subNav: string = 'yellowFusion';
  baseCost: Num = new Num(1, 2);
  cost: Num = new Num(1, 2);
  increase: Num = new Num(1, 5);
  currency: Holding = HoldingRecord.hydrogen;
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.yellowParticles, new Num(1, 10), this),
  ];
}
