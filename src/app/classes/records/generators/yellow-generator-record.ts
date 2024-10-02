import {Record} from "../record";
import {Generator} from "../../features/generator";
import {GeneratorRecord} from "./generator-record";

export class YellowGeneratorRecord extends Record {
  static override list: Generator[] = [
    GeneratorRecord.firstYellowGenerator,
    GeneratorRecord.secondYellowGenerator,
    GeneratorRecord.thirdYellowGenerator,
    GeneratorRecord.fourthYellowGenerator,
    GeneratorRecord.fifthYellowGenerator
  ]

  getList(): Generator[] {
    return YellowGeneratorRecord.list;
  }
}
