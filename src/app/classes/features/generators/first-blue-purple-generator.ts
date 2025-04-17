import {BluePurpleGenerator} from "./blue-purple-generator";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Num} from "../../../num";
import {Generatable} from "../interfaces/generatable";

export class FirstBluePurpleGenerator extends BluePurpleGenerator {
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.purples, new Num(1, 0)),
  ];
  override scaling: Num = new Num(1, 20);
  increase: Num = new Num(1, 20);
  baseCost: Num = new Num(1, 1);
  cost: Num = new Num(1, 1);
  displayName: string = 'Blue Purple Generator 1'
  generates: Generatable = HoldingRecord.bluePurple;
  name: string = 'blue-purple-generator-1';
}
