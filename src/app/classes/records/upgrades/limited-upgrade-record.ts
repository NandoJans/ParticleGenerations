import {Record} from "../record";
import {Upgrade} from "../../features/upgrade";
import {UpgradeRecord} from "./upgrade-record";

export class LimitedUpgradeRecord extends Record {
  static override list: Upgrade[] = [
    UpgradeRecord.redAcceleratorBuffer,
    UpgradeRecord.greenGeneratorsEnergyBased,
    UpgradeRecord.acceleratorYellowPowerBased,
    UpgradeRecord.greenGeneratorsBased,
    UpgradeRecord.redGeneratorsBoosterIncrease,
    UpgradeRecord.greenBuffsYellowGenerators,
    UpgradeRecord.fusionBoostRedGenerators,
    UpgradeRecord.removeFusionLimit,
    UpgradeRecord.superIncreaseFusion,
    UpgradeRecord.nerfDarkAge,
    UpgradeRecord.yellowIdleGain,
];

  override getList(): Upgrade[] {
    return [];
  }
}
