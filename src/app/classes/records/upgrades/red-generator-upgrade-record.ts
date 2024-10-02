import {Record} from "../record";
import {Upgrade} from "../../features/upgrade";
import {UpgradeRecord} from "./upgrade-record";

export class RedGeneratorUpgradeRecord extends Record {
  static override list: Upgrade[] = [
    UpgradeRecord.redGeneratorExtension,
    UpgradeRecord.redGeneratorBooster
  ];

  override getList(): Upgrade[] {
    return RedGeneratorUpgradeRecord.list;
  }
}
