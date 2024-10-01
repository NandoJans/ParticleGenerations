import {FirstRedGenerator} from "../../features/generators/first-red-generator";
import {SecondRedGenerator} from "../../features/generators/second-red-generator";
import {ThirdRedGenerator} from "../../features/generators/third-red-generator";
import {FourthRedGenerator} from "../../features/generators/fourth-red-generator";
import {FifthRedGenerator} from "../../features/generators/fifth-red-generator";

export class GeneratorRecord {
  // Red Generators
  static firstRedGenerator: FirstRedGenerator     = new FirstRedGenerator();
  static secondRedGenerator: SecondRedGenerator   = new SecondRedGenerator();
  static thirdRedGenerator: ThirdRedGenerator     = new ThirdRedGenerator();
  static fourthRedGenerator: FourthRedGenerator   = new FourthRedGenerator();
  static fifthRedGenerator: FifthRedGenerator     = new FifthRedGenerator();



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
