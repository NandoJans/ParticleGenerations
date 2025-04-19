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

  }

  splitEqual() {

  }
}
