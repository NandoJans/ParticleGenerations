import { Component, OnInit } from '@angular/core';
import {GeneratorService} from "../../../services/interactables/generator.service";
import {Generator} from "../../../globals";
import {Num} from "../../../num";

@Component({
  selector: 'app-yellow-generators',
  templateUrl: './yellow-generators.component.html',
  styleUrls: ['./yellow-generators.component.css']
})
export class YellowGeneratorsComponent implements OnInit {
  generators: Generator[] = [];
  effect: any[] = ['powerOfGlobalMultiplier', 'yellowPower', 'yellowPowerPower']

  constructor() { }

  ngOnInit(): void {
    this.generators = GeneratorService.getGenerators('yellow-particles');
  }

}
