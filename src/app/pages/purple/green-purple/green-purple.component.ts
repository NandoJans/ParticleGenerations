import { Component } from '@angular/core';
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";
import {GreenPurpleGeneratorRecord} from "../../../classes/records/generators/green-purple-generator-record";
import {GreenPurpleUpgradeRecord} from "../../../classes/records/upgrades/green-purple-upgrade-record";

@Component({
  selector: 'app-green-purple',
  templateUrl: './green-purple.component.html',
  styleUrls: ['./green-purple.component.css']
})
export class GreenPurpleComponent {
  constructor(
    public holdingRecord: HoldingRecord,
    public greenPurpleGeneratorRecord: GreenPurpleGeneratorRecord,
    public greenPurpleUpgradeRecord: GreenPurpleUpgradeRecord,
  ) { }
}
