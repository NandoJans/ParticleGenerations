import {Record} from "../../classes/records/record";
import {Upgrade} from "../../classes/features/upgrade";
import {UpgradeRecord} from "../../classes/records/upgrades/upgrade-record";

export class YellowPurpleUpgradeRecord extends Record {
  static override list: Upgrade[] = [
    UpgradeRecord.yellowPurpleBufferUpgrade,
    UpgradeRecord.yellowPurpleBoosterUpgrade,
  ];

  getList(): Upgrade[] {
    return YellowPurpleUpgradeRecord.list;
  }
}
