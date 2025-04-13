import { Component } from '@angular/core';
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";
import {BluePurpleGeneratorRecord} from "../../../classes/records/generators/blue-purple-generator-record";
import {BluePurpleUpgradeRecord} from "../../../classes/records/upgrades/blue-purple-upgrade-record";

@Component({
  selector: 'app-blue-purple',
  templateUrl: './blue-purple.component.html',
  styleUrls: ['./blue-purple.component.css']
})
export class BluePurpleComponent {
  constructor(
    public holdingRecord: HoldingRecord,
    public bluePurpleGeneratorRecord: BluePurpleGeneratorRecord,
    public bluePurpleUpgradeRecord: BluePurpleUpgradeRecord
  ) { }
}
