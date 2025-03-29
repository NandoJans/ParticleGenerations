import {YellowPurpleGenerator} from "./yellow-purple-generator";
import {Requirement} from "../../classes/features/interfaces/requirement";
import {HoldingRecord} from "../../classes/records/holdings/holding-record";
import {Num} from "../../num";
import {Generatable} from "../../classes/features/interfaces/generatable";

export class SecondYellowPurpleGenerator extends YellowPurpleGenerator {
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.purples, new Num(3, 0)),
  ];
  baseCost: Num = new Num(1, 11);
  cost: Num = new Num(1, 11);
  displayName: string = 'Yellow Purple Generator 2'
  generates: Generatable = HoldingRecord.yellowPurple;
  name: string = 'yellow-purple-generator-2';
}
