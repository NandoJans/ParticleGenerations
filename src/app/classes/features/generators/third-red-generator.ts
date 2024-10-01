import {RedGenerator} from "./red-generator";
import {Num} from "../../../num";
import {Generatable} from "../interfaces/generatable";
import {GeneratorRecord} from "../../records/generators/generator-record";

export class ThirdRedGenerator extends RedGenerator {
  baseCost: Num = new Num(1, 3);
  cost: Num = new Num(1, 3);
  displayName: string = 'Red Generator 3';
  generates: Generatable = GeneratorRecord.secondRedGenerator;
  name: string = 'redGenerator3';
}
