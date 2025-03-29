import { Component } from '@angular/core';
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";
import {AcceleratorGeneratorRecord} from "../../../classes/records/generators/accelerator-generator-record";
import {AcceleratorUpgradeRecord} from "../../../classes/records/upgrades/accelerator-upgrade-record";

@Component({
  selector: 'app-accelerators',
  templateUrl: './accelerators.component.html',
  styleUrls: ['./accelerators.component.css']
})
export class AcceleratorsComponent {
  infoText: string[] = [
    'Red accelerators is a new type of currency used for accelerating red generators. The multiplier to red generators is equal to some factor of the red accelerators.' +
    ' They are able to be boosted by three different companions which all give a multiplier to the "single" red accelerator generator.'
  ]
  constructor(
    public holdingRecord: HoldingRecord,
    public acceleratorGeneratorRecord: AcceleratorGeneratorRecord,
    public acceleratorUpgradeService: AcceleratorUpgradeRecord,
  ) { }
}
