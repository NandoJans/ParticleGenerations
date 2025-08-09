import {Record} from "../record";
import {Generator} from "../../features/generator";

export class BluePurpleGeneratorRecord extends Record {
  // Blue/purple generators have not been introduced. Keep the list empty to
  // avoid referencing undefined properties on `GeneratorRecord`.
  static override list: Generator[] = [];

  override getList(): Generator[] {
    return BluePurpleGeneratorRecord.list;
  }
}
