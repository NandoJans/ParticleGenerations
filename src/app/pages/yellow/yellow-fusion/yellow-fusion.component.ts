import { Component, OnInit } from '@angular/core';
import {Upgrade} from "../../../globals";
import {UpgradeService} from "../../../services/interactables/upgrade.service";
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";

@Component({
  selector: 'app-yellow-fusion',
  templateUrl: './yellow-fusion.component.html',
  styleUrls: ['./yellow-fusion.component.css']
})
export class YellowFusionComponent implements OnInit {
  upgrades: Upgrade[] = [];
  constructor(
    public holdingRecord: HoldingRecord
  ) { }

  ngOnInit(): void {
    this.upgrades = UpgradeService.getUpgrades('yellow-fusion')
  }
}
