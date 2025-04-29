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
import {BoosterAccelerationUpgrade} from "../../features/upgrades/booster-acceleration-upgrade";
import {MultiplyRedAcceleratorEffectUpgrade} from "../../features/upgrades/multiply-red-accelerator-effect-upgrade";
import {MultiplyRedGeneratorsYellowUpgrade} from "../../features/upgrades/multiply-red-generators-yellow-upgrade";
import {MultiplyYellowParticlesYellowUpgrade} from "../../features/upgrades/multiply-yellow-particles-yellow-upgrade";
import {
  MultiplyRedGeneratorExtensionYellowUpgrade
} from "../../features/upgrades/multiply-red-generator-extension-yellow-upgrade";
import {
  RedGeneratorMultiplierYellowPrestigeYellowUpgrade
} from "../../features/upgrades/red-generator-multiplier-yellow-prestige-yellow-upgrade";

@Injectable({
  providedIn: 'root'
})
export class UpgradeRecord extends Record {

  // Red Generators
  static redGeneratorExtension: RedGeneratorExtensionUpgrade = new RedGeneratorExtensionUpgrade('redGeneratorExtension');
  static redGeneratorBooster: RedGeneratorBoosterUpgrade = new RedGeneratorBoosterUpgrade('redGeneratorBooster');

  // Red Accelerators
  static unlockRedAccelerators: UnlockRedAcceleratorsUpgrade = new UnlockRedAcceleratorsUpgrade('unlockRedAccelerators');
  static multiplyRedAcceleratorGeneration: MultiplyRedAcceletorGenerationUpgrade = new MultiplyRedAcceletorGenerationUpgrade('multiplyRedAcceleratorGeneration');
  static multiplyRedAcceleratorEffectUpgrade: MultiplyRedAcceleratorEffectUpgrade = new MultiplyRedAcceleratorEffectUpgrade('multiplyRedAcceleratorEffectUpgrade');
  static improveRedAcceleratorsEffect: ImproveRedAcceleratorsEffectUpgrade = new ImproveRedAcceleratorsEffectUpgrade('improveRedAcceleratorsEffect');
  static improveRedParticlesToAcceleratorsUpgrade: ImproveRedParticlesToAcceleratorsUpgrade = new ImproveRedParticlesToAcceleratorsUpgrade('improveRedParticlesToAcceleratorsUpgrade');
  static boosterAccelerationUpgrade: BoosterAccelerationUpgrade = new BoosterAccelerationUpgrade('boosterAccelerationUpgrade');

  // Yellow Upgrades
  static multiplyRedGeneratorsYellow: MultiplyRedGeneratorsYellowUpgrade = new MultiplyRedGeneratorsYellowUpgrade('multiplyRedGeneratorsYellow');
  static multiplyYellowParticlesYellow: MultiplyYellowParticlesYellowUpgrade = new MultiplyYellowParticlesYellowUpgrade('multiplyYellowParticlesYellow');
  static redGeneratorMultiplierYellowPrestigeYellow: RedGeneratorMultiplierYellowPrestigeYellowUpgrade = new RedGeneratorMultiplierYellowPrestigeYellowUpgrade('redGeneratorMultiplierYellowPrestigeYellow');
  static multiplyRedGeneratorExtensionYellow: MultiplyRedGeneratorExtensionYellowUpgrade = new MultiplyRedGeneratorExtensionYellowUpgrade('multiplyRedGeneratorExtensionYellow');

  static override list: Upgrade[] = [
    UpgradeRecord.redGeneratorExtension,
    UpgradeRecord.redGeneratorBooster,

    UpgradeRecord.unlockRedAccelerators,
    UpgradeRecord.multiplyRedAcceleratorGeneration,
    UpgradeRecord.multiplyRedAcceleratorEffectUpgrade,
    UpgradeRecord.improveRedAcceleratorsEffect,
    UpgradeRecord.improveRedParticlesToAcceleratorsUpgrade,
    UpgradeRecord.boosterAccelerationUpgrade,

    // Yellow Upgrades
    UpgradeRecord.multiplyRedGeneratorsYellow,
    UpgradeRecord.multiplyYellowParticlesYellow,
    UpgradeRecord.redGeneratorMultiplierYellowPrestigeYellow,
    UpgradeRecord.multiplyRedGeneratorExtensionYellow,
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
