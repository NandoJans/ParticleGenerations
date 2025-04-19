import {Record} from "../record";
import {Upgrade} from "../../features/upgrade";
import {RedGeneratorExtensionUpgrade} from "../../features/upgrades/red-generator-extension-upgrade";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpgradeRecord extends Record {

  static redGeneratorExtension: RedGeneratorExtensionUpgrade = new RedGeneratorExtensionUpgrade();


  static override list: Upgrade[] = [
  ]

  getList(): Upgrade[] {
    return UpgradeRecord.list;
  }

  save() {
    this.getList().forEach(upgrade => {
      if (upgrade.isUnlocked()) {
        upgrade.save();
      }
    });
  }

  load() {
    this.getList().forEach(upgrade => {
      upgrade.tryLoad();
    });
  }
}
