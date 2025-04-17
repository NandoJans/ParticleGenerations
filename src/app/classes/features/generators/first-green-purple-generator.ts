import {GreenPurpleGenerator} from "./green-purple-generator";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Num} from "../../../num";
import {Generatable} from "../interfaces/generatable";

export class FirstGreenPurpleGenerator extends GreenPurpleGenerator {
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.purples, new Num(1, 0)),
  ];
  override scaling: Num = new Num(1, 500);
  increase: Num = new Num(1, 500);
  baseCost: Num = new Num(1, 1);
  cost: Num = new Num(1, 1);
  displayName: string = 'Green Purple Generator 1'
  generates: Generatable = HoldingRecord.greenPurple;
  name: string = 'green-purple-generator-1';
}
