import {BlueGenerator} from "./blue-generator";
import {Num} from "../../../num";
import {Generatable} from "../interfaces/generatable";
import {HoldingRecord} from "../../records/holdings/holding-record";

export class FirstBlueGenerator extends BlueGenerator {
  baseCost: Num = new Num(1, 35)
  cost: Num = new Num(1, 35);
  override scaling: Num = new Num(2, 0);
  increase: Num = new Num(1, 5);

  displayName: string = 'Blue Generator 1';
  generates: Generatable = HoldingRecord.blueHydrogen;
  name: string = 'blue-neutron-generator-1';
}
