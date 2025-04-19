import {Injectable} from '@angular/core';
import {NavigationsService} from "./navigations.service";
import {PrestigeLayersService} from "./prestige-layers.service";
import {ChallengeService} from "./interactables/challenge.service";
import {AutomatorService} from "./interactables/automator.service";
import {CombinerService} from "./interactables/combiner.service";
import {BlackHoleService} from "./black-hole.service";
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
    this.holdingRecord.save()
    this.generatorRecord.save()
    this.upgradeRecord.save()
    this.navigationsService.save();
    ChallengeService.save();
    CombinerService.save();
    BlackHoleService.save();
  }

  load() {
    if (localStorage['holdings'] !== undefined) this.holdingRecord.load();
    if (localStorage['generators'] !== undefined) this.generatorRecord.load();
    if (localStorage['upgrades'] !== undefined) this.upgradeRecord.load();
    // if (localStorage['prestiges'] !== undefined) PrestigeLayersService.load();
    if (localStorage['navigations'] !== undefined) this.navigationsService.load();
    if (localStorage['challenges'] !== undefined) ChallengeService.load();
    // if (localStorage['automators'] !== undefined) AutomatorService.load();
    if (localStorage['blackHoleStatus'] !== undefined) BlackHoleService.load();
    if (localStorage['combiners'] !== undefined && localStorage['combinations'] !== undefined) CombinerService.load();
  }
}
