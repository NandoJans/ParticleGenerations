import { Component, OnInit } from '@angular/core';
import {GeneratorService} from "../../../services/interactables/generator.service";
import {Generator, Upgrade} from "../../../globals";
import {Num} from "../../../num";
import {UpgradeService} from "../../../services/interactables/upgrade.service";
import {BackgroundService} from "../../../services/visuals/background.service";

@Component({
  selector: 'app-green-generators',
  templateUrl: './green-generators.component.html',
  styleUrls: ['./green-generators.component.css']
})
export class GreenGeneratorsComponent implements OnInit {
  generators: Generator[] = [];
  upgrades: Upgrade[] = [];
  effect: any[] = ['log', 'greenEnergy', new Num(0.8, 0)]

  constructor() { }

  ngOnInit(): void {
    this.generators = GeneratorService.getGenerators('green-particles');
    this.upgrades = UpgradeService.getUpgrades('green-upgrade');
    BackgroundService.setBackground('green')
  }

}
