import { Component, OnInit } from '@angular/core';
import {HoldingsService} from "../../../services/holdings.service";
import {Generator, Upgrade} from "../../../globals";
import {UpgradeService} from "../../../services/interactables/upgrade.service";
import {GeneratorService} from "../../../services/interactables/generator.service";
import {Num} from "../../../num";

@Component({
  selector: 'app-accelerators',
  templateUrl: './accelerators.component.html',
  styleUrls: ['./accelerators.component.css']
})
export class AcceleratorsComponent implements OnInit {
  generators: Generator[] = [];
  upgrades: Upgrade[] = [];
  effect: any[] = ['multiply', 'redAccelerators', new Num(1, -3)];
  constructor() { }

  ngOnInit(): void {
    this.generators = GeneratorService.getGenerators('red-accelerators');
    this.upgrades = UpgradeService.getUpgrades('red-accelerators');
  }

}
