import {BlueNeutronGenerator} from "./blue-neutron-generator";
import {Num} from "../../../num";
import {Generatable} from "../interfaces/generatable";
import {GeneratorRecord} from "../../records/generators/generator-record";

export class SecondBlueNeutronGenerator extends BlueNeutronGenerator {
  baseCost: Num = new Num(2.5, 1);
  cost: Num = new Num(2.5, 1);
  override scalingStart: Num = new Num(1, 19);
  override scaling: Num = new Num(1, 1);
  displayName: string = 'Blue Neutron Generator 2';
  generates: Generatable = GeneratorRecord.firstBlueNeutronGenerator;
  increase: Num = new Num(1, 2);
  name: string = 'blue-neutron-generator-2';
}
