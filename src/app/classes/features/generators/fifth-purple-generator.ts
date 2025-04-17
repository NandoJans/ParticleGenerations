import {PurpleGenerator} from "./purple-generator";
import {Num} from "../../../num";
import {Generatable} from "../interfaces/generatable";
import {GeneratorRecord} from "../../records/generators/generator-record";

export class FifthPurpleGenerator extends PurpleGenerator {
  name: string = 'purple-generator-5';
  displayName: string = 'Purple Generator 5';
  baseCost: Num = new Num(1, 80);
  cost: Num = new Num(1, 80);
  generates: Generatable = GeneratorRecord.fourthPurpleGenerator;
  increase: Num = new Num(1, 8);
  override scaling: Num = new Num(1, 1);
}
