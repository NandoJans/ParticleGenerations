import { Component, OnInit } from '@angular/core';
import {UpgradeService} from "../../../services/interactables/upgrade.service";
import {Upgrade} from "../../../globals";

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
  }

}
