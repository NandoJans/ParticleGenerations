import {Record} from "../record";
import {Charger} from "../../features/charger";
import {RedGeneratorDarkStarCharger} from "../../features/chargers/red-generator-dark-star-charger";

export class ChargerRecord extends Record {
  static redGeneratorDarkCharger: RedGeneratorDarkStarCharger = new RedGeneratorDarkStarCharger('red-generator-dark-star-charger');

  static override list: Charger[] = [];

  getList(): Charger[] {
    return ChargerRecord.list;
  }
}
