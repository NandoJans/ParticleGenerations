import {Record} from "../record";
import {Upgrade} from "../../features/upgrade";
import {UpgradeRecord} from "./upgrade-record";

export class RedUpgradeRecord extends Record {
  static override list: Upgrade[] = [
    UpgradeRecord.improveRedGeneratorExtension,
    UpgradeRecord.unlockRedGeneratorBooster,
    UpgradeRecord.redAcceleratorParticleBased,
    UpgradeRecord.redBoosterMultiplier,
    UpgradeRecord.redBoosterScaling,
    UpgradeRecord.firstRedAcceleratorBooster,
    UpgradeRecord.secondRedAcceleratorBooster,
    UpgradeRecord.thirdRedAcceleratorBooster,
  ]

  override getList(): Upgrade[] {
    return RedUpgradeRecord.list;
  }
}
