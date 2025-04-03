import {RedPurpleGenerator} from "./red-purple-generator";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Num} from "../../../num";
import {Generatable} from "../interfaces/generatable";
import {GeneratorRecord} from "../../records/generators/generator-record";

export class ThirdRedPurpleGenerator extends RedPurpleGenerator {
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.purples, new Num(5, 0)),
  ];
  baseCost: Num = new Num(1, 110);
  cost: Num = new Num(1, 110);
  displayName: string = 'Red Purple Generator 3'
  generates: Generatable = GeneratorRecord.secondRedPurpleGenerator;
  name: string = 'red-purple-generator-3';
}
