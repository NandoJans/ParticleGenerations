import { Component, OnInit } from '@angular/core';
import {Upgrade} from "../../../globals";
import {UpgradeService} from "../../../services/interactables/upgrade.service";

@Component({
  selector: 'app-red-upgrades',
  templateUrl: './red-upgrades.component.html',
  styleUrls: ['./red-upgrades.component.css']
})
export class RedUpgradesComponent implements OnInit {
  upgrades: Upgrade[] = [];

  constructor() { }

  ngOnInit(): void {
    this.upgrades = UpgradeService.getUpgrades('red-upgrades')
  }

}
