import {Num} from "../../../num";
import {Generatable} from "../interfaces/generatable";
import {GeneratorRecord} from "../../records/generators/generator-record";
import {RedGenerator} from "./red-generator";
import {Requirement} from "../interfaces/requirement";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

export class FourthRedGenerator extends RedGenerator {
  baseCost: Num = new Num(1, 4);
  cost: Num = new Num(1, 4);
  displayName: string = 'Red Generator 4';
  generates: Generatable = GeneratorRecord.thirdRedGenerator;
  name: string = 'red-generator-4';
  increase: Num = new Num(1, 4);
  override requirement: Requirement[] = [
    new Requirement(UpgradeRecord.redGeneratorExtension, new Num(3, 0))
  ];
}
