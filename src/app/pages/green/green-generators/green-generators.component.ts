import { Component, OnInit } from '@angular/core';
import {GeneratorService} from "../../../services/interactables/generator.service";
import {Generator, Upgrade} from "../../../globals";
import {UpgradeService} from "../../../services/interactables/upgrade.service";

@Component({
  selector: 'app-green-generators',
  templateUrl: './green-generators.component.html',
  styleUrls: ['./green-generators.component.css']
})
export class GreenGeneratorsComponent implements OnInit {
  generators: Generator[] = [];
  upgrades: Upgrade[] = [];

  constructor() { }

  ngOnInit(): void {
    this.generators = GeneratorService.getGenerators('green-particles');
    this.upgrades = UpgradeService.getUpgrades('green-upgrade');
  }

}
