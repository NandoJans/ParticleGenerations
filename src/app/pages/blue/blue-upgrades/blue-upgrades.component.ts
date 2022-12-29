import { Component, OnInit } from '@angular/core';
import {UpgradeService} from "../../../services/interactables/upgrade.service";
import {Upgrade} from "../../../globals";
import {BackgroundService} from "../../../services/visuals/background.service";

@Component({
  selector: 'app-blue-upgrades',
  templateUrl: './blue-upgrades.component.html',
  styleUrls: ['./blue-upgrades.component.css']
})
export class BlueUpgradesComponent implements OnInit {
  upgrades: Upgrade[] = []
  constructor() { }

  ngOnInit(): void {
    this.upgrades = UpgradeService.getUpgrades('blue-upgrades')
    BackgroundService.setBackground('blue')
  }

}
