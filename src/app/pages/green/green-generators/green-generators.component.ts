import { Component, OnInit } from '@angular/core';
import {Generator} from "../../../classes/features/generator";
import {Holding} from "../../../classes/features/holding";
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";
import {GeneratorRecord} from "../../../classes/records/generators/generator-record";

@Component({
    selector: 'app-green-generators',
    templateUrl: './green-generators.component.html',
    styleUrls: ['./green-generators.component.css'],
    standalone: false
})
export class GreenGeneratorsComponent implements OnInit {
  generators: Generator[] = [
    GeneratorRecord.firstGreenGenerator,
  ];
  darkMatter: Holding = HoldingRecord.darkMatter;

  constructor() { }

  ngOnInit(): void {
  }

}
