import { Component, OnInit } from '@angular/core';
import {PrestigeLayersService} from "../../services/prestige-layers.service";
import {PrestigeLayer} from "../../classes/features/prestiges/prestige-layer";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    standalone: false
})
export class HeaderComponent implements OnInit {
  yellowPrestigeLayer: PrestigeLayer = PrestigeLayersService.yellowPrestigeLayer
  greenPrestigeLayer: PrestigeLayer = PrestigeLayersService.greenPrestigeLayer

  constructor(

  ) {}

  ngOnInit(): void {
  }
}
