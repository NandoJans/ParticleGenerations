import { Component, OnInit } from '@angular/core';
import {GeneratorService} from "../../../services/interactables/generator.service";
import {Generator} from "../../../globals";
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";

@Component({
  selector: 'app-yellow-generators',
  templateUrl: './yellow-generators.component.html',
  styleUrls: ['./yellow-generators.component.css']
})
export class YellowGeneratorsComponent implements OnInit {
  generators: Generator[] = [];

  constructor(
    public holdingRecord: HoldingRecord
  ) { }

  ngOnInit(): void {
    this.generators = GeneratorService.getGenerators('yellow-particles');
  }

}
