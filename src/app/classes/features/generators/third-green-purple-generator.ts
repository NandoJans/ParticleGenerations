import {GreenPurpleGenerator} from "./green-purple-generator";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Num} from "../../../num";
import {Generatable} from "../interfaces/generatable";
import {GeneratorRecord} from "../../records/generators/generator-record";

export class ThirdGreenPurpleGenerator extends GreenPurpleGenerator {
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.purples, new Num(5, 0)),
  ];
  override scaling: Num = new Num(1, 18000);
  increase: Num = new Num(1, 18000);
  baseCost: Num = new Num(1, 110);
  cost: Num = new Num(1, 110);
  displayName: string = 'Green Purple Generator 3'
  generates: Generatable = GeneratorRecord.secondGreenPurpleGenerator;
  name: string = 'green-purple-generator-3';
}
