import { Component, OnInit } from '@angular/core';
import {Upgrade} from "../../../globals";
import {UpgradeService} from "../../../services/interactables/upgrade.service";

@Component({
  selector: 'app-yellow-upgrades',
  templateUrl: './yellow-upgrades.component.html',
  styleUrls: ['./yellow-upgrades.component.css']
})
export class YellowUpgradesComponent implements OnInit {
  upgrades: Upgrade[] = [];

  constructor() { }

  ngOnInit(): void {
    this.upgrades = UpgradeService.getUpgrades('yellow-upgrades')
  }

}
