import { Component, OnInit } from '@angular/core';
import {PrestigeLayersService} from "../../services/prestige-layers.service";
import {App} from "../../App";
import {HoldingRecord} from "../../classes/records/holdings/holding-record";
import {YellowParticleHolding} from "../../classes/features/holdings/yellow-particle-holding";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  unlockedYellow: boolean | undefined;
  unlockedGreen: boolean | undefined;
  unlockedBlue: boolean | undefined;
  unlockedPurple: boolean | undefined;

  purplePhase: boolean = App.purplePhase;
  yellowParticles: YellowParticleHolding = HoldingRecord.yellowParticles;

  constructor(
    public holdingRecord: HoldingRecord
  ) {}

  ngOnInit(): void {
    this.purplePhase = App.purplePhase;
  }

  getPrestigedYellow(): boolean {
    return PrestigeLayersService.yellowPrestigeLayer.prestigedFirstTime
  }
}
