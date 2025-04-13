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
import {FirstGreenGenerator} from "../../features/generators/first-green-generator";
import {FifthGreenGenerator} from "../../features/generators/fifth-green-generator";
import {FourthGreenGenerator} from "../../features/generators/fourth-green-generator";
import {ThirdGreenGenerator} from "../../features/generators/third-green-generator";
import {SecondGreenGenerator} from "../../features/generators/second-green-generator";
import {FirstNuclearDecayGenerator} from "../../features/generators/first-nuclear-decay-generator";
import {SecondNuclearDecayGenerator} from "../../features/generators/second-nuclear-decay-generator";
import {ThirdNuclearDecayGenerator} from "../../features/generators/third-nuclear-decay-generator";
import {FirstYellowPurpleGenerator} from "../../features/generators/first-yellow-purple-generator";
import {SecondYellowPurpleGenerator} from "../../features/generators/second-yellow-purple-generator";
import {ThirdYellowPurpleGenerator} from "../../features/generators/third-yellow-purple-generator";
import {FirstRedPurpleGenerator} from "../../features/generators/first-red-purple-generator";
import {SecondRedPurpleGenerator} from "../../features/generators/second-red-purple-generator";
import {ThirdRedPurpleGenerator} from "../../features/generators/third-red-purple-generator";
import {FirstGreenPurpleGenerator} from "../../features/generators/first-green-purple-generator";
import {SecondGreenPurpleGenerator} from "../../features/generators/second-green-purple-generator";
import {ThirdGreenPurpleGenerator} from "../../features/generators/third-green-purple-generator";
import {FirstPurpleGenerator} from "../../features/generators/first-purple-generator";
import {SecondPurpleGenerator} from "../../features/generators/second-purple-generator";
import {ThirdPurpleGenerator} from "../../features/generators/third-purple-generator";
import {FourthPurpleGenerator} from "../../features/generators/fourth-purple-generator";
import {FifthPurpleGenerator} from "../../features/generators/fifth-purple-generator";
import {FirstBluePurpleGenerator} from "../../features/generators/first-blue-purple-generator";
import {SecondBluePurpleGenerator} from "../../features/generators/second-blue-purple-generator";
import {ThirdBluePurpleGenerator} from "../../features/generators/third-blue-purple-generator";

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

  // Red Purple Generators
  static firstRedPurpleGenerator: FirstRedPurpleGenerator = new FirstRedPurpleGenerator();
  static secondRedPurpleGenerator: SecondRedPurpleGenerator = new SecondRedPurpleGenerator();
  static thirdRedPurpleGenerator: ThirdRedPurpleGenerator = new ThirdRedPurpleGenerator();

  // Yellow power Generators

  static firstYellowGenerator: FirstYellowGenerator = new FirstYellowGenerator();
  static secondYellowGenerator: SecondYellowGenerator = new SecondYellowGenerator();
  static thirdYellowGenerator: ThirdYellowGenerator = new ThirdYellowGenerator();
  static fourthYellowGenerator: FourthYellowGenerator = new FourthYellowGenerator();
  static fifthYellowGenerator: FifthYellowGenerator = new FifthYellowGenerator();

  // Green energy generators
  static firstGreenGenerator: FirstGreenGenerator = new FirstGreenGenerator();
  static secondGreenGenerator: SecondGreenGenerator = new SecondGreenGenerator();
  static thirdGreenGenerator: ThirdGreenGenerator = new ThirdGreenGenerator();
  static fourthGreenGenerator: FourthGreenGenerator = new FourthGreenGenerator();
  static fifthGreenGenerator: FifthGreenGenerator = new FifthGreenGenerator();

  // Nuclear Decay Generators
  static firstNuclearDecayGenerator: FirstNuclearDecayGenerator = new FirstNuclearDecayGenerator();
  static secondNuclearDecayGenerator: SecondNuclearDecayGenerator = new SecondNuclearDecayGenerator();
  static thirdNuclearDecayGenerator: ThirdNuclearDecayGenerator = new ThirdNuclearDecayGenerator();

  // Yellow Purple Generators
  static firstYellowPurpleGenerator: FirstYellowPurpleGenerator = new FirstYellowPurpleGenerator();
  static secondYellowPurpleGenerator: SecondYellowPurpleGenerator = new SecondYellowPurpleGenerator();
  static thirdYellowPurpleGenerator: ThirdYellowPurpleGenerator = new ThirdYellowPurpleGenerator();

  // Green Purple Generators
  static firstGreenPurpleGenerator: FirstGreenPurpleGenerator = new FirstGreenPurpleGenerator();
  static secondGreenPurpleGenerator: SecondGreenPurpleGenerator = new SecondGreenPurpleGenerator();
  static thirdGreenPurpleGenerator: ThirdGreenPurpleGenerator = new ThirdGreenPurpleGenerator();

  // Purple Generators
  static firstPurpleGenerator: FirstPurpleGenerator = new FirstPurpleGenerator();
  static secondPurpleGenerator: SecondPurpleGenerator = new SecondPurpleGenerator();
  static thirdPurpleGenerator: ThirdPurpleGenerator = new ThirdPurpleGenerator();
  static fourthPurpleGenerator: FourthPurpleGenerator = new FourthPurpleGenerator();
  static fifthPurpleGenerator: FifthPurpleGenerator = new FifthPurpleGenerator();

  static firstBluePurpleGenerator: FirstBluePurpleGenerator = new FirstBluePurpleGenerator();
  static secondBluePurpleGenerator: SecondBluePurpleGenerator = new SecondBluePurpleGenerator();
  static thirdBluePurpleGenerator: ThirdBluePurpleGenerator = new ThirdBluePurpleGenerator();


  static override list: Generator[] = [
    GeneratorRecord.firstRedGenerator,
    GeneratorRecord.secondRedGenerator,
    GeneratorRecord.thirdRedGenerator,
    GeneratorRecord.fourthRedGenerator,
    GeneratorRecord.fifthRedGenerator,

    GeneratorRecord.firstAcceleratorGenerator,
    GeneratorRecord.secondAcceleratorGenerator,

    GeneratorRecord.firstRedPurpleGenerator,
    GeneratorRecord.secondRedPurpleGenerator,
    GeneratorRecord.thirdRedPurpleGenerator,

    GeneratorRecord.firstYellowGenerator,
    GeneratorRecord.secondYellowGenerator,
    GeneratorRecord.thirdYellowGenerator,
    GeneratorRecord.fourthYellowGenerator,
    GeneratorRecord.fifthYellowGenerator,

    GeneratorRecord.firstGreenGenerator,
    GeneratorRecord.secondGreenGenerator,
    GeneratorRecord.thirdGreenGenerator,
    GeneratorRecord.fourthGreenGenerator,
    GeneratorRecord.fifthGreenGenerator,

    GeneratorRecord.firstNuclearDecayGenerator,
    GeneratorRecord.secondNuclearDecayGenerator,
    GeneratorRecord.thirdNuclearDecayGenerator,

    GeneratorRecord.firstYellowPurpleGenerator,
    GeneratorRecord.secondYellowPurpleGenerator,
    GeneratorRecord.thirdYellowPurpleGenerator,

    GeneratorRecord.firstGreenPurpleGenerator,
    GeneratorRecord.secondGreenPurpleGenerator,
    GeneratorRecord.thirdGreenPurpleGenerator,

    GeneratorRecord.firstPurpleGenerator,
    GeneratorRecord.secondPurpleGenerator,
    GeneratorRecord.thirdPurpleGenerator,
    GeneratorRecord.fourthPurpleGenerator,
    GeneratorRecord.fifthPurpleGenerator,

    GeneratorRecord.firstBluePurpleGenerator,
    GeneratorRecord.secondBluePurpleGenerator,
    GeneratorRecord.thirdBluePurpleGenerator,
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

  getFirstAcceleratorGenerator(): FirstAcceleratorGenerator {
    return GeneratorRecord.firstAcceleratorGenerator;
  }

  getSecondAcceleratorGenerator(): SecondAcceleratorGenerator {
    return GeneratorRecord.secondAcceleratorGenerator;
  }

  getFirstYellowGenerator(): FirstYellowGenerator {
    return GeneratorRecord.firstYellowGenerator;
  }

  getSecondYellowGenerator(): SecondYellowGenerator {
    return GeneratorRecord.secondYellowGenerator;
  }

  getThirdYellowGenerator(): ThirdYellowGenerator {
    return GeneratorRecord.thirdYellowGenerator;
  }

  getFourthYellowGenerator(): FourthYellowGenerator {
    return GeneratorRecord.fourthYellowGenerator;
  }

  getFifthYellowGenerator(): FifthYellowGenerator {
    return GeneratorRecord.fifthYellowGenerator;
  }

  getFirstGreenGenerator(): FirstGreenGenerator {
    return GeneratorRecord.firstGreenGenerator;
  }

  getSecondGreenGenerator(): SecondGreenGenerator {
    return GeneratorRecord.secondGreenGenerator;
  }

  getThirdGreenGenerator(): ThirdGreenGenerator {
    return GeneratorRecord.thirdGreenGenerator;
  }

  getFourthGreenGenerator(): FourthGreenGenerator {
    return GeneratorRecord.fourthGreenGenerator;
  }

  getFifthGreenGenerator(): FifthGreenGenerator {
    return GeneratorRecord.fifthGreenGenerator;
  }

  getFirstNuclearDecayGenerator(): FirstNuclearDecayGenerator {
    return GeneratorRecord.firstNuclearDecayGenerator;
  }

  getSecondNuclearDecayGenerator(): SecondNuclearDecayGenerator {
    return GeneratorRecord.secondNuclearDecayGenerator;
  }

  getThirdNuclearDecayGenerator(): ThirdNuclearDecayGenerator {
    return GeneratorRecord.thirdNuclearDecayGenerator;
  }

  getFirstYellowPurpleGenerator(): FirstYellowPurpleGenerator {
    return GeneratorRecord.firstYellowPurpleGenerator;
  }

  getSecondYellowPurpleGenerator(): SecondYellowPurpleGenerator {
    return GeneratorRecord.secondYellowPurpleGenerator;
  }

  getThirdYellowPurpleGenerator(): ThirdYellowPurpleGenerator {
    return GeneratorRecord.thirdYellowPurpleGenerator;
  }

  getFirstGreenPurpleGenerator(): FirstGreenPurpleGenerator {
    return GeneratorRecord.firstGreenPurpleGenerator;
  }

  getSecondGreenPurpleGenerator(): SecondGreenPurpleGenerator {
    return GeneratorRecord.secondGreenPurpleGenerator;
  }

  getThirdGreenPurpleGenerator(): ThirdGreenPurpleGenerator {
    return GeneratorRecord.thirdGreenPurpleGenerator;
  }

  getFirstPurpleGenerator(): FirstPurpleGenerator {
    return GeneratorRecord.firstPurpleGenerator;
  }

  getSecondPurpleGenerator(): SecondPurpleGenerator {
    return GeneratorRecord.secondPurpleGenerator;
  }

  getThirdPurpleGenerator(): ThirdPurpleGenerator {
    return GeneratorRecord.thirdPurpleGenerator;
  }

  getFourthPurpleGenerator(): FourthPurpleGenerator {
    return GeneratorRecord.fourthPurpleGenerator;
  }

  getFifthPurpleGenerator(): FifthPurpleGenerator {
    return GeneratorRecord.fifthPurpleGenerator;
  }
}
