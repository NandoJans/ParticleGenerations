import { Component, OnInit, Input } from '@angular/core';
import {PrestigeLayersService} from "../../../services/prestige-layers.service";
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";
import {PrestigeLayer} from "../../../classes/features/prestiges/prestige-layer";
import {Num} from "../../../num";

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

  prestige(): void {
    if (this.prestigeLayer.hasReached()) {
      this.prestigeLayers.prestige(this.prestigeLayer);
    }
  }

  ngOnInit(): void {

  }

  getDisplay(): string {
    return (this.prestigeLayer.isUnlocked()) ? '' : 'none';
  }

  getName(): string {
    return this.prestigeLayer.name.charAt(0).toUpperCase() + this.prestigeLayer.name.slice(1);
  }

  hasReached(): boolean {
    return this.prestigeLayer.hasReached();
  }

  getReached(): string {
    return (this.hasReached()) ? 'reached' : '';
  }

  firstTime(): boolean {
    return this.prestigeLayer.prestigedFirstTime
  }

  getFirstTimeText(): string {
    return this.prestigeLayer.firstTimeText;
  }

  getGainAmount(): Num {
    return this.prestigeLayer.holdingGain
  }

  getGainHolding(): string {
    return this.prestigeLayer.idleGenerationHolding.displayName
  }
}
