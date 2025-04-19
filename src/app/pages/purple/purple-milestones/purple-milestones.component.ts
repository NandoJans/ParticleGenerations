import { Component, OnInit } from '@angular/core';
import {Milestone} from "../../../globals";
import {MilestoneService} from "../../../services/interactables/milestone.service";
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";

@Component({
  selector: 'app-purple-milestones',
  templateUrl: './purple-milestones.component.html',
  styleUrls: ['./purple-milestones.component.css']
})
export class PurpleMilestonesComponent implements OnInit {
  milestones: Milestone[] = [];

  constructor(
    public holdingRecord: HoldingRecord
  ) { }

  ngOnInit(): void {
  }

  getMaxPurpleParticleGainSpeed() {
    return this.holdingRecord.getPurpleParticles().getMaxGainSpeed();
  }
}
