import {Milestone} from "../milestone";
import {Holding} from "../holding";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Requirement} from "../interfaces/requirement";
import {Styles} from "../../enums/styles";
import {Num} from "../../../num";

export abstract class YellowMilestone extends Milestone {
  currency: Holding = HoldingRecord.redParticles;
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.redParticles, new Num(1, 0), this)
  ];
  style: Styles = Styles.YELLOW;
  type: string = 'yellow-milestone';

}
