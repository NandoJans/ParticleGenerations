import {Record} from "../record";
import {Generator} from "../../features/generator";

export class YellowPurpleGeneratorRecord extends Record {
  // Placeholder record for future yellow/purple generators. Using an empty
  // list prevents accesses to undefined members on `GeneratorRecord`.
  static override list: Generator[] = [];

  getList(): Generator[] {
    return YellowPurpleGeneratorRecord.list;
  }
}
