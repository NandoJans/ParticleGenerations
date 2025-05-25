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
import {SecondYellowGenerator} from "../../features/generators/second-yellow-generator";
import {ThirdYellowGenerator} from "../../features/generators/third-yellow-generator";
import {YellowGenerator} from "../../features/generators/yellow-generator";
import {YellowFusionGenerator} from "../../features/generators/yellow-fusion-generator";
import {HydrogenGenerator} from "../../features/generators/hydrogen-generator";
import {FourthYellowGenerator} from "../../features/generators/fourth-yellow-generator";
import {FifthYellowGenerator} from "../../features/generators/fifth-yellow-generator";
import {FirstGreenGenerator} from "../../features/generators/first-green-generator";
import {GreenGenerator} from "../../features/generators/green-generator";

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
  static secondYellowGenerator: SecondYellowGenerator = new SecondYellowGenerator('secondYellowGenerator');
  static thirdYellowGenerator: ThirdYellowGenerator = new ThirdYellowGenerator('thirdYellowGenerator');
  static fourthYellowGenerator: FourthYellowGenerator = new FourthYellowGenerator('fourthYellowGenerator');
  static fifthYellowGenerator: FifthYellowGenerator = new FifthYellowGenerator('fifthYellowGenerator');

  // Yellow Fusion
  static yellowFusionGenerator: YellowFusionGenerator = new YellowFusionGenerator('yellowFusionGenerator');
  static hydrogenGenerator: HydrogenGenerator = new HydrogenGenerator('hydrogenGenerator');

  // Green Generators
  static firstGreenGenerator: FirstGreenGenerator = new FirstGreenGenerator('firstGreenGenerator');


  static override list: Generator[] = [
    GeneratorRecord.firstRedGenerator,
    GeneratorRecord.secondRedGenerator,
    GeneratorRecord.thirdRedGenerator,
    GeneratorRecord.fourthRedGenerator,
    GeneratorRecord.fifthRedGenerator,

    GeneratorRecord.redAcceleratorGenerator,

    GeneratorRecord.firstYellowGenerator,
    GeneratorRecord.secondYellowGenerator,
    GeneratorRecord.thirdYellowGenerator,
    GeneratorRecord.fourthYellowGenerator,
    GeneratorRecord.fifthYellowGenerator,

    GeneratorRecord.yellowFusionGenerator,
    GeneratorRecord.hydrogenGenerator,

    GeneratorRecord.firstGreenGenerator
  ]

  static redGenerators: RedGenerator[] = [
    GeneratorRecord.firstRedGenerator,
    GeneratorRecord.secondRedGenerator,
    GeneratorRecord.thirdRedGenerator,
    GeneratorRecord.fourthRedGenerator,
    GeneratorRecord.fifthRedGenerator
  ];

  static yellowGenerators: YellowGenerator[] = [
    GeneratorRecord.firstYellowGenerator,
    GeneratorRecord.secondYellowGenerator,
    GeneratorRecord.thirdYellowGenerator,
    GeneratorRecord.fourthYellowGenerator,
    GeneratorRecord.fifthYellowGenerator
  ];

  static greenGenerators: GreenGenerator[] = [
    GeneratorRecord.firstGreenGenerator
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
