import { Component, OnInit } from '@angular/core';
import {GeneratorService} from "../../../services/interactables/generator.service";
import {Generator, Upgrade} from "../../../globals";
import {UpgradeService} from "../../../services/interactables/upgrade.service";

@Component({
  selector: 'app-red',
  templateUrl: './red.component.html',
  styleUrls: ['./red.component.css']
})
export class RedComponent implements OnInit {
  generators: Generator[] = [];
  upgrades: Upgrade[] = [];
  infoText: string[] = [
    'Red Particle Generators',
    'Red Particle Generators eventually generate red particles. The reason the word \'eventually\' is used here, is because the only generator that actually generates red particles is the first one. ' +
    'All the other generators generate the generator that comes before itself. Two generates one, three generates two, and so on.'
  ]
  constructor() { }

  ngOnInit(): void {
    this.generators = GeneratorService.getGenerators('red-particles');
    this.upgrades = UpgradeService.getUpgrades('red-particles');
  }
}
