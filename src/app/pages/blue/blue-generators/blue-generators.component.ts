import { Component, OnInit } from '@angular/core';
import {Generator} from "../../../globals";
import {GeneratorService} from "../../../services/interactables/generator.service";
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";

@Component({
  selector: 'app-blue-generators',
  templateUrl: './blue-generators.component.html',
  styleUrls: ['./blue-generators.component.css']
})
export class BlueGeneratorsComponent implements OnInit {
  generators: Generator[] = [];

  constructor(
    public holdingRecord: HoldingRecord
  ) { }

  ngOnInit(): void {
    this.generators = GeneratorService.getGenerators('blue-particles');
  }
}
