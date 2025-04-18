import { Component } from '@angular/core';
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";
import {GeneratorRecord} from "../../../classes/records/generators/generator-record";
import {Generator} from "../../../classes/features/generator";

@Component({
  selector: 'app-blue-generators',
  templateUrl: './blue-generators.component.html',
  styleUrls: ['./blue-generators.component.css']
})
export class BlueGeneratorsComponent {
  generators: Generator[] = [
    GeneratorRecord.firstBlueGenerator,
    GeneratorRecord.secondBlueGenerator,
    GeneratorRecord.thirdBlueGenerator,
    GeneratorRecord.fourthBlueGenerator,
    GeneratorRecord.fifthBlueGenerator,
  ];

  constructor(
    public holdingRecord: HoldingRecord
  ) { }
}
