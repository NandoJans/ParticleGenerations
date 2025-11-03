import { Component, OnInit } from '@angular/core';
import {Holding} from "../../../classes/features/holding";
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";
import {UpgradeRecord} from "../../../classes/records/upgrades/upgrade-record";
import {Upgrade} from "../../../classes/features/upgrade";
import {FusionBoosterAccelerationUpgrade} from "../../../classes/features/upgrades/fusion-booster-acceleration-upgrade";
import {Num} from "../../../num";

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
  infoText: string[] = [
    'Yellow Fusion introduces stellar mechanics to supercharge your particle generation!',
    'Yellow Fusion accumulates automatically and powers the stellar fusion process.',
    'Hydrogen is produced through fusion and unlocks powerful upgrades for exponential growth.',
    'Stellar goals (Proxima Centauri, Lalande, Sun, Sirius) each provide massive bonuses when reached.',
    'Fusion Booster Acceleration creates synergies between fusion mechanics and your accelerator systems.',
    'This layer represents a major leap in production scaling - master fusion to unlock incredible power!'
  ]


  constructor() { }

  ngOnInit(): void {
  }

  getFusionBoosterAccelerationAmount(): Num {
    return UpgradeRecord.fusionBoosterAcceleration.amount;
  }
}
