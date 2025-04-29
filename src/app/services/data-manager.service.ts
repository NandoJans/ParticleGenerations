import {Injectable} from '@angular/core';
import {NavigationsService} from "./navigations.service";
import {HoldingRecord} from "../classes/records/holdings/holding-record";
import {GeneratorRecord} from "../classes/records/generators/generator-record";
import {UpgradeRecord} from "../classes/records/upgrades/upgrade-record";
import {LocalStorageHelper} from "../classes/helpers/local-storage-helper";
import {AutomatorService} from "./interactables/automator.service";
import {PrestigeLayersService} from "./prestige-layers.service";
import {TimelineService} from "./timeline.service";

@Injectable({
  providedIn: 'root'
})
export class DataManagerService {
  localStorageHelper: LocalStorageHelper = new LocalStorageHelper('app', 'lastSave');

  constructor(
    private holdingRecord: HoldingRecord,
    private generatorRecord: GeneratorRecord,
    private upgradeRecord: UpgradeRecord,
    private navigationsService: NavigationsService,
    private automatorService: AutomatorService,
    private prestigeLayersService: PrestigeLayersService,
    private timelineService: TimelineService,
  ) {
  }

  save() {
    console.log('Saving data...');
    this.holdingRecord.save()
    this.generatorRecord.save()
    this.upgradeRecord.save()
    this.navigationsService.save();
    this.automatorService.save();
    this.prestigeLayersService.save();
    this.timelineService.save();

    this.setLastSave();
    this.localStorageHelper.store();
  }

  load() {
    console.log('Loading data...');
    this.holdingRecord.load();
    this.generatorRecord.load();
    this.upgradeRecord.load();
    this.navigationsService.load();
    this.automatorService.load();
    this.prestigeLayersService.load();
    this.timelineService.load();
  }

  setLastSave(): void {
    this.localStorageHelper.save(new Date().toISOString());
  }
}
