import { Component } from '@angular/core';
import {Num} from "../../../num";
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";
import {Holding} from "../../../classes/features/holding";
import {Generator} from "../../../classes/features/generator";
import {GeneratorRecord} from "../../../classes/records/generators/generator-record";
import {Upgrade} from "../../../classes/features/upgrade";
import {UpgradeRecord} from "../../../classes/records/upgrades/upgrade-record";

@Component({
  selector: 'app-yellow-purple',
  templateUrl: './yellow-purple.component.html',
  styleUrls: ['./yellow-purple.component.css']
})
export class YellowPurpleComponent {
  effect: any[] = ['prePurple', 'yellowPurple', new Num(1, 2)];
  holding: Holding = HoldingRecord.yellowPurple;
  generators: Generator[] = [
    GeneratorRecord.firstYellowPurpleGenerator,
    GeneratorRecord.secondYellowPurpleGenerator,
    GeneratorRecord.thirdYellowPurpleGenerator
  ];
  upgrades: Upgrade[] = [
    UpgradeRecord.yellowPurpleBufferUpgrade,
    UpgradeRecord.yellowPurpleBoosterUpgrade,
  ]

  constructor() { }

}
