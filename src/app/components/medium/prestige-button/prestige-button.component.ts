import { Component, OnInit, Input } from '@angular/core';
import {PrestigeLayersService} from "../../../services/prestige-layers.service";
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";
import {PrestigeLayer} from "../../../classes/features/prestiges/prestige-layer";

@Component({
  selector: 'app-prestige-button',
  templateUrl: './prestige-button.component.html',
  styleUrls: ['./prestige-button.component.css']
})
export class PrestigeButtonComponent implements OnInit {
  @Input() prestigeLayer: PrestigeLayer = PrestigeLayersService.yellowPrestigeLayer;

  constructor(
    private prestigeLayers: PrestigeLayersService,
    public holdingRecord: HoldingRecord
  ) { }

  prestige() {
    if (this.prestigeLayer.hasReached()) {
      this.prestigeLayers.prestige(this.prestigeLayer);
    }
  }

  ngOnInit(): void {

  }

  getDisplay() {
    return (this.prestigeLayer.isUnlocked()) ? '' : 'none';
  }

  getName() {
    return this.prestigeLayer.name.charAt(0).toUpperCase() + this.prestigeLayer.name.slice(1);
  }

  getReached(): string {
    return (this.prestigeLayer.hasReached()) ? 'reached' : '';
  }
}
