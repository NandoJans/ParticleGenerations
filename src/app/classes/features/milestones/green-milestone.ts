import {Milestone} from "../milestone";
import {Num} from "../../../num";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {ResetHelper} from "../../helpers/reset-helper";
import {ResetKey} from "../../enums/reset-key";
import {Holding} from "../holding";
import {Styles} from "../../enums/styles";

export abstract class GreenMilestone extends Milestone {
  protected constructor(name: string, displayName: string, goal: Num) {
    super(name);
    this.name = name;
    this.displayName = displayName;
    this.goal = goal;
    this.requirement = [
      new Requirement(HoldingRecord.greenPrestiges, goal, this)
    ];
    this.resetId = ResetHelper.registerReset(ResetKey.GREEN, this);
  }
  resetId: ResetKey;
  goal: Num;
  requirement: Requirement[];
  name: string;
  displayName: string;
  currency: Holding = HoldingRecord.greenPrestiges;
  style: Styles = Styles.GREEN;
  type: string = 'green-milestone';

}
