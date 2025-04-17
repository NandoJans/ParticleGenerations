import {PurpleGenerator} from "./purple-generator";
import {Num} from "../../../num";
import {Generatable} from "../interfaces/generatable";
import {GeneratorRecord} from "../../records/generators/generator-record";

export class SecondPurpleGenerator extends PurpleGenerator {
  name: string = 'purple-generator-2';
  displayName: string = 'Purple Generator 2';
  baseCost: Num = new Num(2, 0);
  cost: Num = new Num(2, 0);
  generates: Generatable = GeneratorRecord.firstPurpleGenerator;
  increase: Num = new Num(2, 0);
  override scaling: Num = new Num(2, 0);
  override scalingStart: Num = new Num(1, 110);
}
