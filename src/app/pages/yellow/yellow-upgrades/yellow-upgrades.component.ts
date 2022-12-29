import { Component, OnInit } from '@angular/core';
import {Upgrade} from "../../../globals";
import {UpgradeService} from "../../../services/interactables/upgrade.service";
import {BackgroundService} from "../../../services/visuals/background.service";

@Component({
  selector: 'app-yellow-upgrades',
  templateUrl: './yellow-upgrades.component.html',
  styleUrls: ['./yellow-upgrades.component.css']
})
export class YellowUpgradesComponent implements OnInit {
  repeatableUpgrades: Upgrade[] = [];
  upgrades: Upgrade[] = [];

  constructor() { }

  ngOnInit(): void {
    this.repeatableUpgrades = UpgradeService.getUpgrades('yellow-upgrades-repeatable')
    this.upgrades = UpgradeService.getUpgrades('yellow-upgrades')
    BackgroundService.setBackground('yellow')
  }

}
