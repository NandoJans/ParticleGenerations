import {Record} from "../record";
import {Upgrade} from "../../features/upgrade";
import {UpgradeRecord} from "./upgrade-record";

export class YellowPurpleUpgradeRecord extends Record {
  static override list: Upgrade[] = [
    UpgradeRecord.yellowPurpleBufferUpgrade,
    UpgradeRecord.yellowPurpleBoosterUpgrade,
  ];

  getList(): Upgrade[] {
    return YellowPurpleUpgradeRecord.list;
  }
}
