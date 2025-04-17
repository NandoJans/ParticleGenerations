import {PurpleGenerator} from "./purple-generator";
import {Num} from "../../../num";
import {Generatable} from "../interfaces/generatable";
import {GeneratorRecord} from "../../records/generators/generator-record";

export class FourthPurpleGenerator extends PurpleGenerator {
  name: string = 'purple-generator-4';
  displayName: string = 'Purple Generator 4';
  baseCost: Num = new Num(1, 50);
  cost: Num = new Num(1, 50);
  generates: Generatable = GeneratorRecord.thirdPurpleGenerator;
  increase: Num = new Num(1, 5);
  override scaling: Num = new Num(1, 1);
}
