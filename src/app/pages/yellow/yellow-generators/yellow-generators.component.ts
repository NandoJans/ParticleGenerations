import { Component, OnInit } from '@angular/core';
import {Holding} from "../../../classes/features/holding";
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";
import {GeneratorRecord} from "../../../classes/records/generators/generator-record";
import {YellowGenerator} from "../../../classes/features/generators/yellow-generator";
import {UpgradeRecord} from "../../../classes/records/upgrades/upgrade-record";
import {Upgrade} from "../../../classes/features/upgrade";

@Component({
    selector: 'app-yellow-generators',
    templateUrl: './yellow-generators.component.html',
    styleUrls: ['./yellow-generators.component.css'],
    standalone: false
})
export class YellowGeneratorsComponent implements OnInit {
  yellowPower: Holding = HoldingRecord.yellowPower;
  generators: YellowGenerator[] = [
    GeneratorRecord.firstYellowGenerator,
    GeneratorRecord.secondYellowGenerator,
    GeneratorRecord.thirdYellowGenerator,
GeneratorRecord.fourthYellowGenerator,
GeneratorRecord.fifthYellowGenerator
  ]
  upgrades: Upgrade[] = [
    UpgradeRecord.yellowPower
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
