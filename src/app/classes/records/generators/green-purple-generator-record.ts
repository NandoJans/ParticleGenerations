import {Record} from "../record";
import {Generator} from "../../features/generator";
import {GeneratorRecord} from "./generator-record";

export class GreenPurpleGeneratorRecord extends Record {
  static override list: Generator[] = [
    GeneratorRecord.firstGreenPurpleGenerator,
    GeneratorRecord.secondGreenPurpleGenerator,
    GeneratorRecord.thirdGreenPurpleGenerator,
  ];

  getList(): Generator[] {
    return GreenPurpleGeneratorRecord.list;
  }
}
