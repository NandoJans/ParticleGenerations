import {RedPurpleGenerator} from "./red-purple-generator";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Num} from "../../../num";
import {Generatable} from "../interfaces/generatable";
import {GeneratorRecord} from "../../records/generators/generator-record";

export class SecondRedPurpleGenerator extends RedPurpleGenerator {
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.purples, new Num(3, 0)),
  ];
  baseCost: Num = new Num(1, 11);
  cost: Num = new Num(1, 11);
  displayName: string = 'Red Purple Generator 2'
  generates: Generatable = GeneratorRecord.firstRedPurpleGenerator;
  name: string = 'red-purple-generator-2';
}
