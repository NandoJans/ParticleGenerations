import {GreenGenerator} from "./green-generator";
import {Num} from "../../../num";
import {Generatable} from "../interfaces/generatable";
import {GeneratorRecord} from "../../records/generators/generator-record";

export class FourthGreenGenerator extends GreenGenerator {
  name: string = 'green-generator-4';
  displayName: string = 'Green Generator 4';
  baseCost: Num = new Num(1, 3);
  cost: Num = new Num(1, 3);
  generates: Generatable = GeneratorRecord.thirdGreenGenerator;
  increase: Num = new Num(4, 1);
}
