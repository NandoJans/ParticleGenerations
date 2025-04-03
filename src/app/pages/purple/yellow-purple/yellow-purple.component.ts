import { Component } from '@angular/core';
import {Num} from "../../../num";
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";
import {YellowPurpleGeneratorRecord} from "../../../classes/records/generators/yellow-purple-generator-record";
import {YellowPurpleUpgradeRecord} from "../../../classes/records/upgrades/yellow-purple-upgrade-record";

@Component({
  selector: 'app-yellow-purple',
  templateUrl: './yellow-purple.component.html',
  styleUrls: ['./yellow-purple.component.css']
})
export class YellowPurpleComponent {
  effect: any[] = ['prePurple', 'yellowPurple', new Num(1, 2)];
  constructor(
    public holdingRecord: HoldingRecord,
    public yellowPurpleGeneratorRecord: YellowPurpleGeneratorRecord,
    public yellowPurpleUpgradeRecord: YellowPurpleUpgradeRecord,
  ) { }

}
