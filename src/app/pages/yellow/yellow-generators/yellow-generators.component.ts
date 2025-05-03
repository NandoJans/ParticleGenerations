import { Component, OnInit } from '@angular/core';
import {Holding} from "../../../classes/features/holding";
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";
import {Generator} from "../../../classes/features/generator";
import {GeneratorRecord} from "../../../classes/records/generators/generator-record";

@Component({
  selector: 'app-yellow-generators',
  templateUrl: './yellow-generators.component.html',
  styleUrls: ['./yellow-generators.component.css']
})
export class YellowGeneratorsComponent implements OnInit {
  yellowPower: Holding = HoldingRecord.yellowPower;
  generators: Generator[] = [
    GeneratorRecord.firstYellowGenerator,
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
