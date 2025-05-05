import { Injectable } from '@angular/core';
import {UpgradeRecord} from "../../classes/records/upgrades/upgrade-record";
import {GeneratorRecord} from "../../classes/records/generators/generator-record";
import {Generator} from "../../classes/features/generator";
import {Upgrade} from "../../classes/features/upgrade";
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
      upgrade.run();
    });

    this.generatorRecord.getList().forEach(generator => {
      generator.getUpgrades().forEach(upgrade => {
        upgrade.run();
      });
    });
  }

  getElements(): Upgrade[] {
    return this.upgradeRecord.getList();
  }
}
