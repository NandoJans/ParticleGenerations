import { Component, OnInit } from '@angular/core';
import {Milestone} from "../../../globals";
import {MilestoneService} from "../../../services/interactables/milestone.service";
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";

@Component({
  selector: 'app-blue-milestones',
  templateUrl: './blue-milestones.component.html',
  styleUrls: ['./blue-milestones.component.css']
})
export class BlueMilestonesComponent implements OnInit {
  milestones: Milestone[] = [];
  constructor(
    public holdingRecord: HoldingRecord
  ) { }

  ngOnInit(): void {
  }

  getMaxBlueParticleGainSpeed() {
    return this.holdingRecord.getBlueParticles().getMaxGainSpeed()
  }
}
