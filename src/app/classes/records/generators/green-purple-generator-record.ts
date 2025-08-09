import {Record} from "../record";
import {Generator} from "../../features/generator";

export class GreenPurpleGeneratorRecord extends Record {
  // No green/purple generators have been implemented yet. Keeping the list
  // empty avoids referencing undefined properties on `GeneratorRecord`, which
  // caused runtime and compile time errors when this record was loaded.
  static override list: Generator[] = [];

  getList(): Generator[] {
    return GreenPurpleGeneratorRecord.list;
  }
}
