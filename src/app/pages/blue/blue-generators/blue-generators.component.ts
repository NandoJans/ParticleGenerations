import { Component, OnInit } from '@angular/core';
import {Generator} from "../../../globals";
import {Num} from "../../../num";
import {GeneratorService} from "../../../services/interactables/generator.service";
import {BackgroundService} from "../../../services/visuals/background.service";

@Component({
  selector: 'app-blue-generators',
  templateUrl: './blue-generators.component.html',
  styleUrls: ['./blue-generators.component.css']
})
export class BlueGeneratorsComponent implements OnInit {
  generators: Generator[] = [];

  constructor() { }

  ngOnInit(): void {
    this.generators = GeneratorService.getGenerators('blue-particles');
    BackgroundService.setBackground('blue')
  }
}
