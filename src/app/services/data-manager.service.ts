import { Injectable } from '@angular/core';
import {HoldingsService} from "./holdings.service";
import {GeneratorService} from "./interactables/generator.service";
import {UpgradeService} from "./interactables/upgrade.service";
import {NavigationsService} from "./navigations.service";
import {PrestigeLayersService} from "./prestige-layers.service";
import {MilestoneService} from "./interactables/milestone.service";
import {ChallengeService} from "./interactables/challenge.service";
import {AutomatorService} from "./interactables/automator.service";

@Injectable({
  providedIn: 'root'
})
export class DataManagerService {

  constructor() { }

  static save() {
    HoldingsService.save();
    GeneratorService.save();
    UpgradeService.save();
    NavigationsService.save();
    PrestigeLayersService.save();
    ChallengeService.save();
    AutomatorService.save();
  }

  static load() {
    HoldingsService.load();
    GeneratorService.load();
    UpgradeService.load();
    PrestigeLayersService.load();
    NavigationsService.load();
    ChallengeService.load();
    AutomatorService.load();
  }
}
