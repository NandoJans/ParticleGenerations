import {Num} from "../../../num";
import {Generatable} from "../interfaces/generatable";
import {RedGenerator} from "./red-generator";
import {GeneratorRecord} from "../../records/generators/generator-record";
import {Requirement} from "../interfaces/requirement";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

export class SecondRedGenerator extends RedGenerator {
  baseCost: Num = new Num(1, 2);
  cost: Num = new Num(1, 2);
  displayName: string = 'Red Generator 2';
  generates: Generatable = GeneratorRecord.firstRedGenerator;
  name: string = 'red-generator-2';
  increase: Num = new Num(1, 2);
  override requirement: Requirement[] = [
    new Requirement(UpgradeRecord.redGeneratorExtension, new Num(1, 0))
  ];
}
