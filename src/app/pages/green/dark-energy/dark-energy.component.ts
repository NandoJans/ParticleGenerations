import { Component, OnInit } from '@angular/core';
import {Upgrade} from "../../../globals";
import {UpgradeService} from "../../../services/interactables/upgrade.service";

@Component({
  selector: 'app-dark-energy',
  templateUrl: './dark-energy.component.html',
  styleUrls: ['./dark-energy.component.css']
})
export class DarkEnergyComponent implements OnInit {
  sacrifices: Upgrade[] = [];
  upgrades: Upgrade[] = [];
  constructor() { }

  ngOnInit(): void {
    this.sacrifices = UpgradeService.getUpgrades('dark-compressor');
    this.upgrades = UpgradeService.getUpgrades('dark-upgrade');
  }
}
