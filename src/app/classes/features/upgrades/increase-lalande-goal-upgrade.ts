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
  baseCost: Num = new Num(1, 15);
  cost: Num = new Num(1, 15);
  increase: Num = new Num(1, 15);
  startIncrease: Num = new Num(1, 6);
  override scaling: Num = new Num(1, 6);
  override limit: Num = new Num(5, 0);
  currency: Holding = HoldingRecord.yellowParticles;
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.yellowParticles, new Num(1, 10), this),
  ];
}
