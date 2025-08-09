import {Record} from "../record";
import {Generator} from "../../features/generator";
import {GeneratorRecord} from "./generator-record";

export class AcceleratorGeneratorRecord extends Record {

  // Only a single red accelerator generator exists. The previous references to
  // `firstAcceleratorGenerator` and `secondAcceleratorGenerator` pointed to
  // non‑existent members on `GeneratorRecord`, leading to runtime errors. Use
  // the correct `redAcceleratorGenerator` instead.
  static override list: Generator[] = [
    GeneratorRecord.redAcceleratorGenerator
  ];

  getList(): Generator[] {
    return AcceleratorGeneratorRecord.list;
  }

}
