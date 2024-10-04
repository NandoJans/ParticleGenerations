import {GreenGenerator} from "./green-generator";
import {Num} from "../../../num";
import {Generatable} from "../interfaces/generatable";
import {HoldingRecord} from "../../records/holdings/holding-record";

export class FirstGreenGenerator extends GreenGenerator {
  name: string = 'green-generator-1';
  displayName: string = 'Green Generator 1';
  baseCost: Num = new Num(1, 0);
  cost: Num = new Num(1, 0);
  generates: Generatable = HoldingRecord.greenEnergy;
  increase: Num = new Num(5, 1);
}
