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

export class IncreaseSiriusGoalUpgrade extends IncreaseChallengeGoalUpgrade {
  challenge: Challenge = ChallengeRecord.siriusStar;
  name: string = 'increase-sirius-goal-upgrade';
  displayName: string = 'Increase Sirius Goal';
  type: string = 'increase-sirius-goal-upgrade';
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.YELLOW, this);
  style: Styles = Styles.SIRIUS;
  nav: string = 'yellow';
  subNav: string = 'yellowFusion';
  baseCost: Num = new Num(1, 30);
  cost: Num = new Num(1, 30);
override scaling: Num = new Num(1, 8)
  increase: Num = new Num(1, 8);
  startIncrease: Num = new Num(1, 8);
  override limit: Num = new Num(5, 0);
  currency: Holding = HoldingRecord.yellowParticles;
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.yellowParticles, new Num(1, 10), this),
  ];
}
