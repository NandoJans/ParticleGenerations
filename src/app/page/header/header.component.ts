import { Component, OnInit } from '@angular/core';
import {PrestigeLayersService} from "../../services/prestige-layers.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  redParticles: string = '';

  docYellow: string | undefined;
  docGreen: string | undefined;
  docBlue: string | undefined;
  docPurple: string | undefined;

  constructor() { }

  ngOnInit(): void {
    this.docYellow = PrestigeLayersService.getValue('yellow', 'prestigeButton');
    this.docGreen = PrestigeLayersService.getValue('green', 'prestigeButton');
    this.docBlue = PrestigeLayersService.getValue('blue', 'prestigeButton');
    this.docPurple = PrestigeLayersService.getValue('purple', 'prestigeButton');
  }
}
