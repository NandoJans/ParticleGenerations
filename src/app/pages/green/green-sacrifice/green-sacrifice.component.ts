import { Component, OnInit } from '@angular/core';
import {Upgrade} from "../../../globals";
import {UpgradeService} from "../../../services/interactables/upgrade.service";

@Component({
  selector: 'app-green-sacrifice',
  templateUrl: './green-sacrifice.component.html',
  styleUrls: ['./green-sacrifice.component.css']
})
export class GreenSacrificeComponent implements OnInit {
  sacrifices: Upgrade[] = [];
  upgrades: Upgrade[] = [];
  constructor() { }

  ngOnInit(): void {
    this.sacrifices = UpgradeService.getUpgrades('green-sacrifices');
    this.upgrades = UpgradeService.getUpgrades('green-limited-upgrades');
  }
}
