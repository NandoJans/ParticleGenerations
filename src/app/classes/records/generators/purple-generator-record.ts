import {Record} from "../record";
import {Generator} from "../../features/generator";

export class PurpleGeneratorRecord extends Record {
  // The purple generator tier has not been implemented yet. Using an empty
  // list here prevents the application from trying to access undefined
  // properties on `GeneratorRecord` during startup.
  static override list: Generator[] = [];

  override getList(): Generator[] {
    return PurpleGeneratorRecord.list;
  }
}
