import {Record} from "../record";
import {Generator} from "../../features/generator";
import {GeneratorRecord} from "./generator-record";

export class YellowPurpleGeneratorRecord extends Record {
  static override list: Generator[] = [
    GeneratorRecord.firstYellowPurpleGenerator,
    GeneratorRecord.secondYellowPurpleGenerator,
    GeneratorRecord.thirdYellowPurpleGenerator,
  ];

  getList(): Generator[] {
    return [];
  }
}
