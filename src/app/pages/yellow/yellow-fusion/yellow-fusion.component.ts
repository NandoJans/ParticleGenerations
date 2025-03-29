import { Component } from '@angular/core';
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";
import {FusionUpgradeRecord} from "../../../records/upgrades/fusion-upgrade-record";

@Component({
  selector: 'app-yellow-fusion',
  templateUrl: './yellow-fusion.component.html',
  styleUrls: ['./yellow-fusion.component.css']
})
export class YellowFusionComponent {
  constructor(
    public holdingRecord: HoldingRecord,
    public fusionUpgradeRecord: FusionUpgradeRecord
  ) { }
}
