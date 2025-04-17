import { Component, OnInit } from '@angular/core';
import {UpgradeService} from "../../../services/interactables/upgrade.service";
import {Num} from "../../../num";
import {HoldingsService} from "../../../services/holdings.service";
import {ResetService} from "../../../services/interactables/reset.service";
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";
import {Upgrade} from "../../../classes/features/upgrade";
import {UpgradeRecord} from "../../../classes/records/upgrades/upgrade-record";
import {LimitedUpgradeRecord} from "../../../classes/records/upgrades/limited-upgrade-record";

@Component({
  selector: 'app-green-sacrifice',
  templateUrl: './green-sacrifice.component.html',
  styleUrls: ['./green-sacrifice.component.css']
})
export class GreenSacrificeComponent {
  sacrifices: Upgrade[] = [
    UpgradeRecord.redParticleSacrifice,
    UpgradeRecord.yellowParticleSacrifice,
    UpgradeRecord.greenParticleSacrifice,
  ];

  constructor(
    public holdingRecord: HoldingRecord,
    public limitedUpgradeRecord: LimitedUpgradeRecord,
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
}
