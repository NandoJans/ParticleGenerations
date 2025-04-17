import {PurpleGenerator} from "./purple-generator";
import {Num} from "../../../num";
import {Generatable} from "../interfaces/generatable";
import {HoldingRecord} from "../../records/holdings/holding-record";

export class FirstPurpleGenerator extends PurpleGenerator {
  name: string = 'purple-generator-1';
  displayName: string = 'Purple Generator 1';
  baseCost: Num = new Num(1, 0);
  cost: Num = new Num(1, 0);
  generates: Generatable = HoldingRecord.purpleVoid;
  increase: Num = new Num(2, 0);
  override scaling: Num = new Num(2, 0);
  override scalingStart: Num = new Num(1, 110);
}
