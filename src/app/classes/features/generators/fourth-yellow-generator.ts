import {YellowGenerator} from "./yellow-generator";
import {Num} from "../../../num";
import {Generatable} from "../interfaces/generatable";
import {GeneratorRecord} from "../../records/generators/generator-record";

export class FourthYellowGenerator extends YellowGenerator {
  baseCost: Num = new Num(1, 5);
  cost: Num = new Num(1, 5);
  displayName: string = 'Yellow Generator 4';
  generates: Generatable = GeneratorRecord.thirdYellowGenerator;
  name: string = 'yellow-generator-4';
  increase: Num = new Num(1, 4);
}
