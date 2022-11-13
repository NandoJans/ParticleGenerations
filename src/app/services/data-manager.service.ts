import { Injectable } from '@angular/core';
import {HoldingsService} from "./holdings.service";
import {GeneratorService} from "./interactables/generator.service";
import {UpgradeService} from "./interactables/upgrade.service";
import {NavigationsService} from "./navigations.service";
import {PrestigeLayersService} from "./prestige-layers.service";
import {MilestoneService} from "./interactables/milestone.service";

@Injectable({
  providedIn: 'root'
})
export class DataManagerService {

  constructor() { }

  static save() {
    HoldingsService.save();
    GeneratorService.save();
    UpgradeService.save();
    //MilestoneService.save();
    NavigationsService.save();
    PrestigeLayersService.save();
  }

  static load() {
    HoldingsService.load();
    GeneratorService.load();
    UpgradeService.load();
    //MilestoneService.load();
    PrestigeLayersService.load();
    NavigationsService.load();
  }
}
