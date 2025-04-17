import {GreenPurpleGenerator} from "./green-purple-generator";
import {Requirement} from "../interfaces/requirement";
import {Num} from "../../../num";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Generatable} from "../interfaces/generatable";
import {GeneratorRecord} from "../../records/generators/generator-record";

export class SecondGreenPurpleGenerator extends GreenPurpleGenerator {
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.purples, new Num(3, 0)),
  ];
  override scaling: Num = new Num(1, 2500);
  increase: Num = new Num(1, 2500);
  baseCost: Num = new Num(1, 11);
  cost: Num = new Num(1, 11);
  displayName: string = 'Green Purple Generator 2'
  generates: Generatable = GeneratorRecord.firstGreenPurpleGenerator;
  name: string = 'green-purple-generator-2';
}
