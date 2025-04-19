import { Component } from '@angular/core';
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";
import {GeneratorRecord} from "../../../classes/records/generators/generator-record";
import {Upgrade} from "../../../classes/features/upgrade";
import {Generator} from "../../../classes/features/generator";

@Component({
  selector: 'app-purple-generators',
  templateUrl: './purple-generators.component.html',
  styleUrls: ['./purple-generators.component.css']
})
export class PurpleGeneratorsComponent {
  upgrades: Upgrade[] = [

  ]
  generators: Generator[] = [
    GeneratorRecord.firstPurpleGenerator,
    GeneratorRecord.secondPurpleGenerator,
    GeneratorRecord.thirdPurpleGenerator,
    GeneratorRecord.fourthPurpleGenerator,
    GeneratorRecord.fifthPurpleGenerator,
  ];
  holding = HoldingRecord.purpleVoid;
}
