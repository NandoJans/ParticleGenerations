import { Component, OnInit } from '@angular/core';
import {GeneratorService} from "../../../services/interactables/generator.service";
import {Generator} from "../../../globals";
import {Num} from "../../../num";
import {BackgroundService} from "../../../services/visuals/background.service";

@Component({
  selector: 'app-yellow-generators',
  templateUrl: './yellow-generators.component.html',
  styleUrls: ['./yellow-generators.component.css']
})
export class YellowGeneratorsComponent implements OnInit {
  generators: Generator[] = [];

  constructor() { }

  ngOnInit(): void {
    this.generators = GeneratorService.getGenerators('yellow-particles');
    BackgroundService.setBackground('yellow')
  }

}
