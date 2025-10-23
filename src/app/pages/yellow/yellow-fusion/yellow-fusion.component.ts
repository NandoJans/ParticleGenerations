import { Component, OnInit } from '@angular/core';
import {Holding} from "../../../classes/features/holding";
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";
import {UpgradeRecord} from "../../../classes/records/upgrades/upgrade-record";
import {Upgrade} from "../../../classes/features/upgrade";
import {FusionBoosterAccelerationUpgrade} from "../../../classes/features/upgrades/fusion-booster-acceleration-upgrade";

@Component({
    selector: 'app-yellow-fusion',
    templateUrl: './yellow-fusion.component.html',
    styleUrls: ['./yellow-fusion.component.css'],
    standalone: false
})
export class YellowFusionComponent implements OnInit {
  yellowFusion: Holding = HoldingRecord.yellowFusion;
  hydrogen: Holding = HoldingRecord.hydrogen
  upgrades: Upgrade[] = [
    UpgradeRecord.increaseProximaCentauriGoal,
    UpgradeRecord.increaseLalandeGoal,
    UpgradeRecord.increaseSunGoal,
    UpgradeRecord.increaseSiriusGoal,
  ];
  hydrogenUpgrades: Upgrade[] = [
    UpgradeRecord.increaseHydrogen,
    UpgradeRecord.increaseHydrogenEffect,
    UpgradeRecord.increaseMaxFusionBoosterAcceleration,
  ];
  fusionBoosterAcceleration: FusionBoosterAccelerationUpgrade = UpgradeRecord.fusionBoosterAcceleration;


  constructor() { }

  ngOnInit(): void {
  }

}
