import { Component } from '@angular/core';
import {GeneratorRecord} from "../../../classes/records/generators/generator-record";
import {Generator} from "../../../classes/features/generator";
import {Upgrade} from "../../../classes/features/upgrade";
import {UpgradeRecord} from "../../../classes/records/upgrades/upgrade-record";

@Component({
  selector: 'app-red',
  templateUrl: './red.component.html',
  styleUrls: ['./red.component.css']
})
export class RedComponent {
  generators: Generator[] = [
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
    'Red Generators are the base of this game. The first generator generates red particles while the other generators generate generators a level below themself. For example: two generates one, three generates two, and so on.',
    'These generators are the main focus of the game, with every upgrade eventually boosting the red generators. As the game goes on, you will understand what is meant by that.',
    'Red extensions add up to five extra red generators. When having five generators, red extensions do not do anything. It is recommended that you wait until you are able to buy something new that boosts it effect.'
  ]
  constructor() { }
}
