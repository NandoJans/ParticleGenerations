import {Num} from "src/app/num";
import {ResetKey} from "../../enums/reset-key";
import {Styles} from "../../enums/styles";
import {Challenge} from "../challenge";
import {Holding} from "../holding";
import {Requirement} from "../interfaces/requirement";
import {IncreaseChallengeGoalUpgrade} from "./increase-challenge-goal-upgrade";
import {ChallengeRecord} from "../../records/challenges/challenge-record";
import {ResetHelper} from "../../helpers/reset-helper";
import {HoldingRecord} from "../../records/holdings/holding-record";

export class IncreaseProximaCentauriGoalUpgrade extends IncreaseChallengeGoalUpgrade {
  challenge: Challenge = ChallengeRecord.proximaCentauriStar;
  name: string = 'increase-proxima-centauri-goal-upgrade';
  displayName: string = 'Increase Proxima Centauri Goal';
  type: string = 'increase-proxima-centauri-goal-upgrade';
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.YELLOW, this);
  style: Styles = Styles.PROXIMA_CENTAURI;
  nav: string = 'yellow';
  subNav: string = 'yellowFusion';
  baseCost: Num = new Num(1, 0);
  cost: Num = new Num(1, 0);
  increase: Num = new Num(1, 4);
  currency: Holding = HoldingRecord.hydrogen;
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.yellowParticles, new Num(1, 10), this),
  ];
}
