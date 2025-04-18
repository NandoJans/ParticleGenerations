import { Component } from '@angular/core';
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";
import {Upgrade} from "../../../classes/features/upgrade";
import {Generator} from "../../../classes/features/generator";
import {GeneratorRecord} from "../../../classes/records/generators/generator-record";
import {UpgradeRecord} from "../../../classes/records/upgrades/upgrade-record";

@Component({
  selector: 'app-blue-neutrons',
  templateUrl: './blue-neutrons.component.html',
  styleUrls: ['./blue-neutrons.component.css']
})
export class BlueNeutronsComponent {
  generators: Generator[] = [
    GeneratorRecord.firstBlueNeutronGenerator,
    GeneratorRecord.secondBlueNeutronGenerator,
    GeneratorRecord.thirdBlueNeutronGenerator,
  ];
  upgrades: Upgrade[] = [
    UpgradeRecord.blueNeutronAmplifier,
    UpgradeRecord.firstBlueNeutronGeneratorBoost,
    UpgradeRecord.secondBlueNeutronGeneratorBoost,
  ];

  constructor(
    public holdingRecord: HoldingRecord
  ) { }

}
