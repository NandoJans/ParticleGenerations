import { Component, OnInit } from '@angular/core';
import {BlackHoleService} from "../../../services/black-hole.service";
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";
import {BlackHoleUpgradeRecord} from "../../../classes/records/upgrades/black-hole-upgrade-record";
import {UpgradeRecord} from "../../../classes/records/upgrades/upgrade-record";
import {UnlockBlackHoleUpgrade} from "../../../classes/features/upgrades/unlock-black-hole-upgrade";

@Component({
  selector: 'app-black',
  templateUrl: './black.component.html',
  styleUrls: ['./black.component.css']
})
export class BlackComponent implements OnInit {
  hideStartButton: boolean = BlackHoleService.on;
  hideStopButton: boolean = !BlackHoleService.on;
  unlockBlackHoleUpgrade: UnlockBlackHoleUpgrade = UpgradeRecord.unlockBlackHoleUpgrade;

  constructor(
    public holdingRecord: HoldingRecord,
    public blackHoleUpgradeRecord: BlackHoleUpgradeRecord,
  ) { }

  ngOnInit(): void {
    this.hideStartButton = !BlackHoleService.on;
    this.hideStopButton = BlackHoleService.on;
  }

  startBlackHole() {
    BlackHoleService.on = true;
    this.ngOnInit();
  }

  stopBlackHole() {
    BlackHoleService.on = false;
    this.ngOnInit();
  }
}
