import {Record} from "../record";
import {Upgrade} from "../../features/upgrade";
import {UpgradeRecord} from "./upgrade-record";

export class BlackHoleUpgradeRecord extends Record {
  static override list: Upgrade[] = [
    UpgradeRecord.increaseBlackHoleSize,
    UpgradeRecord.increaseBlackHoleMass,
    UpgradeRecord.increaseBlackHoleGravity,
  ];

  override getList(): Upgrade[] {
    return BlackHoleUpgradeRecord.list;
  }
}
