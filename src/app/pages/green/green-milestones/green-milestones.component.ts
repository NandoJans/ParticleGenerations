import { Component, OnInit } from '@angular/core';
import {Milestone} from "../../../globals";
import {MilestoneService} from "../../../services/interactables/milestone.service";
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";

@Component({
  selector: 'app-green-milestones',
  templateUrl: './green-milestones.component.html',
  styleUrls: ['./green-milestones.component.css']
})
export class GreenMilestonesComponent implements OnInit {
  milestones: Milestone[] = [];
  constructor(
    public holdingRecord: HoldingRecord
  ) { }

  ngOnInit(): void {
  }

  getMaxGreenParticleGainSpeed() {
    this.holdingRecord.getGreenParticles().getMaxGainSpeed()
  }
}
