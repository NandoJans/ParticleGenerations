import { Component } from '@angular/core';
import {GeneratorRecord} from "../../../classes/records/generators/generator-record";
import {Upgrade} from "../../../classes/features/upgrade";
import {UpgradeRecord} from "../../../classes/records/upgrades/upgrade-record";
import {RedGenerator} from "../../../classes/features/generators/red-generator";

@Component({
    selector: 'app-red',
    templateUrl: './red.component.html',
    styleUrls: ['./red.component.css'],
    standalone: false
})
export class RedComponent {
  generators: RedGenerator[] = [
    GeneratorRecord.firstRedGenerator,
    GeneratorRecord.secondRedGenerator,
    GeneratorRecord.thirdRedGenerator,
    GeneratorRecord.fourthRedGenerator,
    GeneratorRecord.fifthRedGenerator,
  ];
  upgrades: Upgrade[] = [
    UpgradeRecord.redGeneratorExtension,
    UpgradeRecord.redGeneratorBooster,
  ];
  infoText: string[] = [
    'Welcome to Particle Generations! This is the Red Generators tab, your starting point in the game.',
    'Red generators form the foundation of particle production. The first generator produces red particles directly, while higher-tier generators (2nd, 3rd, etc.) produce the generators below them.',
    'Red Extensions unlock additional generator slots. You can have up to 5 different red generators active at once. Extensions become more valuable as you progress and unlock new boosts.',
    'Focus on balancing your generator purchases - higher tiers are more expensive but generate multiple lower-tier generators. This exponential growth is key to progression!'
  ]
  constructor() {

  }
}
