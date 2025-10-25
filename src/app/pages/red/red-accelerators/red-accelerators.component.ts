import { Component, OnInit } from '@angular/core';
import {Upgrade} from "../../../classes/features/upgrade";
import {Holding} from "../../../classes/features/holding";
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";
import {UpgradeRecord} from "../../../classes/records/upgrades/upgrade-record";

@Component({
    selector: 'app-red-accelerators',
    templateUrl: './red-accelerators.component.html',
    styleUrls: ['./red-accelerators.component.css'],
    standalone: false
})
export class RedAcceleratorsComponent implements OnInit {
  unlockRedAccelerators: Upgrade = UpgradeRecord.unlockRedAccelerators;
  boosterAccelerationUpgrade: Upgrade = UpgradeRecord.boosterAccelerationUpgrade;
  upgrades: Upgrade[] = [
    UpgradeRecord.multiplyRedAcceleratorGeneration,
    UpgradeRecord.multiplyRedAcceleratorEffectUpgrade,
    UpgradeRecord.improveRedAcceleratorsEffect,
    UpgradeRecord.improveRedParticlesToAcceleratorsUpgrade
  ];
  redAccelerators: Holding = HoldingRecord.redAccelerators;
  infoText: string[] = [
    'Red Accelerators are an advanced resource that multiply the effect of your red generators.',
    'To unlock accelerators, you first need to purchase the "Unlock Red Accelerators" upgrade.',
    'Accelerators work by increasing the production rate of all your red generators based on how many accelerators you have.',
    'The various upgrades here improve accelerator generation rate, their effectiveness, and provide new ways to convert red particles into accelerators.',
    'Booster Acceleration upgrades create a synergy between accelerators and other game mechanics for exponential growth.'
  ]

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
