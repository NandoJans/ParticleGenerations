import {BluePurpleGenerator} from "./blue-purple-generator";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Num} from "../../../num";
import {Generatable} from "../interfaces/generatable";
import {GeneratorRecord} from "../../records/generators/generator-record";

export class SecondBluePurpleGenerator extends BluePurpleGenerator {
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.purples, new Num(3, 0)),
  ];
  override scaling: Num = new Num(1, 100);
  increase: Num = new Num(1, 100);
  baseCost: Num = new Num(1, 11);
  cost: Num = new Num(1, 11);
  displayName: string = 'Blue Purple Generator 2'
  generates: Generatable = GeneratorRecord.firstBluePurpleGenerator;
  name: string = 'blue-purple-generator-2';
}
