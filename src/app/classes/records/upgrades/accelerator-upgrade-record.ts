import {Record} from "../record";
import {UpgradeRecord} from "./upgrade-record";
import {Upgrade} from "../../features/upgrade";

export class AcceleratorUpgradeRecord extends Record {

  static override list: Upgrade[] = [
    UpgradeRecord.firstRedAcceleratorMultiplier,
    UpgradeRecord.secondRedAcceleratorMultiplier,
    UpgradeRecord.thirdRedAcceleratorMultiplier,
  ];

  getList(): Upgrade[] {
    return AcceleratorUpgradeRecord.list;
  }
}
