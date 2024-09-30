import { Component, OnInit } from '@angular/core';
import {Generator} from "../../../globals";
import {Num} from "../../../num";
import {GeneratorService} from "../../../services/interactables/generator.service";
import {Holding} from "../../../classes/features/holding";
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";

@Component({
  selector: 'app-purple-generators',
  templateUrl: './purple-generators.component.html',
  styleUrls: ['./purple-generators.component.css']
})
export class PurpleGeneratorsComponent implements OnInit {
  generators: Generator[] = [];
  effect: any[] = ['power', 'purpleVoid', new Num(2, 0)]

  constructor(
    public holdingRecord: HoldingRecord
  ) { }

  ngOnInit(): void {
    this.generators = GeneratorService.getGenerators('purple-particles');
  }
}
