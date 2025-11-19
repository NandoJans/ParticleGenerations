import { Component, OnInit } from '@angular/core';
import {PrestigeLayersService} from "../../services/prestige-layers.service";
import {App} from "../../App";
import {HoldingRecord} from "../../classes/records/holdings/holding-record";
import {YellowParticleHolding} from "../../classes/features/holdings/yellow-particle-holding";
import {EnhancementService} from "../../services/enhancement.service";
import {Enhancement} from "../../classes/features/enhancements/enhancement";
import {GreenPrestigeHolding} from "../../classes/features/holdings/green-prestige-holding";
import {GreenParticleHolding} from "../../classes/features/holdings/green-particle-holding";

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css'],
    standalone: false
})
export class MainComponent implements OnInit {
  unlockedYellow: boolean | undefined;
  unlockedGreen: boolean | undefined;
  unlockedBlue: boolean | undefined;
  unlockedPurple: boolean | undefined;

  purplePhase: boolean = App.purplePhase;
  yellowParticles: YellowParticleHolding = HoldingRecord.yellowParticles;
  greenParticles: GreenParticleHolding = HoldingRecord.greenParticles;

  constructor(
    public holdingRecord: HoldingRecord,
    private enhancementService: EnhancementService
  ) {}

  ngOnInit(): void {
    this.purplePhase = App.purplePhase;
  }

  getPrestigedYellow(): boolean {
    return PrestigeLayersService.yellowPrestigeLayer.prestigedFirstTime
  }

  getPrestigedGreen(): any {
    return PrestigeLayersService.greenPrestigeLayer.prestigedFirstTime;
  }

  isEnhancing(): boolean {
    return this.enhancementService.isEnhancing();
  }

  getEnhancements(): Enhancement[] {
    const enhancements = [];
    if (this.enhancementService.enhancing) {
      enhancements.push(this.enhancementService.enhancing);
    }
    return enhancements;
  }

  canEnhanceAll(enhancement: Enhancement): boolean {
    return this.enhancementService.canEnhanceAll(enhancement);
  }

  enhanceAll(enhancement: Enhancement): void {
    this.enhancementService.enhanceAll(enhancement);
    this.enhancementService.stopEnhancing();
  }
}
