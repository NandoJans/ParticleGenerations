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
  constructor(private layers: PrestigeLayersService) { }

  ngOnInit(): void {
    this.docYellow = PrestigeLayersService.getValue('yellow', 'prestigeButton');
    console.log(this.docYellow)
    this.docGreen = PrestigeLayersService.getValue('green', 'prestigeButton');
    console.log(this.docGreen)
  }
}
