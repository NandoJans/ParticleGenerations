import {YellowPurpleGenerator} from "./yellow-purple-generator";
import {Requirement} from "../interfaces/requirement";
import {Num} from "../../../num";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Generatable} from "../interfaces/generatable";
import {GeneratorRecord} from "../../records/generators/generator-record";

export class ThirdYellowPurpleGenerator extends YellowPurpleGenerator {
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.purples, new Num(5, 0)),
  ];
  baseCost: Num = new Num(1, 110);
  cost: Num = new Num(1, 110);
  displayName: string = 'Yellow Purple Generator 3'
  generates: Generatable = GeneratorRecord.secondYellowPurpleGenerator;
  name: string = 'yellow-purple-generator-3';
}
