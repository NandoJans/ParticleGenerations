import {YellowPurpleGenerator} from "./yellow-purple-generator";
import {Requirement} from "../../classes/features/interfaces/requirement";
import {Num} from "../../num";
import {HoldingRecord} from "../../classes/records/holdings/holding-record";
import {Generatable} from "../../classes/features/interfaces/generatable";

export class ThirdYellowPurpleGenerator extends YellowPurpleGenerator {
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.purples, new Num(5, 0)),
  ];
  baseCost: Num = new Num(1, 110);
  cost: Num = new Num(1, 110);
  displayName: string = 'Yellow Purple Generator 3'
  generates: Generatable = HoldingRecord.yellowPurple;
  name: string = 'yellow-purple-generator-3';
}
