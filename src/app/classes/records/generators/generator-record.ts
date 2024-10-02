import {FirstRedGenerator} from "../../features/generators/first-red-generator";
import {SecondRedGenerator} from "../../features/generators/second-red-generator";
import {ThirdRedGenerator} from "../../features/generators/third-red-generator";
import {FourthRedGenerator} from "../../features/generators/fourth-red-generator";
import {FifthRedGenerator} from "../../features/generators/fifth-red-generator";
import {FirstAcceleratorGenerator} from "../../features/generators/first-accelerator-generator";
import {SecondAcceleratorGenerator} from "../../features/generators/second-accelerator-generator";
import {FirstYellowGenerator} from "../../features/generators/first-yellow-generator";
import {FourthYellowGenerator} from "../../features/generators/fourth-yellow-generator";
import {ThirdYellowGenerator} from "../../features/generators/third-yellow-generator";
import {SecondYellowGenerator} from "../../features/generators/second-yellow-generator";
import {FifthYellowGenerator} from "../../features/generators/fifth-yellow-generator";
import { Generator } from "../../features/generator";
import {Record} from "../record";

export class GeneratorRecord extends Record {
  // Red Generators
  static firstRedGenerator: FirstRedGenerator     = new FirstRedGenerator();
  static secondRedGenerator: SecondRedGenerator   = new SecondRedGenerator();
  static thirdRedGenerator: ThirdRedGenerator     = new ThirdRedGenerator();
  static fourthRedGenerator: FourthRedGenerator   = new FourthRedGenerator();
  static fifthRedGenerator: FifthRedGenerator     = new FifthRedGenerator();
  // Accelerator Generators

  static firstAcceleratorGenerator: FirstAcceleratorGenerator = new FirstAcceleratorGenerator();
  static secondAcceleratorGenerator: SecondAcceleratorGenerator = new SecondAcceleratorGenerator();
  // Yellow power Generators

  static firstYellowGenerator: FirstYellowGenerator = new FirstYellowGenerator();
  static secondYellowGenerator: SecondYellowGenerator = new SecondYellowGenerator();
  static thirdYellowGenerator: ThirdYellowGenerator = new ThirdYellowGenerator();
  static fourthYellowGenerator: FourthYellowGenerator = new FourthYellowGenerator();
  static fifthYellowGenerator: FifthYellowGenerator = new FifthYellowGenerator();

  static override list: Generator[] = [
    GeneratorRecord.firstRedGenerator,
    GeneratorRecord.secondRedGenerator,
    GeneratorRecord.thirdRedGenerator,
    GeneratorRecord.fourthRedGenerator,
    GeneratorRecord.fifthRedGenerator,
    GeneratorRecord.firstAcceleratorGenerator,
    GeneratorRecord.secondAcceleratorGenerator,
    GeneratorRecord.firstYellowGenerator,
    GeneratorRecord.secondYellowGenerator,
    GeneratorRecord.thirdYellowGenerator,
    GeneratorRecord.fourthYellowGenerator,
    GeneratorRecord.fifthYellowGenerator
  ]

  getList(): Generator[] {
    return GeneratorRecord.list;
  }

  getFirstRedGenerator(): FirstRedGenerator {
    return GeneratorRecord.firstRedGenerator;
  }

  getSecondRedGenerator(): SecondRedGenerator {
    return GeneratorRecord.secondRedGenerator;
  }

  getThirdRedGenerator(): ThirdRedGenerator {
    return GeneratorRecord.thirdRedGenerator;
  }

  getFourthRedGenerator(): FourthRedGenerator {
    return GeneratorRecord.fourthRedGenerator;
  }

  getFifthRedGenerator(): FifthRedGenerator {
    return GeneratorRecord.fifthRedGenerator;
  }
}
