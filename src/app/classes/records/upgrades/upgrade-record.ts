import {RedGeneratorExtensionUpgrade} from "../../features/upgrades/red-generator-extension-upgrade";

export class UpgradeRecord {
  // Red Upgrades
  static redGeneratorExtension = new RedGeneratorExtensionUpgrade();

  getRedGeneratorExtension(): RedGeneratorExtensionUpgrade {
    return UpgradeRecord.redGeneratorExtension;
  }
}
