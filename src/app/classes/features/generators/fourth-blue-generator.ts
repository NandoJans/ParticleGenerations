import {BlueGenerator} from "./blue-generator";
import {GeneratorRecord} from "../../records/generators/generator-record";
import {Num} from "../../../num";
import {Generatable} from "../interfaces/generatable";

export class FourthBlueGenerator extends BlueGenerator {
  baseCost: Num = new Num(1, 80)
  cost: Num = new Num(1, 80);
  override scaling: Num = new Num(8, 0);
  increase: Num = new Num(1, 20);

  displayName: string = 'Blue Generator 4';
  generates: Generatable = GeneratorRecord.thirdBlueGenerator;
  name: string = 'blue-neutron-generator-4';
}
