import {BluePurpleGenerator} from "./blue-purple-generator";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Num} from "../../../num";
import {Generatable} from "../interfaces/generatable";
import {GeneratorRecord} from "../../records/generators/generator-record";

export class ThirdBluePurpleGenerator extends BluePurpleGenerator {
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.purples, new Num(5, 0)),
  ];
  override scaling: Num = new Num(1, 500);
  increase: Num = new Num(1, 500);
  baseCost: Num = new Num(1, 110);
  cost: Num = new Num(1, 110);
  displayName: string = 'Blue Purple Generator 3'
  generates: Generatable = GeneratorRecord.secondBluePurpleGenerator;
  name: string = 'blue-purple-generator-3';
}
