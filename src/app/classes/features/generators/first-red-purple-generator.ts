import {RedPurpleGenerator} from "./red-purple-generator";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Num} from "../../../num";
import {Generatable} from "../interfaces/generatable";

export class FirstRedPurpleGenerator extends RedPurpleGenerator {
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.purples, new Num(1, 0)),
  ];
  baseCost: Num = new Num(1, 1);
  cost: Num = new Num(1, 1);
  displayName: string = 'Red Purple Generator 1'
  generates: Generatable = HoldingRecord.redPurple;
  name: string = 'red-purple-generator-1';
}
