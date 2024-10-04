import {GreenGenerator} from "./green-generator";
import {Num} from "../../../num";
import {Generatable} from "../interfaces/generatable";
import {GeneratorRecord} from "../../records/generators/generator-record";

export class ThirdGreenGenerator extends GreenGenerator {
  name: string = 'green-generator-3';
  displayName: string = 'Green Generator 3';
  baseCost: Num = new Num(2.5, 1);
  cost: Num = new Num(2.5, 1);
  generates: Generatable = GeneratorRecord.secondGreenGenerator;
  increase: Num = new Num(1.25, 2);
}
