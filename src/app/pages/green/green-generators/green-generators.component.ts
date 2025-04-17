import { Component, OnInit } from '@angular/core';
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";
import {Generator} from "../../../classes/features/generator";
import {Upgrade} from "../../../classes/features/upgrade";
import {GeneratorRecord} from "../../../classes/records/generators/generator-record";
import {UpgradeRecord} from "../../../classes/records/upgrades/upgrade-record";

@Component({
  selector: 'app-green-generators',
  templateUrl: './green-generators.component.html',
  styleUrls: ['./green-generators.component.css']
})
export class GreenGeneratorsComponent {
  generators: Generator[] = [
    GeneratorRecord.firstGreenGenerator,
    GeneratorRecord.secondGreenGenerator,
    GeneratorRecord.thirdGreenGenerator,
    GeneratorRecord.fourthGreenGenerator,
    GeneratorRecord.fifthGreenGenerator,
  ];
  upgrades: Upgrade[] = [
    UpgradeRecord.greenParticleMultiplier
  ];

  constructor(
    public holdingRecord: HoldingRecord
  ) { }

}
