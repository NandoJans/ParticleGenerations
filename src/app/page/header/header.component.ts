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

  yellowHidden: boolean | undefined = false;
  greenHidden: boolean | undefined = false;
  blueHidden: boolean | undefined = false;

  constructor() { }

  ngOnInit(): void {
    this.docYellow = PrestigeLayersService.getValue('yellow', 'prestigeButton');
    this.yellowHidden = PrestigeLayersService.getValue('yellow', 'hidden');
    this.docGreen = PrestigeLayersService.getValue('green', 'prestigeButton');
    this.greenHidden = PrestigeLayersService.getValue('green', 'hidden');
    this.docBlue = PrestigeLayersService.getValue('blue', 'prestigeButton');
    this.blueHidden = PrestigeLayersService.getValue('blue', 'hidden');
    this.docPurple = PrestigeLayersService.getValue('purple', 'prestigeButton');
  }
}
