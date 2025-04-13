import { Component } from '@angular/core';
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";
import {PurpleGeneratorRecord} from "../../../classes/records/generators/purple-generator-record";

@Component({
  selector: 'app-purple-generators',
  templateUrl: './purple-generators.component.html',
  styleUrls: ['./purple-generators.component.css']
})
export class PurpleGeneratorsComponent {
  constructor(
    public holdingRecord: HoldingRecord,
    public purpleGeneratorRecord: PurpleGeneratorRecord,
  ) { }
}
