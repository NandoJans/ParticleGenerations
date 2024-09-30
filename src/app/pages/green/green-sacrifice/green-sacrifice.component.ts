import { Component, OnInit } from '@angular/core';
import {Upgrade} from "../../../globals";
import {UpgradeService} from "../../../services/interactables/upgrade.service";
import {Num} from "../../../num";
import {HoldingsService} from "../../../services/holdings.service";
import {ResetService} from "../../../services/interactables/reset.service";
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";

@Component({
  selector: 'app-green-sacrifice',
  templateUrl: './green-sacrifice.component.html',
  styleUrls: ['./green-sacrifice.component.css']
})
export class GreenSacrificeComponent implements OnInit {
  sacrifices: Upgrade[] = [];
  upgrades: Upgrade[] = [];
  constructor(
    public holdingRecord: HoldingRecord
  ) { }

  respecSouls() {
    UpgradeService.getUpgrades('green-limited-upgrades').forEach((upgrade) => {
      upgrade.bought.mul(new Num(0, 0))
      const doc = (<HTMLElement> document.getElementById('buyable-'+upgrade.name));
      if (doc !== undefined) {
        doc.innerHTML = upgrade.cost.toString() + ' ' + HoldingsService.getAbbreviation(upgrade.currency);
        doc.classList.remove('maxed');
      }
    })
    ResetService.reset('green');
  }

  ngOnInit(): void {
    this.sacrifices = UpgradeService.getUpgrades('green-sacrifices');
    this.upgrades = UpgradeService.getUpgrades('green-limited-upgrades');
  }
}
