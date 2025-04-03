import {Record} from "../record";
import {GeneratorRecord} from "./generator-record";
import {Generator} from "../../features/generator";

export class RedPurpleGeneratorRecord extends Record {
  static override list: Generator[] = [
    GeneratorRecord.firstRedPurpleGenerator,
    GeneratorRecord.secondRedPurpleGenerator,
    GeneratorRecord.thirdRedPurpleGenerator,
  ];

  getList(): Generator[] {
    return RedPurpleGeneratorRecord.list;
  }
}
