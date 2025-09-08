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
  styleUrls: ['./yellow-generators.component.css']
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
  infoText: string[] = [
    'Yellow Generators represent the next evolution in your particle generation journey!',
    'These generators produce Yellow Power, a more advanced resource that unlocks new upgrade paths and abilities.',
    'Like red generators, yellow generators follow the same tier system - higher tiers produce lower-tier generators.',
    'Yellow Power is used for powerful upgrades that can dramatically boost your entire production chain.',
    'Focus on unlocking all yellow generator tiers to maximize your Yellow Power generation rate.'
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
