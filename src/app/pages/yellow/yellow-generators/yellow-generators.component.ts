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
  effect: any[] = ['power', 'yellowPower', new Num(5, 0)]

  constructor() { }

  ngOnInit(): void {
    this.generators = GeneratorService.getGenerators('yellow-particles');
  }

}
