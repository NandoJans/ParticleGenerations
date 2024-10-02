import {AcceleratorGenerator} from "./accelerator-generator";
import {Num} from "../../../num";
import {Generatable} from "../interfaces/generatable";
import {HoldingRecord} from "../../records/holdings/holding-record";

export class SecondAcceleratorGenerator extends AcceleratorGenerator {
  name: string = 'red-accelerator-generator-2';
  displayName: string = 'Red Accelerator Generator 2';
  baseCost: Num = new Num(1, 10);
  cost: Num = new Num(1, 10);
  override increase: Num = new Num(1, 2);
  generates: Generatable = HoldingRecord.redAccelerators;
}
