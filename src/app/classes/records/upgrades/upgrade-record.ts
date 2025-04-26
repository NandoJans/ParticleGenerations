import {Record} from "../record";
import {Upgrade} from "../../features/upgrade";
import {RedGeneratorExtensionUpgrade} from "../../features/upgrades/red-generator-extension-upgrade";
import { Injectable } from '@angular/core';
import {RedGeneratorBoosterUpgrade} from "../../features/upgrades/red-generator-booster-upgrade";
import {UnlockRedAcceleratorsUpgrade} from "../../features/upgrades/unlock-red-accelerators-upgrade";
import {MultiplyRedAcceletorGenerationUpgrade} from "../../features/upgrades/multiply-red-acceletor-generation-upgrade";
import {ImproveRedAcceleratorsEffectUpgrade} from "../../features/upgrades/improve-red-accelerators-effect-upgrade";
import {
  ImproveRedParticlesToAcceleratorsUpgrade
} from "../../features/upgrades/improve-red-particles-to-accelerators-upgrade";

@Injectable({
  providedIn: 'root'
})
export class UpgradeRecord extends Record {

  // Red Generators
  static redGeneratorExtension: RedGeneratorExtensionUpgrade = new RedGeneratorExtensionUpgrade();
  static redGeneratorBooster: RedGeneratorBoosterUpgrade = new RedGeneratorBoosterUpgrade();

  // Red Accelerators
  static unlockRedAccelerators: UnlockRedAcceleratorsUpgrade = new UnlockRedAcceleratorsUpgrade()
  static multiplyRedAcceleratorGeneration: MultiplyRedAcceletorGenerationUpgrade = new MultiplyRedAcceletorGenerationUpgrade();
  static improveRedAcceleratorsEffect: ImproveRedAcceleratorsEffectUpgrade = new ImproveRedAcceleratorsEffectUpgrade();
  static improveRedParticlesToAcceleratorsUpgrade: ImproveRedParticlesToAcceleratorsUpgrade = new ImproveRedParticlesToAcceleratorsUpgrade();

  static override list: Upgrade[] = [
    UpgradeRecord.redGeneratorExtension,
    UpgradeRecord.redGeneratorBooster,

    UpgradeRecord.unlockRedAccelerators,
    UpgradeRecord.multiplyRedAcceleratorGeneration,
    UpgradeRecord.improveRedAcceleratorsEffect,
    UpgradeRecord.improveRedParticlesToAcceleratorsUpgrade
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
