import { Component } from '@angular/core';
import {UpgradeService} from "../../../services/interactables/upgrade.service";
import {Num} from "../../../num";
import {BuyableService} from "../../../services/interactables/buyable.service";
import {HoldingsService} from "../../../services/holdings.service";
import {ResetService} from "../../../services/interactables/reset.service";
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";
import {UpgradeRecord} from "../../../classes/records/upgrades/upgrade-record";
import {Upgrade} from "../../../classes/features/upgrade";

@Component({
  selector: 'app-dark-energy',
  templateUrl: './dark-energy.component.html',
  styleUrls: ['./dark-energy.component.css']
})
export class DarkEnergyComponent {
  sacrifices: Upgrade[] = [
    UpgradeRecord.darkCompressor,
  ];
  upgrades: Upgrade[] = [
    UpgradeRecord.darkYellowFusion,
    UpgradeRecord.darkGreenGenerators,
    UpgradeRecord.darkRedAccelerators,
    UpgradeRecord.darkYellowGenerators,
    UpgradeRecord.darkRedGenerators,
  ];

  constructor(
    private buyables: BuyableService,
    public holdingRecord: HoldingRecord
  ) { }

  respecDark() {
    UpgradeService.getUpgrades('dark-upgrade').forEach((upgrade) => {
      upgrade.bought.mul(new Num(0, 0))
      upgrade.amount.mul(new Num(0, 0))
    })
    ResetService.reset('green');
  }

  splitEqual() {
    this.upgrades.forEach(upgrade => {
      const result: any[] = this.buyables.calculateBulk(upgrade, new Num(25, 0))
      // @ts-ignore
      if (result[0].greq(new Num(1, 0)) && HoldingsService.get(upgrade.currency).greq(result[1])) {
        // @ts-ignore
        this.buyables.bulkBuyAction(upgrade, result[1], result[0]);
      }
    })
    this.buyables.buy('dark-');
  }
}
