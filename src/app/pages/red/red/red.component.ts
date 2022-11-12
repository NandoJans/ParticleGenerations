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
  constructor() { }

  ngOnInit(): void {
    this.generators = GeneratorService.getGenerators('red-particles');
    this.upgrades = UpgradeService.getUpgrades('red-particles');
  }
}
