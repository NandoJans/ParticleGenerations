import {Component, Input, OnInit} from '@angular/core';
import {PrestigeLayer} from "../../../classes/features/prestiges/prestige-layer";
import {PrestigeLayersService} from "../../../services/prestige-layers.service";
import {Num} from "../../../num";

@Component({
  selector: 'app-fastest-prestige',
  templateUrl: './fastest-prestige.component.html',
  styleUrls: ['./fastest-prestige.component.css']
})
export class FastestPrestigeComponent implements OnInit {
  @Input() prestige: PrestigeLayer = PrestigeLayersService.yellowPrestigeLayer;

  constructor() { }

  ngOnInit(): void {
  }

  getFastestPrestige(): Num {
    return this.prestige.highestGenerationPerTick.mul(new Num(2, 1));
  }

  getHoldingDisplayName() {
    return this.prestige.idleGenerationHolding.displayName;
  }

  getStyle() {
    return this.prestige.style;
  }
}
