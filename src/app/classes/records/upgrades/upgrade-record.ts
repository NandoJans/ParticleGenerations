import {Record} from "../record";
import {Upgrade} from "../../features/upgrade";
import {RedGeneratorExtensionUpgrade} from "../../features/upgrades/red-generator-extension-upgrade";
import { Injectable } from '@angular/core';
import {RedGeneratorBoosterUpgrade} from "../../features/upgrades/red-generator-booster-upgrade";
import {UnlockRedAcceleratorsUpgrade} from "../../features/upgrades/unlock-red-accelerators-upgrade";

@Injectable({
  providedIn: 'root'
})
export class UpgradeRecord extends Record {

  // Red Generators
  static redGeneratorExtension: RedGeneratorExtensionUpgrade = new RedGeneratorExtensionUpgrade();
  static redGeneratorBooster: RedGeneratorBoosterUpgrade = new RedGeneratorBoosterUpgrade();

  // Red Accelerators
  static unlockRedAccelerators: UnlockRedAcceleratorsUpgrade = new UnlockRedAcceleratorsUpgrade()

  static override list: Upgrade[] = [
    UpgradeRecord.redGeneratorExtension,
    UpgradeRecord.redGeneratorBooster,
    UpgradeRecord.unlockRedAccelerators
  ]

  getList(): Upgrade[] {
    return UpgradeRecord.list;
  }

  save() {
    this.getList().forEach(upgrade => {
      upgrade.save();
    });
  }

  load() {
    this.getList().forEach(upgrade => {
      upgrade.tryLoad();
    });
  }
}
