import { Component, OnInit } from '@angular/core';
import {Generator, Upgrade} from "../../../globals";
import {Num} from "../../../num";
import {GeneratorService} from "../../../services/interactables/generator.service";
import {UpgradeService} from "../../../services/interactables/upgrade.service";

@Component({
  selector: 'app-blue-purple',
  templateUrl: './blue-purple.component.html',
  styleUrls: ['./blue-purple.component.css']
})
export class BluePurpleComponent implements OnInit {
  generators: Generator[] = [];
  upgrades: Upgrade[] = [];
  effect: any[] = ['prePurple', 'bluePurple', new Num(3, 0)];
  constructor() { }

  ngOnInit(): void {
    this.generators = GeneratorService.getGenerators('blue-purple-generator');
    this.upgrades = UpgradeService.getUpgrades('blue-purple-upgrade');
  }

}
