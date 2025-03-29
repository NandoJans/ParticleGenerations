import {Record} from "../../classes/records/record";
import {Generator} from "../../classes/features/generator";
import {GeneratorRecord} from "../../classes/records/generators/generator-record";

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
