import { Component } from '@angular/core';
import {Num} from "../../../num";
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";
import {Holding} from "../../../classes/features/holding";
import {GeneratorRecord} from "../../../classes/records/generators/generator-record";
import {UpgradeRecord} from "../../../classes/records/upgrades/upgrade-record";
import {Generator} from "../../../classes/features/generator";
import {Upgrade} from "../../../classes/features/upgrade";

@Component({
  selector: 'app-red-purple',
  templateUrl: './red-purple.component.html',
  styleUrls: ['./red-purple.component.css']
})
export class RedPurpleComponent {
  effect: any[] = ['prePurple', 'redPurple', new Num(1, 2)];
  holding: Holding = HoldingRecord.redPurple;
  generators: Generator[] = [
    GeneratorRecord.firstRedPurpleGenerator,
    GeneratorRecord.secondRedPurpleGenerator,
    GeneratorRecord.thirdRedPurpleGenerator
  ];
  upgrades: Upgrade[] = [
    UpgradeRecord.redPurpleBoosterUpgrade,
    UpgradeRecord.redPurpleBufferUpgrade,
  ]

  constructor() { }
}
