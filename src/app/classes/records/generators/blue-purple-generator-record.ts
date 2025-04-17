import {Record} from "../record";
import {Generator} from "../../features/generator";
import {GeneratorRecord} from "./generator-record";

export class BluePurpleGeneratorRecord extends Record {
  static override list: Generator[] = [
    GeneratorRecord.firstBluePurpleGenerator,
    GeneratorRecord.secondBluePurpleGenerator,
    GeneratorRecord.thirdBluePurpleGenerator,
  ];

  override getList(): Generator[] {
    return BluePurpleGeneratorRecord.list;
  }
}
