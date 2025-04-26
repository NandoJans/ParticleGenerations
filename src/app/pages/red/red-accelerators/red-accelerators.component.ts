import { Component, OnInit } from '@angular/core';
import {Upgrade} from "../../../classes/features/upgrade";
import {Holding} from "../../../classes/features/holding";
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";
import {UpgradeRecord} from "../../../classes/records/upgrades/upgrade-record";

@Component({
  selector: 'app-red-accelerators',
  templateUrl: './red-accelerators.component.html',
  styleUrls: ['./red-accelerators.component.css']
})
export class RedAcceleratorsComponent implements OnInit {
  unlockRedAccelerators: Upgrade = UpgradeRecord.unlockRedAccelerators;
  boosterAccelerationUpgrade: Upgrade = UpgradeRecord.boosterAccelerationUpgrade;
  upgrades: Upgrade[] = [
    UpgradeRecord.multiplyRedAcceleratorGeneration,
    UpgradeRecord.improveRedAcceleratorsEffect,
    UpgradeRecord.improveRedParticlesToAcceleratorsUpgrade
  ];
  redAccelerators: Holding = HoldingRecord.redAccelerators;

  constructor() { }

  ngOnInit(): void {
  }

  boughtUnlockRedAccelerators(): boolean {
    return UpgradeRecord.unlockRedAccelerators.hasBought()
  }

  boughtBoosterAcceleration() {
    return this.boosterAccelerationUpgrade.hasBought();
  }
}
