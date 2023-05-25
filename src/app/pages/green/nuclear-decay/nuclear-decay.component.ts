import { Component, OnInit } from '@angular/core';
import {Generator, Upgrade} from "../../../globals";
import {GeneratorService} from "../../../services/interactables/generator.service";
import {Num} from "../../../num";
import {UpgradeService} from "../../../services/interactables/upgrade.service";
import {HoldingsService} from "../../../services/holdings.service";
import {ResetService} from "../../../services/interactables/reset.service";

@Component({
  selector: 'app-nuclear-decay',
  templateUrl: './nuclear-decay.component.html',
  styleUrls: ['./nuclear-decay.component.css']
})
export class NuclearDecayComponent implements OnInit {
  generators: Generator[] = [];
  upgrades: Upgrade[] = [];
  enoughSacrificeUpgrades = !HoldingsService.get('limitedUpgradeCount').greq(new Num(1, 1));

  respecSouls() {
    HoldingsService.set('nuclearDecay', new Num(1, 0))
    UpgradeService.getUpgrades('nuclear-decay').forEach((upgrade) => {
      upgrade.bought.mul(new Num(0, 0))
      upgrade.amount.mul(new Num(0, 0))
    })
    GeneratorService.getGenerators('nuclear-decay').forEach((upgrade) => {
      upgrade.bought.mul(new Num(0, 0))
      upgrade.amount.mul(new Num(0, 0))
    })
    ResetService.reset('green');
  }

  constructor() { }

  ngOnInit(): void {
    this.generators = GeneratorService.getGenerators('nuclear-decay');
    this.upgrades = UpgradeService.getUpgrades('nuclear-decay');
  }

}
