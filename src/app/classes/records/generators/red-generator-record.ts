import {Record} from "../record";
import {Generator} from "../../features/generator";

export class RedGeneratorRecord extends Record {
  static override list: Generator[] = [];

  getList(): Generator[] {
    return RedGeneratorRecord.list;
  }
}
