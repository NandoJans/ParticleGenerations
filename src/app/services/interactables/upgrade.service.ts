import { Injectable } from '@angular/core';
import {UpgradeRecord} from "../../classes/records/upgrades/upgrade-record";
import {GeneratorRecord} from "../../classes/records/generators/generator-record";
@Injectable({
  providedIn: 'root'
})
export class UpgradeService {
  constructor(
    private upgradeRecord: UpgradeRecord,
    private generatorRecord: GeneratorRecord,
  ) {
  }

  tick() {
    this.runActions();
  }

  private runActions() {
    this.upgradeRecord.getList().forEach(upgrade => {
      if (upgrade.isUnlocked()) {
        upgrade.run();
      }
    });

    this.generatorRecord.getList().forEach(generator => {
      if (generator.isUnlocked()) {
        generator.getUpgrades().forEach(upgrade => {
          if (upgrade.isUnlocked()) {
            upgrade.run();
          }
        });
      }
    });
  }
}
