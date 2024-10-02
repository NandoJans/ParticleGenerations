import {YellowGenerator} from "./yellow-generator";
import {Num} from "../../../num";
import {Generatable} from "../interfaces/generatable";
import {GeneratorRecord} from "../../records/generators/generator-record";

export class FifthYellowGenerator extends YellowGenerator {
  baseCost: Num = new Num(1, 6);
  cost: Num = new Num(1, 6);
  displayName: string = 'Yellow Generator 5';
  generates: Generatable = GeneratorRecord.fourthRedGenerator;
  name: string = 'yellow-generator-5';
  increase: Num = new Num(1, 5);
}
