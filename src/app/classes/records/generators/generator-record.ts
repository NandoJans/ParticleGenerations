import {FirstRedGenerator} from "../../features/generators/first-red-generator";
import {SecondRedGenerator} from "../../features/generators/second-red-generator";
import {ThirdRedGenerator} from "../../features/generators/third-red-generator";
import {FourthRedGenerator} from "../../features/generators/fourth-red-generator";
import {FifthRedGenerator} from "../../features/generators/fifth-red-generator";
import { Generator } from "../../features/generator";
import {Record} from "../record";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneratorRecord extends Record {
  // Red Generators
  static firstRedGenerator: FirstRedGenerator     = new FirstRedGenerator();
  static secondRedGenerator: SecondRedGenerator   = new SecondRedGenerator();
  static thirdRedGenerator: ThirdRedGenerator     = new ThirdRedGenerator();
  static fourthRedGenerator: FourthRedGenerator   = new FourthRedGenerator();
  static fifthRedGenerator: FifthRedGenerator     = new FifthRedGenerator();


  static override list: Generator[] = [
    GeneratorRecord.firstRedGenerator,
    GeneratorRecord.secondRedGenerator,
    GeneratorRecord.thirdRedGenerator,
    GeneratorRecord.fourthRedGenerator,
    GeneratorRecord.fifthRedGenerator,
  ]

  getList(): Generator[] {
    return GeneratorRecord.list;
  }

  load() {
    this.getList().forEach((generator) => {
      generator.tryLoad();
      generator.getUpgrades().forEach((upgrade) => {
        upgrade.tryLoad();
      });
    });
  }

  save() {
    this.getList().forEach((generator) => {
      generator.save();
      generator.getUpgrades().forEach((upgrade) => {
        upgrade.save();
      });
    });
  }
}
