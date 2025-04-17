import {Record} from "../record";
import {Upgrade} from "../../features/upgrade";
import {UpgradeRecord} from "./upgrade-record";

export class BluePurpleUpgradeRecord extends Record {
  static override list: Upgrade[] = [
    UpgradeRecord.bluePurpleBoosterUpgrade,
    UpgradeRecord.bluePurpleBufferUpgrade,
  ];

  override getList(): Upgrade[] {
    return BluePurpleUpgradeRecord.list;
  }
}
