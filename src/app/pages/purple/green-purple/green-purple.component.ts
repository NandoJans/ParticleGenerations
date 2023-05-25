import { Component, OnInit } from '@angular/core';
import {Generator, Upgrade} from "../../../globals";
import {Num} from "../../../num";
import {GeneratorService} from "../../../services/interactables/generator.service";
import {UpgradeService} from "../../../services/interactables/upgrade.service";

@Component({
  selector: 'app-green-purple',
  templateUrl: './green-purple.component.html',
  styleUrls: ['./green-purple.component.css']
})
export class GreenPurpleComponent implements OnInit {
  generators: Generator[] = [];
  upgrades: Upgrade[] = [];
  effect: any[] = ['prePurple', 'greenPurple', new Num(1, 2)];
  constructor() { }

  ngOnInit(): void {
    this.generators = GeneratorService.getGenerators('green-purple-generator');
    this.upgrades = UpgradeService.getUpgrades('green-purple-upgrade');
  }

}
