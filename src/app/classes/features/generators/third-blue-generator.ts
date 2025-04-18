import {BlueGenerator} from "./blue-generator";
import {Num} from "../../../num";
import {Generatable} from "../interfaces/generatable";
import {GeneratorRecord} from "../../records/generators/generator-record";

export class ThirdBlueGenerator extends BlueGenerator {
  baseCost: Num = new Num(1, 70)
  cost: Num = new Num(1, 70);
  override scaling: Num = new Num(6, 0);
  increase: Num = new Num(1, 15);

  displayName: string = 'Blue Generator 3';
  generates: Generatable = GeneratorRecord.secondBlueGenerator;
  name: string = 'blue-neutron-generator-3';
}
