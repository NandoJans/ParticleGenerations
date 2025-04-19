import { Injectable } from '@angular/core';
import {GeneratorService} from "./generator.service";
import {UpgradeService} from "./upgrade.service";
import {Num} from "../../num";
import {HoldingsService} from "../holdings.service";
import {DataManagerService} from "../data-manager.service";
import {ChallengeService} from "./challenge.service";
import {AutomatorService} from "./automator.service";
import {MilestoneService} from "./milestone.service";
import {PrestigeLayersService} from "../prestige-layers.service";
import {CombinerService} from "./combiner.service";
import {App} from "../../App";
import {NavigationsService} from "../navigations.service";

@Injectable({
  providedIn: 'root'
})
export class ResetService {
  reset(resets: string) {

  }
}
