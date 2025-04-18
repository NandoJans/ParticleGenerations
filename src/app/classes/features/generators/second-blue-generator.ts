import {BlueGenerator} from "./blue-generator";
import {Num} from "../../../num";
import {Generatable} from "../interfaces/generatable";
import {GeneratorRecord} from "../../records/generators/generator-record";

export class SecondBlueGenerator extends BlueGenerator {
  baseCost: Num = new Num(1, 60)
  cost: Num = new Num(1, 60);
  override scaling: Num = new Num(4, 0);
  increase: Num = new Num(1, 10);

  displayName: string = 'Blue Generator 2';
  generates: Generatable = GeneratorRecord.firstBlueGenerator;
  name: string = 'blue-neutron-generator-2';
}
