import {Record} from "../../classes/records/record";
import {Upgrade} from "../../classes/features/upgrade";
import {UpgradeRecord} from "../../classes/records/upgrades/upgrade-record";

export class FusionUpgradeRecord extends Record {
  static override list: Upgrade[] = [
    UpgradeRecord.accelerateYellowFusion,
    UpgradeRecord.increaseYellowFusion,
  ]

  getList(): Upgrade[] {
    return FusionUpgradeRecord.list;
  }
}
