import {Injectable} from '@angular/core';
import {HoldingsService} from "../holdings.service";
import {GeneratorService} from "./generator.service";
import {Num} from "../../num";
import {ResetService} from "./reset.service";
import {UpgradeService} from "./upgrade.service";
import {AutomatorService} from "./automator.service";
import {NavigationsService} from "../navigations.service";
import {Upgrade} from "../../classes/features/upgrade";
import {Generator} from "../../classes/features/generator";
import {GeneratorRecord} from "../../classes/records/generators/generator-record";
import {UpgradeRecord} from "../../classes/records/upgrades/upgrade-record";

@Injectable({
  providedIn: 'root'
})
export class BuyableService {
}
