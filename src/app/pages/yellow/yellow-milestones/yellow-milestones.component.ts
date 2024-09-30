import { Component, OnInit } from '@angular/core';
import {MilestoneService} from "../../../services/interactables/milestone.service";
import {Milestone} from "../../../globals";
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";

@Component({
  selector: 'app-yellow-milestones',
  templateUrl: './yellow-milestones.component.html',
  styleUrls: ['./yellow-milestones.component.css']
})
export class YellowMilestonesComponent implements OnInit {
  milestones: Milestone[] = [];
  HoldingRecord: typeof HoldingRecord = HoldingRecord;
  constructor(
    public holdingRecord: HoldingRecord
  ) { }

  ngOnInit(): void {
    this.milestones = MilestoneService.getMilestones('yellow-milestone')
  }

  getMaxYellowParticleGainSpeed() {
    return this.holdingRecord.redParticles.getMaxGainSpeed();
  }
}
