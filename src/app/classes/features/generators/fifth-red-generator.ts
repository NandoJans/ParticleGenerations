import {Num} from "../../../num";
import {Generatable} from "../interfaces/generatable";
import {GeneratorRecord} from "../../records/generators/generator-record";
import {RedGenerator} from "./red-generator";
import {Requirement} from "../interfaces/requirement";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

export class FifthRedGenerator extends RedGenerator {
  baseCost: Num = new Num(1, 5);
  cost: Num = new Num(1, 5);
  displayName: string = 'Red Generator 5';
  generates: Generatable = GeneratorRecord.fourthRedGenerator;
  name: string = 'red-generator-5';
  increase: Num = new Num(1, 5);
  override requirement: Requirement[] = [
    new Requirement(UpgradeRecord.redGeneratorExtension, new Num(4, 0))
  ];
}
