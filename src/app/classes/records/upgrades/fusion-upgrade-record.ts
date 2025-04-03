import {Record} from "../record";
import {Upgrade} from "../../features/upgrade";
import {UpgradeRecord} from "./upgrade-record";

export class FusionUpgradeRecord extends Record {
  static override list: Upgrade[] = [
    UpgradeRecord.accelerateYellowFusion,
    UpgradeRecord.increaseYellowFusion,
  ]

  getList(): Upgrade[] {
    return FusionUpgradeRecord.list;
  }
}
