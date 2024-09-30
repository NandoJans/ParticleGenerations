import { Component, OnInit } from '@angular/core';
import {Generator, Upgrade} from "../../../globals";
import {UpgradeService} from "../../../services/interactables/upgrade.service";
import {GeneratorService} from "../../../services/interactables/generator.service";
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";

@Component({
  selector: 'app-accelerators',
  templateUrl: './accelerators.component.html',
  styleUrls: ['./accelerators.component.css']
})
export class AcceleratorsComponent implements OnInit {
  generators: Generator[] = [];
  upgrades: Upgrade[] = [];
  infoText: string[] = [
    'Red accelerators is a new type of currency used for accelerating red generators. The multiplier to red generators is equal to some factor of the red accelerators.' +
    ' They are able to be boosted by three different companions which all give a multiplier to the "single" red accelerator generator.'
  ]
  constructor(
    public holdingRecord: HoldingRecord
  ) { }

  ngOnInit(): void {
    this.generators = GeneratorService.getGenerators('red-accelerators');
    this.upgrades = UpgradeService.getUpgrades('red-accelerators');
  }

}
