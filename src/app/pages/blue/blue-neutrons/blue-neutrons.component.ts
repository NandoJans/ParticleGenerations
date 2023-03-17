import { Component, OnInit } from '@angular/core';
import {GeneratorService} from "../../../services/interactables/generator.service";
import {Generator, Upgrade} from "../../../globals";
import {Num} from "../../../num";
import {UpgradeService} from "../../../services/interactables/upgrade.service";
import {BackgroundService} from "../../../services/visuals/background.service";

@Component({
  selector: 'app-blue-neutrons',
  templateUrl: './blue-neutrons.component.html',
  styleUrls: ['./blue-neutrons.component.css']
})
export class BlueNeutronsComponent implements OnInit {
  generators: Generator[] = [];
  upgrades: Upgrade[] = [];

  constructor() { }

  ngOnInit(): void {
    BackgroundService.setBackground('blue')
    this.generators = GeneratorService.getGenerators('blue-neutrons');
    this.upgrades = UpgradeService.getUpgrades('blue-neutron-upgrade');
  }

}
