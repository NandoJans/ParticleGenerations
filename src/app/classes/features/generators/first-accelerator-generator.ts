import {AcceleratorGenerator} from "./accelerator-generator";
import {Num} from "../../../num";
import {Generatable} from "../interfaces/generatable";
import {HoldingRecord} from "../../records/holdings/holding-record";

export class FirstAcceleratorGenerator extends AcceleratorGenerator {
  name: string = 'red-accelerator-generator-1';
  displayName: string = 'Red Accelerator Generator 1';
  baseCost: Num = new Num(1, 0);
  cost: Num = new Num(1, 0);
  generates: Generatable = HoldingRecord.redAccelerators;
}
