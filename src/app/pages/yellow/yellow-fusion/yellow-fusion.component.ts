import { Component, OnInit } from '@angular/core';
import {Holding} from "../../../classes/features/holding";
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";
import {FusionUpgrade} from "../../../classes/features/upgrades/fusion-upgrade";
import {UpgradeRecord} from "../../../classes/records/upgrades/upgrade-record";
import {IncreaseHydrogenHoldingUpgrade} from "../../../classes/features/upgrades/increase-hydrogen-holding-upgrade";

@Component({
  selector: 'app-yellow-fusion',
  templateUrl: './yellow-fusion.component.html',
  styleUrls: ['./yellow-fusion.component.css']
})
export class YellowFusionComponent implements OnInit {
  yellowFusion: Holding = HoldingRecord.yellowFusion;
  hydrogen: Holding = HoldingRecord.hydrogen
  upgrades: FusionUpgrade[] = [
    UpgradeRecord.increaseStarMass,
    UpgradeRecord.increaseStarPressure,
    UpgradeRecord.increaseStarGravity
  ];
  increaseHydrogen: IncreaseHydrogenHoldingUpgrade = UpgradeRecord.increaseHydrogen;

  constructor() { }

  ngOnInit(): void {
  }

}
