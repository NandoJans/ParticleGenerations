import {GeneratorRecord} from "./generator-record";
import {Generator} from "../../features/generator";
import {Record} from "../record";

export class AcceleratorGeneratorRecord extends Record {

  static override list: Generator[] = [
    GeneratorRecord.firstAcceleratorGenerator,
    GeneratorRecord.secondAcceleratorGenerator
  ];

  getList(): Generator[] {
    return AcceleratorGeneratorRecord.list;
  }

}
