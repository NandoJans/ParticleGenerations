import {YellowGenerator} from "./yellow-generator";
import {Num} from "../../../num";
import {Generatable} from "../interfaces/generatable";
import {GeneratorRecord} from "../../records/generators/generator-record";

export class ThirdYellowGenerator extends YellowGenerator {
  baseCost: Num = new Num(1, 4);
  cost: Num = new Num(1, 4);
  displayName: string = 'Yellow Generator 3';
  generates: Generatable = GeneratorRecord.secondYellowGenerator;
  name: string = 'yellow-generator-3';
  increase: Num = new Num(1, 3);
}
