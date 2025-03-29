import { Component } from '@angular/core';
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";
import {GeneratorRecord} from "../../../classes/records/generators/generator-record";
import {Generator} from "../../../classes/features/generator";

@Component({
  selector: 'app-yellow-generators',
  templateUrl: './yellow-generators.component.html',
  styleUrls: ['./yellow-generators.component.css']
})
export class YellowGeneratorsComponent {
  generators: Generator[] = [
    GeneratorRecord.firstYellowGenerator,
    GeneratorRecord.secondYellowGenerator,
    GeneratorRecord.thirdYellowGenerator,
    GeneratorRecord.fourthYellowGenerator,
    GeneratorRecord.fifthYellowGenerator,
  ];

  constructor(
    public holdingRecord: HoldingRecord
  ) { }

}
