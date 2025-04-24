import {Injectable} from '@angular/core';
import {NavigationsService} from "./navigations.service";
import {HoldingRecord} from "../classes/records/holdings/holding-record";
import {GeneratorRecord} from "../classes/records/generators/generator-record";
import {UpgradeRecord} from "../classes/records/upgrades/upgrade-record";

@Injectable({
  providedIn: 'root'
})
export class DataManagerService {

  constructor(
    private holdingRecord: HoldingRecord,
    private generatorRecord: GeneratorRecord,
    private upgradeRecord: UpgradeRecord,
    private navigationsService: NavigationsService,
  ) {
  }

  save() {
    console.log('Saving data...');
    this.holdingRecord.save()
    this.generatorRecord.save()
    this.upgradeRecord.save()
    this.navigationsService.save();
  }

  load() {
    console.log('Loading data...');
    this.holdingRecord.load();
    this.generatorRecord.load();
    this.upgradeRecord.load();
    this.navigationsService.load();
  }
}
