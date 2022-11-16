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
    if (localStorage['holdings'] !== undefined) HoldingsService.load();
    if (localStorage['generators'] !== undefined) GeneratorService.load();
    if (localStorage['upgrades'] !== undefined) UpgradeService.load();
    if (localStorage['prestiges'] !== undefined) PrestigeLayersService.load();
    if (localStorage['navigations'] !== undefined) NavigationsService.load();
    if (localStorage['challenges'] !== undefined) ChallengeService.load();
    if (localStorage['automators'] !== undefined)  AutomatorService.load();
  }
}
