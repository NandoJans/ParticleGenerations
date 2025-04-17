import {Record} from "../record";
import {Generator} from "../../features/generator";
import {GeneratorRecord} from "./generator-record";

export class PurpleGeneratorRecord extends Record {
  static override list: Generator[] = [
    GeneratorRecord.firstPurpleGenerator,
    GeneratorRecord.secondPurpleGenerator,
    GeneratorRecord.thirdPurpleGenerator,
    GeneratorRecord.fourthPurpleGenerator,
    GeneratorRecord.fifthPurpleGenerator,
  ];

  override getList(): Generator[] {
    return PurpleGeneratorRecord.list;
  }
}
