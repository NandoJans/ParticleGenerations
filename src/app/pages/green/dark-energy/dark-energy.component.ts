import { Component, OnInit } from '@angular/core';
import {Upgrade} from "../../../globals";
import {UpgradeService} from "../../../services/interactables/upgrade.service";
import {Num} from "../../../num";

@Component({
  selector: 'app-dark-energy',
  templateUrl: './dark-energy.component.html',
  styleUrls: ['./dark-energy.component.css']
})
export class DarkEnergyComponent implements OnInit {
  sacrifices: Upgrade[] = [];
  upgrades: Upgrade[] = [];
  constructor() { }

  respecDark() {
    UpgradeService.getUpgrades('dark-upgrade').forEach((upgrade) => {
      upgrade.bought.mul(new Num(0, 0))
    })
  }

  ngOnInit(): void {
    this.sacrifices = UpgradeService.getUpgrades('dark-compressor');
    this.upgrades = UpgradeService.getUpgrades('dark-upgrade');
  }
}
