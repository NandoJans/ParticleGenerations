import {Num} from "../../../num";
import {Generatable} from "../interfaces/generatable";
import {GeneratorRecord} from "../../records/generators/generator-record";
import {RedGenerator} from "./red-generator";

export class FifthRedGenerator extends RedGenerator {
  baseCost: Num = new Num(1, 5);
  cost: Num = new Num(1, 5);
  displayName: string = 'Red Generator 5';
  generates: Generatable = GeneratorRecord.fourthRedGenerator;
  name: string = 'redGenerator5';
}
