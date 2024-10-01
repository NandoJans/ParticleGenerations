import {Num} from "../../../num";
import {Generatable} from "../interfaces/generatable";
import {GeneratorRecord} from "../../records/generators/generator-record";
import {RedGenerator} from "./red-generator";

export class FourthRedGenerator extends RedGenerator {
  baseCost: Num = new Num(1, 4);
  cost: Num = new Num(1, 4);
  displayName: string = 'Red Generator 4';
  generates: Generatable = GeneratorRecord.thirdRedGenerator;
  name: string = 'redGenerator4';
}
