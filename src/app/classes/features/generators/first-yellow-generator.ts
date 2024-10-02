import {YellowGenerator} from "./yellow-generator";
import {Num} from "../../../num";
import {Generatable} from "../interfaces/generatable";
import {HoldingRecord} from "../../records/holdings/holding-record";

export class FirstYellowGenerator extends YellowGenerator {
  baseCost: Num = new Num(1, 2);
  cost: Num = new Num(1, 2);
  displayName: string = 'Yellow Generator 1';
  generates: Generatable = HoldingRecord.yellowPower;
  name: string = 'yellow-generator-1';
  increase: Num = new Num(1, 1);
  override baseMultiplier: Num = new Num(25, 0);
}
