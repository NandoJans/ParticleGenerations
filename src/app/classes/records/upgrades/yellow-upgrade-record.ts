import {UpgradeRecord} from "./upgrade-record";
import {Upgrade} from "../../features/upgrade";
import {Record} from "../record";

export class YellowUpgradeRecord extends Record {
  static override list: Upgrade[] = [
    UpgradeRecord.yellowRepeatableMultiplier,
    UpgradeRecord.yellowParticleMultiplier,
    UpgradeRecord.yellowBasedMultiplier,
    UpgradeRecord.yellowBasedAcceleratorMultiplier,
    UpgradeRecord.increaseRedGeneratorMultiplier,
    UpgradeRecord.firstIncreaseRedAcceleratorUpgrade,
    UpgradeRecord.secondIncreaseRedAcceleratorUpgrade,
    UpgradeRecord.thirdIncreaseRedAcceleratorUpgrade,
    UpgradeRecord.increaseRedGeneratorExtension,
    UpgradeRecord.increaseRedGeneratorBooster,
    UpgradeRecord.startWithRedAccelerators,
  ]

  getList(): Upgrade[] {
    return YellowUpgradeRecord.list;
  }
}
