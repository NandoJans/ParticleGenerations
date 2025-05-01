import {Milestone} from "../milestone";
import {Holding} from "../holding";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Requirement} from "../interfaces/requirement";
import {Styles} from "../../enums/styles";
import {Num} from "../../../num";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";

export abstract class YellowMilestone extends Milestone {
  protected constructor(name: string, displayName: string, goal: Num) {
    super(name);
    this.name = name;
    this.displayName = displayName;
    this.goal = goal;
    this.requirement = [
      new Requirement(HoldingRecord.yellowPrestiges, goal, this)
    ];
    this.resetId = ResetHelper.registerReset(ResetKey.YELLOW, this);
  }
  resetId: ResetKey;
  goal: Num;
  requirement: Requirement[];
  name: string;
  displayName: string;
  currency: Holding = HoldingRecord.yellowPrestiges;
  style: Styles = Styles.YELLOW;
  type: string = 'yellow-milestone';

}
