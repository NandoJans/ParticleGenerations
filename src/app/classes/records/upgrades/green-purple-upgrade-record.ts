import {Record} from "../record";
import {Upgrade} from "../../features/upgrade";
import {UpgradeRecord} from "./upgrade-record";

export class GreenPurpleUpgradeRecord extends Record {
  static override list: Upgrade[] = [
    UpgradeRecord.greenPurpleBufferUpgrade,
    UpgradeRecord.greenPurpleBoosterUpgrade,
  ];

  getList(): Upgrade[] {
    return GreenPurpleUpgradeRecord.list;
  }
}
