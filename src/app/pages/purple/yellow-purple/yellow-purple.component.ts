import { Component, OnInit } from '@angular/core';
import {Generator, Upgrade} from "../../../globals";
import {Num} from "../../../num";
import {GeneratorService} from "../../../services/interactables/generator.service";
import {UpgradeService} from "../../../services/interactables/upgrade.service";
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";

@Component({
  selector: 'app-yellow-purple',
  templateUrl: './yellow-purple.component.html',
  styleUrls: ['./yellow-purple.component.css']
})
export class YellowPurpleComponent implements OnInit {
  generators: Generator[] = [];
  upgrades: Upgrade[] = [];
  effect: any[] = ['prePurple', 'yellowPurple', new Num(1, 2)];
  constructor(
    public holdingRecord: HoldingRecord
  ) { }

  ngOnInit(): void {
    this.generators = GeneratorService.getGenerators('yellow-purple-generator');
    this.upgrades = UpgradeService.getUpgrades('yellow-purple-upgrade');
  }

}
