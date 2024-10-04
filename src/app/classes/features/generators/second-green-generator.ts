import {Num} from "../../../num";
import {Generatable} from "../interfaces/generatable";
import {GeneratorRecord} from "../../records/generators/generator-record";
import {GreenGenerator} from "./green-generator";

export class SecondGreenGenerator extends GreenGenerator {
  name: string = 'green-generator-2';
  displayName: string = 'Green Generator 2';
  baseCost: Num = new Num(5, 0);
  cost: Num = new Num(5, 0);
  generates: Generatable = GeneratorRecord.firstGreenGenerator;
  increase: Num = new Num(2.5, 1);
}
