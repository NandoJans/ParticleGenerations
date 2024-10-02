import {Num} from "../../../num";
import {Generatable} from "../interfaces/generatable";
import {GeneratorRecord} from "../../records/generators/generator-record";
import {YellowGenerator} from "./yellow-generator";

export class SecondYellowGenerator extends YellowGenerator {
  baseCost: Num = new Num(1, 3);
  cost: Num = new Num(1, 3);
  displayName: string = 'Yellow Generator 2';
  generates: Generatable = GeneratorRecord.firstYellowGenerator;
  name: string = 'yellow-generator-2';
  increase: Num = new Num(1, 2);
}
