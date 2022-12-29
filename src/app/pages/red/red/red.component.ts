import { Component, OnInit } from '@angular/core';
import {GeneratorService} from "../../../services/interactables/generator.service";
import {Generator, Upgrade} from "../../../globals";
import {UpgradeService} from "../../../services/interactables/upgrade.service";
import {BackgroundService} from "../../../services/visuals/background.service";

@Component({
  selector: 'app-red',
  templateUrl: './red.component.html',
  styleUrls: ['./red.component.css']
})
export class RedComponent implements OnInit {
  generators: Generator[] = [];
  upgrades: Upgrade[] = [];
  infoText: string[] = [
    'Red Generators are the base of this game. The first generator generates red particles while the other generators generate generators a level below themself. For example: two generates one, three generates two, and so on.',
    'These generators are the main focus of the game, with every upgrade eventually boosting the red generators. As the game goes on, you will understand what is meant by that.',
    'Red extensions add up to five extra red generators. When having five generators, red extensions do not do anything. It is recommended that you wait until you are able to buy something new that boosts it effect.'
  ]
  constructor() { }

  ngOnInit(): void {
    this.generators = GeneratorService.getGenerators('red-particles');
    this.upgrades = UpgradeService.getUpgrades('red-particles');
    BackgroundService.setBackground('red')
  }
}
