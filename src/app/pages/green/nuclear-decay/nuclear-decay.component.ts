import { Component, OnInit } from '@angular/core';
import {Generator, Upgrade} from "../../../globals";
import {GeneratorService} from "../../../services/interactables/generator.service";
import {Num} from "../../../num";
import {UpgradeService} from "../../../services/interactables/upgrade.service";
import {HoldingsService} from "../../../services/holdings.service";
import {BackgroundService} from "../../../services/visuals/background.service";

@Component({
  selector: 'app-nuclear-decay',
  templateUrl: './nuclear-decay.component.html',
  styleUrls: ['./nuclear-decay.component.css']
})
export class NuclearDecayComponent implements OnInit {
  generators: Generator[] = [];
  upgrades: Upgrade[] = [];
  effect: any[] = ['powerWithBase', 'nuclearDecay', new Num(1, -1), 'nuclear-decay-base-increaser']

  respecSouls() {
    HoldingsService.set('nuclearDecay', new Num(1, 0))
    UpgradeService.getUpgrades('nuclear-decay').forEach((upgrade) => {
      upgrade.bought.mul(new Num(0, 0))
    })
    GeneratorService.getGenerators('nuclear-decay').forEach((upgrade) => {
      upgrade.bought.mul(new Num(0, 0))
      upgrade.amount.mul(new Num(0, 0))
    })
  }

  constructor() { }

  ngOnInit(): void {
    this.generators = GeneratorService.getGenerators('nuclear-decay');
    this.upgrades = UpgradeService.getUpgrades('nuclear-decay');
    BackgroundService.setBackground('green')
  }

}
