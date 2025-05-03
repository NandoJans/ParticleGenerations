import {FirstRedGenerator} from "../../features/generators/first-red-generator";
import {SecondRedGenerator} from "../../features/generators/second-red-generator";
import {ThirdRedGenerator} from "../../features/generators/third-red-generator";
import {FourthRedGenerator} from "../../features/generators/fourth-red-generator";
import {FifthRedGenerator} from "../../features/generators/fifth-red-generator";
import { Generator } from "../../features/generator";
import {Record} from "../record";
import { Injectable } from '@angular/core';
import {RedAcceleratorGenerator} from "../../features/generators/red-accelerator-generator";
import {RedGenerator} from "../../features/generators/red-generator";
import {FirstYellowGenerator} from "../../features/generators/first-yellow-generator";

@Injectable({
  providedIn: 'root'
})
export class GeneratorRecord extends Record {
  // Red Generators
  static firstRedGenerator: FirstRedGenerator     = new FirstRedGenerator('firstRedGenerator');
  static secondRedGenerator: SecondRedGenerator   = new SecondRedGenerator('secondRedGenerator');
  static thirdRedGenerator: ThirdRedGenerator     = new ThirdRedGenerator('thirdRedGenerator');
  static fourthRedGenerator: FourthRedGenerator   = new FourthRedGenerator('fourthRedGenerator');
  static fifthRedGenerator: FifthRedGenerator     = new FifthRedGenerator('fifthRedGenerator');

  // Red Accelerators
  static redAcceleratorGenerator: RedAcceleratorGenerator = new RedAcceleratorGenerator('redAcceleratorGenerator');

  // Yellow Generators
  static firstYellowGenerator: FirstYellowGenerator = new FirstYellowGenerator('firstYellowGenerator');


  static override list: Generator[] = [
    GeneratorRecord.firstRedGenerator,
    GeneratorRecord.secondRedGenerator,
    GeneratorRecord.thirdRedGenerator,
    GeneratorRecord.fourthRedGenerator,
    GeneratorRecord.fifthRedGenerator,

    GeneratorRecord.redAcceleratorGenerator,

    GeneratorRecord.firstYellowGenerator
  ]

  static redGenerators: RedGenerator[] = [
    GeneratorRecord.firstRedGenerator,
    GeneratorRecord.secondRedGenerator,
    GeneratorRecord.thirdRedGenerator,
    GeneratorRecord.fourthRedGenerator,
    GeneratorRecord.fifthRedGenerator
  ];

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
