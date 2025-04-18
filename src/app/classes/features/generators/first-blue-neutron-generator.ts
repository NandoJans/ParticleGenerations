import {BlueNeutronGenerator} from "./blue-neutron-generator";
import {Num} from "../../../num";
import {Generatable} from "../interfaces/generatable";
import {HoldingRecord} from "../../records/holdings/holding-record";

export class FirstBlueNeutronGenerator extends BlueNeutronGenerator {
  baseCost: Num = new Num(1, 0);
  cost: Num = new Num(1, 0);
  override scaling: Num = new Num(1, 1);
  displayName: string = 'Blue Neutron Generator 1';
  generates: Generatable = HoldingRecord.blueNeutrons;
  increase: Num = new Num(1, 1);
  name: string = 'blue-neutron-generator-1';
}
