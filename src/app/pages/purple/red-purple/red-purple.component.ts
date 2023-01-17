import { Component, OnInit } from '@angular/core';
import {GeneratorService} from "../../../services/interactables/generator.service";
import {UpgradeService} from "../../../services/interactables/upgrade.service";
import {Num} from "../../../num";
import {BackgroundService} from "../../../services/visuals/background.service";
import {Generator, Upgrade} from "../../../globals";

@Component({
  selector: 'app-red-purple',
  templateUrl: './red-purple.component.html',
  styleUrls: ['./red-purple.component.css']
})
export class RedPurpleComponent implements OnInit {
  generators: Generator[] = [];
  upgrades: Upgrade[] = [];
  effect: any[] = ['prePurple', 'redPurple', new Num(1, 2)];
  constructor() { }

  ngOnInit(): void {
    this.generators = GeneratorService.getGenerators('red-purple-generator');
    this.upgrades = UpgradeService.getUpgrades('red-purple-upgrade');
    BackgroundService.setBackground('purple')
  }

}
