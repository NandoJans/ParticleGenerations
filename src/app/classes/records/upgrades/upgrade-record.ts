import {Record} from "../record";
import {Upgrade} from "../../features/upgrade";
import {RedGeneratorExtensionUpgrade} from "../../features/upgrades/red-generator-extension-upgrade";
import { Injectable } from '@angular/core';
import {RedGeneratorBoosterUpgrade} from "../../features/upgrades/red-generator-booster-upgrade";

@Injectable({
  providedIn: 'root'
})
export class UpgradeRecord extends Record {

  static redGeneratorExtension: RedGeneratorExtensionUpgrade = new RedGeneratorExtensionUpgrade();
  static redGeneratorBooster: RedGeneratorBoosterUpgrade = new RedGeneratorBoosterUpgrade();

  static override list: Upgrade[] = [
    UpgradeRecord.redGeneratorExtension,
    UpgradeRecord.redGeneratorBooster
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
