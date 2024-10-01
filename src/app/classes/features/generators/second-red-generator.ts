import {Num} from "../../../num";
import {Generatable} from "../interfaces/generatable";
import {RedGenerator} from "./red-generator";
import {GeneratorRecord} from "../../records/generators/generator-record";

export class SecondRedGenerator extends RedGenerator {
  baseCost: Num = new Num(1, 2);
  cost: Num = new Num(1, 2);
  displayName: string = 'Red Generator 2';
  generates: Generatable = GeneratorRecord.firstRedGenerator;
  name: string = 'redGenerator1';
}
