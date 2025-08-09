import {Record} from "../record";
import {Generator} from "../../features/generator";

export class RedPurpleGeneratorRecord extends Record {
  // Red/purple generators are not yet defined. Use an empty list to avoid
  // referencing undefined members on `GeneratorRecord`.
  static override list: Generator[] = [];

  getList(): Generator[] {
    return RedPurpleGeneratorRecord.list;
  }
}
