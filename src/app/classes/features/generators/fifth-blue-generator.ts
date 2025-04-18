import {BlueGenerator} from "./blue-generator";
import {Num} from "../../../num";
import {GeneratorRecord} from "../../records/generators/generator-record";
import {Generatable} from "../interfaces/generatable";

export class FifthBlueGenerator extends BlueGenerator {
  baseCost: Num = new Num(1, 90)
  cost: Num = new Num(1, 90);
  override scaling: Num = new Num(1, 1);
  increase: Num = new Num(1, 25);

  displayName: string = 'Blue Generator 5';
  generates: Generatable = GeneratorRecord.fourthBlueGenerator;
  name: string = 'blue-neutron-generator-5';
}
