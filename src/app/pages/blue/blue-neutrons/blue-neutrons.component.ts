import { Component, OnInit } from '@angular/core';
import {GeneratorService} from "../../../services/interactables/generator.service";
import {Generator, Upgrade} from "../../../globals";
import {UpgradeService} from "../../../services/interactables/upgrade.service";
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";

@Component({
  selector: 'app-blue-neutrons',
  templateUrl: './blue-neutrons.component.html',
  styleUrls: ['./blue-neutrons.component.css']
})
export class BlueNeutronsComponent implements OnInit {
  generators: Generator[] = [];
  upgrades: Upgrade[] = [];

  constructor(
    public holdingRecord: HoldingRecord
  ) { }

  ngOnInit(): void {
    this.generators = GeneratorService.getGenerators('blue-neutrons');
    this.upgrades = UpgradeService.getUpgrades('blue-neutron-upgrade');
  }

}
