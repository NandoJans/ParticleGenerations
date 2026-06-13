import { Component, OnInit } from '@angular/core';
import {PrestigeLayersService} from "../../services/prestige-layers.service";
import {PrestigeLayer} from "../../classes/features/prestiges/prestige-layer";
import {BluePhaseService} from "../../services/blue-phase.service";
import {MilestoneRecord} from "../../classes/records/milestones/milestone-record";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    standalone: false
})
export class HeaderComponent implements OnInit {
  yellowPrestigeLayer: PrestigeLayer = PrestigeLayersService.yellowPrestigeLayer
  greenPrestigeLayer: PrestigeLayer = PrestigeLayersService.greenPrestigeLayer
  bluePrestigeLayer: PrestigeLayer = PrestigeLayersService.bluePrestigeLayer
  automationMilestone = MilestoneRecord.stableParticleBeam;

  constructor(
    public bluePhaseService: BluePhaseService
  ) {}

  ngOnInit(): void {
    if (this.bluePhaseService.isUnlocked()) {
      this.bluePrestigeLayer.unlocked = true;
      this.bluePrestigeLayer.prestigedFirstTime = true;
    }
  }
}
