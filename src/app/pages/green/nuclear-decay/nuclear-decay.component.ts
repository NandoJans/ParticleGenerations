import { Component, OnInit } from '@angular/core';
import {GeneratorService} from "../../../services/interactables/generator.service";
import {Num} from "../../../num";
import {UpgradeService} from "../../../services/interactables/upgrade.service";
import {HoldingsService} from "../../../services/holdings.service";
import {ResetService} from "../../../services/interactables/reset.service";
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";
import {Generator} from "../../../classes/features/generator";
import {Upgrade} from "../../../classes/features/upgrade";
import {GeneratorRecord} from "../../../classes/records/generators/generator-record";
import {UpgradeRecord} from "../../../classes/records/upgrades/upgrade-record";

@Component({
  selector: 'app-nuclear-decay',
  templateUrl: './nuclear-decay.component.html',
  styleUrls: ['./nuclear-decay.component.css']
})
export class NuclearDecayComponent {
  generators: Generator[] = [
    GeneratorRecord.firstNuclearDecayGenerator,
    GeneratorRecord.secondNuclearDecayGenerator,
    GeneratorRecord.thirdNuclearDecayGenerator,
  ];
  upgrades: Upgrade[] = [
    UpgradeRecord.nuclearDecayBooster,
    UpgradeRecord.nuclearDecayIncreaser,
    UpgradeRecord.betterNuclearDecay,
  ];
  enoughSacrificeUpgrades = !HoldingsService.get('limitedUpgradeCount').greq(new Num(1, 1));

  constructor(
    public holdingRecord: HoldingRecord,
  ) { }

  respecSouls() {
    HoldingsService.set('nuclearDecay', new Num(1, 0))
  }
}
