import { Component, OnInit } from '@angular/core';
import {UpgradeService} from "../../../services/interactables/upgrade.service";
import {Upgrade} from "../../../globals";
import {BlackHoleService} from "../../../services/black-hole.service";
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";

@Component({
  selector: 'app-black',
  templateUrl: './black.component.html',
  styleUrls: ['./black.component.css']
})
export class BlackComponent implements OnInit {
  unlockBlackHole: Upgrade[] = [];
  blackHoleUpgrades: Upgrade[] = [];
  galaxies: Upgrade[] = [];
  hideStartButton: boolean = BlackHoleService.on;
  hideStopButton: boolean = !BlackHoleService.on;

  constructor(
    public holdingRecord: HoldingRecord
  ) { }

  ngOnInit(): void {
    this.unlockBlackHole = UpgradeService.getUpgrades('unlock-black-hole');
    this.blackHoleUpgrades = UpgradeService.getUpgrades('black-hole-upgrades');
    this.galaxies = UpgradeService.getUpgrades('galaxies');
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
