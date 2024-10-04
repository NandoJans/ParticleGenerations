import {Num} from "../../../num";
import {Generatable} from "../interfaces/generatable";
import {GeneratorRecord} from "../../records/generators/generator-record";
import {GreenGenerator} from "./green-generator";

export class FifthGreenGenerator extends GreenGenerator {
  name: string = 'green-generator-5';
  displayName: string = 'Green Generator 5';
  baseCost: Num = new Num(1, 5);
  cost: Num = new Num(1, 5);
  generates: Generatable = GeneratorRecord.fourthGreenGenerator;
  increase: Num = new Num(1, 2);
}
