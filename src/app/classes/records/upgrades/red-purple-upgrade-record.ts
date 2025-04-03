import {Record} from "../record";
import {UpgradeRecord} from "./upgrade-record";
import {Upgrade} from "../../features/upgrade";

export class RedPurpleUpgradeRecord extends Record {
  static override list: Upgrade[] = [
    UpgradeRecord.redPurpleBoosterUpgrade,
    UpgradeRecord.redPurpleBufferUpgrade,
  ];

  getList(): Upgrade[] {
    return RedPurpleUpgradeRecord.list;
  }
}
