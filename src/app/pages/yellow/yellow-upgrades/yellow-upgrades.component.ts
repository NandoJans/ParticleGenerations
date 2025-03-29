import { Component } from '@angular/core';
import {YellowUpgradeRecord} from "../../../classes/records/upgrades/yellow-upgrade-record";

@Component({
  selector: 'app-yellow-upgrades',
  templateUrl: './yellow-upgrades.component.html',
  styleUrls: ['./yellow-upgrades.component.css']
})
export class YellowUpgradesComponent {
  constructor(
    public yellowUpgradeRecord: YellowUpgradeRecord
  ) { }
}
