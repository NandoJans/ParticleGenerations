import {BlueNeutronGenerator} from "./blue-neutron-generator";
import {Num} from "../../../num";
import {Generatable} from "../interfaces/generatable";
import {GeneratorRecord} from "../../records/generators/generator-record";

export class ThirdBlueNeutronGenerator extends BlueNeutronGenerator {
  baseCost: Num = new Num(5, 2);
  cost: Num = new Num(5, 2);
  override scalingStart: Num = new Num(1, 19);
  override scaling: Num = new Num(1, 1);
  displayName: string = 'Blue Neutron Generator 3';
  generates: Generatable = GeneratorRecord.secondBlueNeutronGenerator;
  increase: Num = new Num(1, 3);
  name: string = 'blue-neutron-generator-3';
}
