import {YellowPurpleGenerator} from "./yellow-purple-generator";
import {Requirement} from "../../classes/features/interfaces/requirement";
import {HoldingRecord} from "../../classes/records/holdings/holding-record";
import {Num} from "../../num";
import {Generatable} from "../../classes/features/interfaces/generatable";

export class FirstYellowPurpleGenerator extends YellowPurpleGenerator {
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.purples, new Num(1, 0)),
  ];
  baseCost: Num = new Num(1, 1);
  cost: Num = new Num(1, 1);
  displayName: string = 'Yellow Purple Generator 1'
  generates: Generatable = HoldingRecord.yellowPurple;
  name: string = 'yellow-purple-generator-1';
}
