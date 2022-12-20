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
  infoText: string[] = [
    'Red accelerators is a new type of currency used for accelerating red generators. The multiplier to red generators is equal to some factor of the red accelerators.' +
    ' They are able to be boosted by three different companions which all give a multiplier to the "single" red accelerator generator.'
  ]
  constructor() { }

  ngOnInit(): void {
    this.generators = GeneratorService.getGenerators('red-accelerators');
    this.upgrades = UpgradeService.getUpgrades('red-accelerators');
    if (UpgradeService.getValue('red-accelerator-buffer', 'bought').greq(new Num(1, 0))) {
      this.effect = ['power', 'redAccelerators', new Num(1.5, 0)]
    }
  }

}
