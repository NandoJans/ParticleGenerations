import { Component, OnInit } from '@angular/core';
import {GeneratorService} from "../../../services/interactables/generator.service";
import {Generator} from "../../../globals";
import {Num} from "../../../num";

@Component({
  selector: 'app-green-generators',
  templateUrl: './green-generators.component.html',
  styleUrls: ['./green-generators.component.css']
})
export class GreenGeneratorsComponent implements OnInit {
  generators: Generator[] = [];
  effect: any[] = ['log', 'greenEnergy', new Num(0.5, 0)]

  constructor() { }

  ngOnInit(): void {
    this.generators = GeneratorService.getGenerators('green-particles');
  }

}
