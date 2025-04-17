import {PurpleGenerator} from "./purple-generator";
import {Num} from "../../../num";
import {Generatable} from "../interfaces/generatable";
import {GeneratorRecord} from "../../records/generators/generator-record";

export class ThirdPurpleGenerator extends PurpleGenerator {
  name: string = 'purple-generator-3';
  displayName: string = 'Purple Generator 3';
  baseCost: Num = new Num(3, 0);
  cost: Num = new Num(3, 0);
  generates: Generatable = GeneratorRecord.secondPurpleGenerator;
  increase: Num = new Num(2, 0);
  override scaling: Num = new Num(2, 0);
  override scalingStart: Num = new Num(1, 110);
}
